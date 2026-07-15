# HackHonest — build log (v1, built overnight 2026-07-15)

**A community review platform for hackathon organizers.** Verified, first-hand, disclosed-facts
reviews of the companies/organizers/sponsors behind hackathons, so people can avoid bad actors.
Working name **HackHonest** (rename in one line: `lib/brand.ts`).

## Status: BUILT, QA'd, and DEPLOYED (privately)

- **Live preview (private to your Vercel account):**
  `https://hackhonest-aiepoasis-platform-1466-f6602c1a.vercel.app`
  It returns a login redirect to anyone who isn't you, that's **Vercel Deployment Protection**, on
  purpose. The site is also **noindexed**. So the critical, named-organizer content is not on the public
  web. Open the URL while logged into Vercel to click around.
- **Source:** committed locally at `~/Desktop/IndieHacker/products/hackhonest` with the indie git
  identity (`dangpleo-ctrl` noreply, never the HealthSyncX email). Not yet pushed to GitHub, the repo
  create was blocked by the auto-mode guard while you slept (outward action). One command when you're up:
  `gh repo create dangpleo-ctrl/hackhonest --private --source ~/Desktop/IndieHacker/products/hackhonest --remote origin --push`
- **Build:** `bun run build` green, 27 pages, all organizer + event pages prerendered (SSG). `tsc --noEmit`
  clean, strict, zero `any`. 132-token design system, AAA contrast, Be Vietnam Pro, mobile-first.

## What's in it

- **Home** — hero, search, the AABW case front-and-center (2.0★, "credits not delivered", 67 sponsor
  problems), how-it-works, organizers on record, neutral-host posture.
- **Directory** (`/directory`) — search organizers, sponsors, events.
- **Organizer pages** (`/o/[slug]`) — 12 seeded actors (GenAI Fund + KFC, VNG Games, Tasco, Phong Vu,
  Guardian, The Anam, Galaxy Holdings, GoTyme, Shinhan, AWS, OpenAI). Aggregate + events + reviews + a
  disabled "claim this page" (right-of-reply, v2).
- **Event page** (`/e/aabw-2026`) — the full genaifund case: the perk ledger (OpenAI/AWS not delivered,
  the third-party reskins), the 11 sponsor tracks, the winners **mapped to their sponsors** (the bias, as
  fact), the neutral sourced facts (moved off Devpost, source-code required, prizes hidden, referral
  leaderboard), all 67 problem statements, and the verified review.
- **Write a review** (`/review/new`) — structured, guided form (6 checkable dimensions), disclosed-facts
  prompts, evidence + attendance-proof capture, pseudonym + private contact. Posts to `/api/review`.
- **Content** — `/how-it-works`, `/trust` (verification, anonymity, moderation, right-of-reply), `/about`,
  `/tos`. Plus `sitemap.ts` + `robots.ts` (noindex until launch).

## Legal posture baked in
Neutral host of user statements (never a platform verdict); every aggregate is a **count** of what
verified reviewers reported. Disclosed-facts review UI, evidence encouraged, no fabrication, right of
reply, report/takedown. Region: Vietnam / SEA. The seed review is your real first-hand account.

## Your decisions when you wake (all one-step, none urgent)
1. **Name** — keep "HackHonest" or change `brand.name` in `lib/brand.ts`.
2. **Go public** (gated on you + your design doc's local-counsel read): set Vercel env
   `NEXT_PUBLIC_PUBLIC_LAUNCH=1` (flips robots to indexable) **and** turn off Vercel Deployment
   Protection, then `vercel deploy --prod`. Until then it stays private.
3. **Durable review queue — WIRED (Supabase).** Submissions now persist to a Supabase Postgres table
   (`review_submissions`) as a moderation queue: every row lands `status: 'pending'` until a human verifies
   the reviewer attended and publishes it. Row-level security lets the public (anon key) INSERT only —
   nobody can read the queue back through the browser key; verifying + publishing happens via the service
   role / dashboard. Canonical schema is checked in at `supabase/migrations/0001_review_submissions.sql`.
   Env: `SUPABASE_URL` + `SUPABASE_ANON_KEY` (in `.env.local` for local; set the same two in Vercel for
   prod). If they're unset the route still validates + accepts (logs only), so a fresh clone runs without a DB.

## Deferred to v2 (in the design doc)
DKIM-email + GitHub-repo verification rails (v1 uses evidence-upload + attendance-proof), the anonymous
capability-token/keyed-HMAC identity discard, organizer claim + reply flow, actor-merge (rebrand) tooling,
Vietnamese localization, and pre-seeding more of the organizer directory.

## Run it locally
`cd ~/Desktop/IndieHacker/products/hackhonest && bun run dev` → http://localhost:3000
