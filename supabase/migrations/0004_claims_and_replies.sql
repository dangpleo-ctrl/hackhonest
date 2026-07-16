-- HackHonest — organizer page claims + right-of-reply
--
-- Lets an organizer/sponsor take ownership of the page others made about them
-- (a "claim") and then post a public reply to reviews on that page (the
-- right-of-reply). They can reply, but never delete a review.
--
-- Security posture: a user can only SUBMIT a claim as PENDING — they can never
-- self-verify (that would let anyone impersonate any org). Verification (→
-- 'verified') is a human/service-role action. Replies are gated in RLS to
-- users who hold a VERIFIED claim on that actor, so the reply surface can't be
-- driven by an unverified account even via the raw API.

create extension if not exists "pgcrypto";

-- ── actor_claims ──────────────────────────────────────────────────────────────
create table if not exists public.actor_claims (
  id           uuid primary key default gen_random_uuid(),
  actor_slug   text not null,
  user_id      uuid not null references public.profiles (id) on delete cascade,
  status       text not null default 'pending'
                 check (status in ('pending', 'verified', 'rejected')),
  -- Hint for the approver: does the claimant's VERIFIED account email domain
  -- match the actor's listed website domain? Computed server-side at submit.
  domain_match boolean not null default false,
  created_at   timestamptz not null default now(),
  unique (actor_slug, user_id)
);

-- At most one verified owner per actor.
create unique index if not exists actor_claims_one_verified_owner
  on public.actor_claims (actor_slug) where status = 'verified';
create index if not exists actor_claims_actor_idx on public.actor_claims (actor_slug);

alter table public.actor_claims enable row level security;

-- Anyone may read VERIFIED claims (to show "Claimed by" + gate the reply UI).
drop policy if exists "verified claims are public" on public.actor_claims;
create policy "verified claims are public"
  on public.actor_claims for select
  to anon, authenticated
  using (status = 'verified');

-- A user may read their OWN claims at any status (to see "pending").
drop policy if exists "user sees own claims" on public.actor_claims;
create policy "user sees own claims"
  on public.actor_claims for select
  to authenticated
  using (auth.uid() = user_id);

-- A user may submit a PENDING claim for themselves. They can never insert
-- 'verified' — that is a human/service-role step, so impersonation is impossible.
drop policy if exists "user submits pending claim" on public.actor_claims;
create policy "user submits pending claim"
  on public.actor_claims for insert
  to authenticated
  with check (auth.uid() = user_id and status = 'pending');

-- ── review_replies ────────────────────────────────────────────────────────────
-- A verified owner's public response to a review. `review_id` references the
-- static review's id (reviews live in the app's data layer, not the DB), so it's
-- a plain text key, not a foreign key.
create table if not exists public.review_replies (
  id          uuid primary key default gen_random_uuid(),
  review_id   text not null,
  actor_slug  text not null,
  author_id   uuid not null references public.profiles (id) on delete cascade,
  body        text not null,
  created_at  timestamptz not null default now()
);

create index if not exists review_replies_review_idx on public.review_replies (review_id);
create index if not exists review_replies_actor_idx on public.review_replies (actor_slug);

alter table public.review_replies enable row level security;

drop policy if exists "replies are public" on public.review_replies;
create policy "replies are public"
  on public.review_replies for select
  to anon, authenticated
  using (true);

-- Only a user holding a VERIFIED claim on the actor may reply, attributed to
-- themselves. Enforced in RLS, so the raw API can't bypass the claim check.
drop policy if exists "verified owner can reply" on public.review_replies;
create policy "verified owner can reply"
  on public.review_replies for insert
  to authenticated
  with check (
    auth.uid() = author_id
    and char_length(body) between 2 and 5000
    and exists (
      select 1 from public.actor_claims c
      where c.actor_slug = review_replies.actor_slug
        and c.user_id = auth.uid()
        and c.status = 'verified'
    )
  );
