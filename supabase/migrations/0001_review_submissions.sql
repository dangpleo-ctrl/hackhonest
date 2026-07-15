-- HackHonest — review_submissions moderation queue
--
-- Canonical schema for the table that app/api/review/route.ts inserts into. The live
-- prod table was bootstrapped via the Supabase dashboard during the initial build;
-- this migration is the checked-in source of truth so a fresh project reproduces it
-- (supabase db push) and so the schema lives in git, not only in the dashboard.
--
-- Moderation-queue posture: every submission lands as `pending`. A human verifies the
-- reviewer actually attended the event before it is ever published (the neutral-host +
-- legal posture). The public may SUBMIT but never READ the queue back.

create extension if not exists "pgcrypto";

create table if not exists public.review_submissions (
  id             uuid primary key default gen_random_uuid(),
  created_at     timestamptz not null default now(),
  status         text not null default 'pending',    -- pending | published | rejected
  actor_slug     text,                                -- organizer/sponsor slug (nullable)
  event_slug     text,                                -- event slug (nullable)
  overall        smallint not null,                   -- overall rating, 1..5
  dimensions     jsonb not null default '[]'::jsonb,  -- [{ key, rating }] per-dimension scores
  headline       text not null,
  body           text not null,
  attended_proof text,                                -- attendee's own words / evidence of attendance
  author         text,                                -- reviewer pseudonym (null = anonymous)
  contact        text                                 -- PRIVATE, for verification only — never published
);

-- Row-level security: the browser ships the anon key, so anon may INSERT ONLY. There is
-- deliberately NO select/update/delete policy for anon, so the public can submit a review
-- but can never read the moderation queue back. Reading + verifying + publishing happens
-- through the service role (dashboard or an authenticated moderation view that bypasses RLS).
alter table public.review_submissions enable row level security;

drop policy if exists "anon can submit a pending review" on public.review_submissions;
create policy "anon can submit a pending review"
  on public.review_submissions
  for insert
  to anon
  with check (
    status = 'pending'                                -- submissions always enter the queue as pending
    and overall between 1 and 5
    and char_length(headline) between 1 and 200
    and char_length(body) between 1 and 10000
  );

-- Newest-first moderation reads (service role).
create index if not exists review_submissions_status_created_idx
  on public.review_submissions (status, created_at desc);
