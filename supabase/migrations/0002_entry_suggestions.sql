-- HackHonest — entry_suggestions moderation queue
--
-- Canonical schema for the table that app/api/suggest/route.ts inserts into. It
-- backs the "suggest an entry" flow: a person pastes an event/organizer link, AI
-- pre-fills a form, the person reviews + edits it, and the confirmed entry lands
-- here. Modeled on 0001_review_submissions.sql — same moderation posture.
--
-- Moderation-queue posture: every suggestion lands as `pending`. A human reviews
-- it before it is ever added to the directory (the neutral-host + legal posture).
-- The public may SUBMIT but never READ the queue back.

create extension if not exists "pgcrypto";

create table if not exists public.entry_suggestions (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),
  status        text not null default 'pending',    -- pending | accepted | rejected
  type          text not null,                       -- organizer | event | company | sponsor
  name          text not null,
  website       text,                                -- entity website (nullable)
  location      text,
  dates         text,                                -- event dates (events only)
  blurb         text,                                -- neutral, factual one or two sentences
  sponsors      jsonb not null default '[]'::jsonb,  -- detected sponsor names (free text)
  source_url    text,                                -- the link the person pasted
  submitted_by  text                                 -- optional pseudonym / contact
);

-- Row-level security: the browser ships the anon key, so anon may INSERT ONLY.
-- There is deliberately NO select/update/delete policy for anon, so the public
-- can submit a suggestion but can never read the moderation queue back. Reading +
-- reviewing + accepting happens through the service role (dashboard or an
-- authenticated moderation view that bypasses RLS).
alter table public.entry_suggestions enable row level security;

drop policy if exists "anon can submit a pending suggestion" on public.entry_suggestions;
create policy "anon can submit a pending suggestion"
  on public.entry_suggestions
  for insert
  to anon
  with check (
    status = 'pending'                               -- suggestions always enter the queue as pending
    and type in ('organizer', 'event', 'company', 'sponsor')
    and char_length(name) between 1 and 200
    and char_length(coalesce(blurb, '')) <= 4000
  );

-- Newest-first moderation reads (service role).
create index if not exists entry_suggestions_status_created_idx
  on public.entry_suggestions (status, created_at desc);
