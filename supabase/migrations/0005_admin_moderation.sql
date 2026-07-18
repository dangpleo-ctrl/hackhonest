-- HackHonest — in-app admin moderation
--
-- Lets an admin read + act on the pending queues (review submissions, directory
-- entry suggestions, organizer page claims) from inside the app instead of the
-- Supabase dashboard. The queues stay unreadable to the public (anon); only an
-- admin, checked in RLS via is_admin(), can read + change status.

create extension if not exists "pgcrypto";

-- ── admins ────────────────────────────────────────────────────────────────────
create table if not exists public.admins (
  user_id    uuid primary key references public.profiles (id) on delete cascade,
  created_at timestamptz not null default now()
);
alter table public.admins enable row level security;

-- is_admin(): true if the current user is listed in the admins table. security
-- definer so it can read admins regardless of RLS,
-- and so RLS policies on other tables can call it.
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(
    exists (select 1 from public.admins a where a.user_id = auth.uid()),
    false
  );
$$;

-- An admin can see the admins list (to manage co-admins). No anon access.
drop policy if exists "admins see admins" on public.admins;
create policy "admins see admins" on public.admins
  for select to authenticated using (public.is_admin());
drop policy if exists "admins manage admins" on public.admins;
create policy "admins manage admins" on public.admins
  for insert to authenticated with check (public.is_admin());

-- ── admin read + moderate on the three queues ─────────────────────────────────
-- review_submissions (anon may still INSERT via the existing policy; admins read + moderate)
drop policy if exists "admin reads review submissions" on public.review_submissions;
create policy "admin reads review submissions" on public.review_submissions
  for select to authenticated using (public.is_admin());
drop policy if exists "admin moderates review submissions" on public.review_submissions;
create policy "admin moderates review submissions" on public.review_submissions
  for update to authenticated using (public.is_admin()) with check (public.is_admin());

-- entry_suggestions
drop policy if exists "admin reads entry suggestions" on public.entry_suggestions;
create policy "admin reads entry suggestions" on public.entry_suggestions
  for select to authenticated using (public.is_admin());
drop policy if exists "admin moderates entry suggestions" on public.entry_suggestions;
create policy "admin moderates entry suggestions" on public.entry_suggestions
  for update to authenticated using (public.is_admin()) with check (public.is_admin());

-- actor_claims (owner may already read their own + verified; admins read ALL + moderate)
drop policy if exists "admin reads all claims" on public.actor_claims;
create policy "admin reads all claims" on public.actor_claims
  for select to authenticated using (public.is_admin());
drop policy if exists "admin moderates claims" on public.actor_claims;
create policy "admin moderates claims" on public.actor_claims
  for update to authenticated using (public.is_admin()) with check (public.is_admin());
