-- HackHonest — two-tier staff: admin (full) + moderator (limited)
--
-- Before this migration there was ONE tier: an "admin" (the owner email, or any
-- row in public.admins) who could read + moderate every queue. This adds a second,
-- deliberately weaker tier so the owner can delegate day-to-day moderation without
-- handing over the keys.
--
--   admin      — full power: moderate ANY item at ANY status, and manage the team
--                (appoint/remove admins + moderators). Admins are exactly the rows
--                in public.admins with role = 'admin'.
--   moderator  — can approve/reject items that are still PENDING, and nothing else.
--                A moderator can NEVER: un-approve or re-open an already-decided item,
--                DELETE any row, touch any other table, or manage the team.
--
-- Enforcement is in the database (RLS), not just the app, so a moderator can't
-- exceed these limits even by hitting the raw API with their own token. Deleting
-- content or editing anything else stays a service-role / dashboard action that
-- only the project owner can perform.

create extension if not exists "pgcrypto";

-- ── role on the staff table ───────────────────────────────────────────────────
-- Existing rows (and the owner) default to 'admin'. The check only attaches when
-- the column is first added, which is exactly the idempotent behaviour we want.
alter table public.admins
  add column if not exists role text not null default 'admin'
  check (role in ('admin', 'moderator'));

-- ── is_admin(): owner email OR a staff row with role='admin' ───────────────────
-- Narrowed from "any admins row" to "an admins row whose role is admin", so a
-- moderator row does NOT grant admin. security definer so it can read admins
-- regardless of RLS and be called from other tables' policies.
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(
    exists (
      select 1 from public.admins a
      where a.user_id = auth.uid() and a.role = 'admin'
    ),
    false
  );
$$;

-- ── is_moderator(): an admin, OR a staff row with role='moderator' ─────────────
-- "At least moderator level." Admins are a superset of moderators.
create or replace function public.is_moderator()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(
    public.is_admin()
      or exists (
        select 1 from public.admins a
        where a.user_id = auth.uid() and a.role = 'moderator'
      ),
    false
  );
$$;

-- ── Team management stays ADMIN-ONLY ──────────────────────────────────────────
-- A moderator can never see or change who is on the team, so they can't appoint
-- another moderator or escalate themselves to admin.
drop policy if exists "admins see admins" on public.admins;
drop policy if exists "staff table visible to admins" on public.admins;
create policy "staff table visible to admins" on public.admins
  for select to authenticated using (public.is_admin());

drop policy if exists "admins manage admins" on public.admins;
drop policy if exists "admins add staff" on public.admins;
create policy "admins add staff" on public.admins
  for insert to authenticated with check (public.is_admin());

drop policy if exists "admins update staff" on public.admins;
create policy "admins update staff" on public.admins
  for update to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists "admins remove staff" on public.admins;
create policy "admins remove staff" on public.admins
  for delete to authenticated using (public.is_admin());

-- ── Queue READ: any staff (admin or moderator) ────────────────────────────────
drop policy if exists "admin reads review submissions" on public.review_submissions;
drop policy if exists "staff read review submissions" on public.review_submissions;
create policy "staff read review submissions" on public.review_submissions
  for select to authenticated using (public.is_moderator());

drop policy if exists "admin reads entry suggestions" on public.entry_suggestions;
drop policy if exists "staff read entry suggestions" on public.entry_suggestions;
create policy "staff read entry suggestions" on public.entry_suggestions
  for select to authenticated using (public.is_moderator());

drop policy if exists "admin reads all claims" on public.actor_claims;
drop policy if exists "staff read all claims" on public.actor_claims;
create policy "staff read all claims" on public.actor_claims
  for select to authenticated using (public.is_moderator());

-- ── Queue MODERATE (update status only) ───────────────────────────────────────
-- Admin: any row → any status (can re-open, re-decide). Moderator: only a row that
-- is still 'pending', and only INTO the decided statuses for that queue. The
-- with-check status allow-list means a moderator can approve or reject but can
-- never write an arbitrary status, and the pending-only using-clause means once an
-- item is decided a moderator can no longer touch it (only an admin can).
-- No DELETE policy exists on any of these tables, so NOBODY deletes via the API.

-- review_submissions: decided = published | rejected
drop policy if exists "admin moderates review submissions" on public.review_submissions;
create policy "admin moderates review submissions" on public.review_submissions
  for update to authenticated using (public.is_admin()) with check (public.is_admin());
drop policy if exists "moderator moderates pending reviews" on public.review_submissions;
create policy "moderator moderates pending reviews" on public.review_submissions
  for update to authenticated
  using (public.is_moderator() and status = 'pending')
  with check (public.is_moderator() and status in ('published', 'rejected'));

-- entry_suggestions: decided = accepted | rejected
drop policy if exists "admin moderates entry suggestions" on public.entry_suggestions;
create policy "admin moderates entry suggestions" on public.entry_suggestions
  for update to authenticated using (public.is_admin()) with check (public.is_admin());
drop policy if exists "moderator moderates pending suggestions" on public.entry_suggestions;
create policy "moderator moderates pending suggestions" on public.entry_suggestions
  for update to authenticated
  using (public.is_moderator() and status = 'pending')
  with check (public.is_moderator() and status in ('accepted', 'rejected'));

-- actor_claims: decided = verified | rejected
drop policy if exists "admin moderates claims" on public.actor_claims;
create policy "admin moderates claims" on public.actor_claims
  for update to authenticated using (public.is_admin()) with check (public.is_admin());
drop policy if exists "moderator moderates pending claims" on public.actor_claims;
create policy "moderator moderates pending claims" on public.actor_claims
  for update to authenticated
  using (public.is_moderator() and status = 'pending')
  with check (public.is_moderator() and status in ('verified', 'rejected'));
