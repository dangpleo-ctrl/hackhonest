-- HackHonest — RLS performance + integrity hardening
--
-- Source: line-by-line review of the schema against Supabase's own expert
-- guidance (supabase-postgres-best-practices skill, 2026-07-17). Three fixes,
-- all additive — no data touched, no behavior change for legitimate callers:
--
-- 1. PER-QUERY instead of PER-ROW policy evaluation. Bare `auth.uid()` /
--    `is_admin()` / `is_moderator()` calls in a policy are re-evaluated for
--    EVERY row scanned (the definer functions each run 1-2 hidden subqueries,
--    so a 500-row queue read = ~1,000 hidden subqueries). Wrapping the call as
--    `(select fn())` makes Postgres evaluate it ONCE per query. Same result,
--    advisor-clean (`auth_rls_initplan`), documented 100x+ on large tables.
--
-- 2. MISSING INDEXES on foreign keys + RLS predicates. Postgres does not index
--    FK columns automatically; profile pages and cascades scan without these.
--
-- 3. STATUS CHECK CONSTRAINTS on the two oldest queues (0001/0002 predate the
--    pattern the newer tables use). A typo'd status makes a row invisible to
--    BOTH the pending queue and the published set — a submitted review would
--    silently vanish. Added NOT VALID (existing rows untouched), validated in
--    a guarded block so the migration never fails on legacy data.
--
-- Plus: moderators/admins are column-scoped to UPDATE(status) on the queues —
-- the app only ever writes status; now the API can't write anything else either
-- (0007's comment promised "update status only"; this makes it literal).

-- ── 1a. profiles: wrap auth.uid() ────────────────────────────────────────────
drop policy if exists "user inserts own profile" on public.profiles;
create policy "user inserts own profile"
  on public.profiles for insert
  to authenticated
  with check ((select auth.uid()) = id);

drop policy if exists "user updates own profile" on public.profiles;
create policy "user updates own profile"
  on public.profiles for update
  to authenticated
  using ((select auth.uid()) = id)
  with check ((select auth.uid()) = id);

-- ── 1b. forum_threads / forum_posts ──────────────────────────────────────────
drop policy if exists "authed can start a thread" on public.forum_threads;
create policy "authed can start a thread"
  on public.forum_threads for insert
  to authenticated
  with check (
    (select auth.uid()) = author_id
    and char_length(title) between 6 and 160
    and char_length(body) between 20 and 10000
  );

drop policy if exists "authed can reply" on public.forum_posts;
create policy "authed can reply"
  on public.forum_posts for insert
  to authenticated
  with check (
    (select auth.uid()) = author_id
    and char_length(body) between 2 and 10000
    and not exists (
      select 1 from public.forum_threads t
      where t.id = thread_id and t.locked = true
    )
  );

-- ── 1c. actor_claims (user-facing policies) ──────────────────────────────────
drop policy if exists "user sees own claims" on public.actor_claims;
create policy "user sees own claims"
  on public.actor_claims for select
  to authenticated
  using ((select auth.uid()) = user_id);

drop policy if exists "user submits pending claim" on public.actor_claims;
create policy "user submits pending claim"
  on public.actor_claims for insert
  to authenticated
  with check ((select auth.uid()) = user_id and status = 'pending');

-- ── 1d. review_replies ───────────────────────────────────────────────────────
drop policy if exists "verified owner can reply" on public.review_replies;
create policy "verified owner can reply"
  on public.review_replies for insert
  to authenticated
  with check (
    (select auth.uid()) = author_id
    and char_length(body) between 2 and 5000
    and exists (
      select 1 from public.actor_claims c
      where c.actor_slug = review_replies.actor_slug
        and c.user_id = (select auth.uid())
        and c.status = 'verified'
    )
  );

-- ── 1e. notifications ────────────────────────────────────────────────────────
drop policy if exists "user reads own notifications" on public.notifications;
create policy "user reads own notifications" on public.notifications
  for select to authenticated using ((select auth.uid()) = user_id);

drop policy if exists "user updates own notifications" on public.notifications;
create policy "user updates own notifications" on public.notifications
  for update to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

-- ── 1f. admins (team management) ─────────────────────────────────────────────
drop policy if exists "staff table visible to admins" on public.admins;
create policy "staff table visible to admins" on public.admins
  for select to authenticated using ((select public.is_admin()));

drop policy if exists "admins add staff" on public.admins;
create policy "admins add staff" on public.admins
  for insert to authenticated with check ((select public.is_admin()));

drop policy if exists "admins update staff" on public.admins;
create policy "admins update staff" on public.admins
  for update to authenticated
  using ((select public.is_admin())) with check ((select public.is_admin()));

drop policy if exists "admins remove staff" on public.admins;
create policy "admins remove staff" on public.admins
  for delete to authenticated using ((select public.is_admin()));

-- ── 1g. the three moderation queues (the biggest win — definer fns per-row) ──
drop policy if exists "staff read review submissions" on public.review_submissions;
create policy "staff read review submissions" on public.review_submissions
  for select to authenticated using ((select public.is_moderator()));

drop policy if exists "admin moderates review submissions" on public.review_submissions;
create policy "admin moderates review submissions" on public.review_submissions
  for update to authenticated
  using ((select public.is_admin())) with check ((select public.is_admin()));

drop policy if exists "moderator moderates pending reviews" on public.review_submissions;
create policy "moderator moderates pending reviews" on public.review_submissions
  for update to authenticated
  using ((select public.is_moderator()) and status = 'pending')
  with check ((select public.is_moderator()) and status in ('published', 'rejected'));

drop policy if exists "staff read entry suggestions" on public.entry_suggestions;
create policy "staff read entry suggestions" on public.entry_suggestions
  for select to authenticated using ((select public.is_moderator()));

drop policy if exists "admin moderates entry suggestions" on public.entry_suggestions;
create policy "admin moderates entry suggestions" on public.entry_suggestions
  for update to authenticated
  using ((select public.is_admin())) with check ((select public.is_admin()));

drop policy if exists "moderator moderates pending suggestions" on public.entry_suggestions;
create policy "moderator moderates pending suggestions" on public.entry_suggestions
  for update to authenticated
  using ((select public.is_moderator()) and status = 'pending')
  with check ((select public.is_moderator()) and status in ('accepted', 'rejected'));

drop policy if exists "staff read all claims" on public.actor_claims;
create policy "staff read all claims" on public.actor_claims
  for select to authenticated using ((select public.is_moderator()));

drop policy if exists "admin moderates claims" on public.actor_claims;
create policy "admin moderates claims" on public.actor_claims
  for update to authenticated
  using ((select public.is_admin())) with check ((select public.is_admin()));

drop policy if exists "moderator moderates pending claims" on public.actor_claims;
create policy "moderator moderates pending claims" on public.actor_claims
  for update to authenticated
  using ((select public.is_moderator()) and status = 'pending')
  with check ((select public.is_moderator()) and status in ('verified', 'rejected'));

-- ── 2. missing FK / RLS-predicate indexes ────────────────────────────────────
create index if not exists forum_threads_author_idx   on public.forum_threads (author_id);
create index if not exists forum_posts_author_idx     on public.forum_posts (author_id);
create index if not exists actor_claims_user_idx      on public.actor_claims (user_id);
create index if not exists review_replies_author_idx  on public.review_replies (author_id);
create index if not exists notifications_thread_idx   on public.notifications (thread_id);

-- ── 3. status + rating CHECK constraints on the two oldest queues ────────────
-- NOT VALID = future writes enforced, existing rows untouched; the guarded
-- VALIDATE upgrades to full enforcement and is a no-op failure if legacy data
-- would violate (logged, migration still succeeds — clean data validates).
do $$
begin
  if not exists (select 1 from pg_constraint where conname = 'review_submissions_status_check') then
    alter table public.review_submissions
      add constraint review_submissions_status_check
      check (status in ('pending', 'published', 'rejected')) not valid;
  end if;
  if not exists (select 1 from pg_constraint where conname = 'review_submissions_overall_check') then
    alter table public.review_submissions
      add constraint review_submissions_overall_check
      check (overall between 1 and 5) not valid;
  end if;
  if not exists (select 1 from pg_constraint where conname = 'entry_suggestions_status_check') then
    alter table public.entry_suggestions
      add constraint entry_suggestions_status_check
      check (status in ('pending', 'accepted', 'rejected')) not valid;
  end if;
end $$;

do $$
begin
  alter table public.review_submissions validate constraint review_submissions_status_check;
  alter table public.review_submissions validate constraint review_submissions_overall_check;
  alter table public.entry_suggestions  validate constraint entry_suggestions_status_check;
exception when check_violation then
  raise notice 'legacy row violates a new CHECK — constraint stays NOT VALID (future writes still enforced)';
end $$;

-- ── 4. queues: staff may UPDATE only the status column ───────────────────────
-- The app writes exactly {status}; 0007 promised "update status only" but RLS is
-- row-level, so a staff token could rewrite a reviewer's words via the raw API.
-- Column-scoped grants make the promise literal. RLS row rules above still apply.
revoke update on public.review_submissions from anon, authenticated;
revoke update on public.entry_suggestions  from anon, authenticated;
revoke update on public.actor_claims       from anon, authenticated;
grant update (status) on public.review_submissions to authenticated;
grant update (status) on public.entry_suggestions  to authenticated;
grant update (status) on public.actor_claims       to authenticated;
