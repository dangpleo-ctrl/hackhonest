-- HackHonest — community forum + pseudonymous accounts
--
-- Adds real user accounts and a discussion forum on top of the anonymous
-- review queue. The identity model mirrors the reviews: the LOGIN EMAIL stays
-- private in auth.users; the PUBLIC identity is a chosen `handle` in
-- public.profiles. An organizer can never see who is behind a handle, so an
-- honest reviewer/poster can't be retaliated against. Reputation attaches to
-- the profile in a later migration.
--
-- Posture: reading the forum is PUBLIC (anon may SELECT everything here).
-- Posting requires an authenticated account, and every write is attributed to
-- the author's profile (auth.uid() = author_id, enforced in RLS).

create extension if not exists "pgcrypto";

-- ── profiles ─────────────────────────────────────────────────────────────────
-- One row per auth user. `handle` is the public pseudonym (lowercase, url-safe);
-- the email lives only in auth.users and is never exposed through the anon key.
create table if not exists public.profiles (
  id          uuid primary key references auth.users (id) on delete cascade,
  handle      text unique not null check (handle ~ '^[a-z0-9_]{3,24}$'),
  bio         text check (bio is null or char_length(bio) <= 280),
  created_at  timestamptz not null default now()
);

alter table public.profiles enable row level security;

-- Public handles are readable by anyone — they render on every thread and post.
drop policy if exists "profiles are public" on public.profiles;
create policy "profiles are public"
  on public.profiles for select
  to anon, authenticated
  using (true);

-- A user may create and edit ONLY their own profile row.
drop policy if exists "user inserts own profile" on public.profiles;
create policy "user inserts own profile"
  on public.profiles for insert
  to authenticated
  with check (auth.uid() = id);

drop policy if exists "user updates own profile" on public.profiles;
create policy "user updates own profile"
  on public.profiles for update
  to authenticated
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- On signup, GoTrue inserts into auth.users; this trigger creates the matching
-- public profile from the handle passed in the signup metadata. If the handle
-- is missing it falls back to a stable `user_<8hex>` so a row always exists.
-- A handle collision raises a unique_violation and rolls the signup back (the
-- app pre-checks availability, so this is only the race backstop).
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, handle)
  values (
    new.id,
    coalesce(
      nullif(lower(new.raw_user_meta_data ->> 'handle'), ''),
      'user_' || substr(new.id::text, 1, 8)
    )
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ── forum_categories ─────────────────────────────────────────────────────────
-- A small fixed set, seeded below. Category name/description are display copy;
-- the id is a stable slug used in URLs.
create table if not exists public.forum_categories (
  id           text primary key,
  name         text not null,
  description  text,
  position     int not null default 0
);

alter table public.forum_categories enable row level security;

drop policy if exists "categories are public" on public.forum_categories;
create policy "categories are public"
  on public.forum_categories for select
  to anon, authenticated
  using (true);

insert into public.forum_categories (id, name, description, position) values
  ('warnings',    'Warnings & red flags', 'Heads-up about organizers, sponsors, or events to be careful with.', 1),
  ('experiences', 'Event experiences',    'How a hackathon actually went — the good and the bad.',              2),
  ('prizes',      'Prizes & payouts',     'Did the prizes and credits actually arrive? Compare notes.',         3),
  ('advice',      'Advice & questions',   'Thinking of joining one? Ask builders who have been there.',         4),
  ('meta',        'Site feedback',        'Feedback on HackHonest itself — features, corrections, ideas.',      5)
on conflict (id) do nothing;

-- ── forum_threads ────────────────────────────────────────────────────────────
create table if not exists public.forum_threads (
  id                uuid primary key default gen_random_uuid(),
  category_id       text not null references public.forum_categories (id),
  author_id         uuid not null references public.profiles (id) on delete cascade,
  title             text not null,
  body              text not null,
  actor_slug        text,                                  -- optional link to a directory actor
  created_at        timestamptz not null default now(),
  last_activity_at  timestamptz not null default now(),
  reply_count       int not null default 0,
  locked            boolean not null default false
);

alter table public.forum_threads enable row level security;

create index if not exists forum_threads_category_activity_idx
  on public.forum_threads (category_id, last_activity_at desc);
create index if not exists forum_threads_activity_idx
  on public.forum_threads (last_activity_at desc);
create index if not exists forum_threads_actor_idx
  on public.forum_threads (actor_slug);

drop policy if exists "threads are public" on public.forum_threads;
create policy "threads are public"
  on public.forum_threads for select
  to anon, authenticated
  using (true);

drop policy if exists "authed can start a thread" on public.forum_threads;
create policy "authed can start a thread"
  on public.forum_threads for insert
  to authenticated
  with check (
    auth.uid() = author_id
    and char_length(title) between 6 and 160
    and char_length(body) between 20 and 10000
  );

-- ── forum_posts ──────────────────────────────────────────────────────────────
create table if not exists public.forum_posts (
  id          uuid primary key default gen_random_uuid(),
  thread_id   uuid not null references public.forum_threads (id) on delete cascade,
  author_id   uuid not null references public.profiles (id) on delete cascade,
  body        text not null,
  created_at  timestamptz not null default now()
);

alter table public.forum_posts enable row level security;

create index if not exists forum_posts_thread_created_idx
  on public.forum_posts (thread_id, created_at asc);

drop policy if exists "posts are public" on public.forum_posts;
create policy "posts are public"
  on public.forum_posts for select
  to anon, authenticated
  using (true);

-- A reply requires an account, is attributed to the author, and is refused on a
-- locked thread — all enforced server-side by RLS, never trusting the client.
drop policy if exists "authed can reply" on public.forum_posts;
create policy "authed can reply"
  on public.forum_posts for insert
  to authenticated
  with check (
    auth.uid() = author_id
    and char_length(body) between 2 and 10000
    and not exists (
      select 1 from public.forum_threads t
      where t.id = thread_id and t.locked = true
    )
  );

-- Keep each thread's reply_count + last_activity_at current as replies land.
-- security definer so the counter update isn't blocked by the threads RLS
-- (which has no UPDATE policy for regular users).
create or replace function public.bump_thread_on_post()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  update public.forum_threads
     set reply_count = reply_count + 1,
         last_activity_at = now()
   where id = new.thread_id;
  return new;
end;
$$;

drop trigger if exists on_forum_post_created on public.forum_posts;
create trigger on_forum_post_created
  after insert on public.forum_posts
  for each row execute function public.bump_thread_on_post();
