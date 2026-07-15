import type { Review } from "@/lib/types";

// ─────────────────────────────────────────────────────────────────────────────
// DEMO SEED DATA.
//
// In production, HackHonest hosts ONLY real, first-hand, verified reviews — no fabricated
// content (that would break both the trust model and the law). The set below is illustrative
// sample data for the PRIVATE PREVIEW / live demo: it shows the full range the platform
// captures (well-run events and badly-run ones alike), how verification and right-of-reply
// render, and how the neutral aggregate reads.
//
// The flagship "on the record" case is the Zenith Agent Grand Prix 2026 (organizer Zenith AI
// Ventures). A real, named, first-hand attendee account is preserved OUT of the rendered site in
// `reviews-pending-counsel.ts` (never imported); it is held until a public named launch is
// approved by the owner and a Vietnam / Southeast Asia counsel read clears it.
//
// Before any public launch: clear the demo entries below and keep only genuine, verified
// submissions.
// ─────────────────────────────────────────────────────────────────────────────
export const reviews: Review[] = [
  // ══ Zenith Agent Grand Prix 2026 (organizer Zenith AI Ventures) — the flagship case ══════════
  {
    id: "zenith-grand-prix-2026-1",
    actorSlug: "zenith-ai",
    eventSlug: "zenith-grand-prix-2026",
    overall: 2,
    dimensions: [
      { key: "prizes", label: "Prizes delivered as promised", rating: 1 },
      { key: "perks", label: "Perks & credits were real", rating: 1 },
      { key: "judging", label: "Judging was fair & transparent", rating: 2 },
      { key: "organization", label: "Well organized", rating: 2 },
      { key: "honesty", label: "Honest marketing", rating: 1 },
      { key: "respect", label: "Respected participants' work", rating: 2 },
    ],
    headline: "Advertised credits never arrived, and most 'perks' were other companies' free programs",
    body: `I attended the Zenith Agent Grand Prix 2026 in person. The perks page advertised CircuitAI credits ($150 per participant) and $1,000 in CloudNova credits. I applied through the official portal, which showed my status as 'Claimed.' I received nothing. The CloudNova 'perk' was a link that redirected to CloudNova's standard startup-credits program, which anyone can apply to and which had nothing to do with the event. Several of the big headline perks (a 'Hyperion for Startups $1.5M prize pool,' a 'Noteflow $6,000 estimated value') were the providers' own public startup programs, presented as if the organizer were granting them.

The '$1,000,000+ in perks and credits' headline was built from those third-party programs plus free tiers and out-of-stock items. The perks page itself stated, in fine print, that 'submitting an application does not guarantee receipt.'

The track structure bothered me most. Every problem statement was a named sponsor's real production problem, the rules required a working solution plus source code, and prizes weren't disclosed until a mid-event kickoff. The whole weekend was committed before anyone knew what, if anything, they were competing for.`,
    verified: true,
    verifyMethod: "evidence",
    author: "Verified participant, Zenith Grand Prix 2026",
    date: "2026-08-25",
    evidence: [
      { label: "Perk portal showing 'Claimed'", kind: "screenshot", note: "Applied; received $0." },
      { label: "CloudNova perk link → standard signup program", kind: "link" },
    ],
  },
  {
    id: "zenith-grand-prix-2026-2",
    actorSlug: "zenith-ai",
    eventSlug: "zenith-grand-prix-2026",
    overall: 2,
    dimensions: [
      { key: "prizes", label: "Prizes delivered as promised", rating: 2 },
      { key: "judging", label: "Judging was fair & transparent", rating: 2 },
      { key: "organization", label: "Well organized", rating: 3 },
      { key: "honesty", label: "Honest marketing", rating: 1 },
      { key: "respect", label: "Respected participants' work", rating: 1 },
    ],
    headline: "A referral leaderboard, and every track was a sponsor's backlog",
    body:
      "Every track was a named company's real production problem, and the winning teams' work went straight to those companies. The only public leaderboard ranked who referred the most sign-ups, not who built the best solution. The investment conversations we were promised never materialized for anyone I spoke to. It felt less like a competition and more like sourcing free prototypes.",
    verified: true,
    verifyMethod: "evidence",
    author: "Participant, Zenith Grand Prix 2026",
    date: "2026-08-26",
  },
  {
    id: "zenith-grand-prix-2026-3",
    actorSlug: "zenith-ai",
    eventSlug: "zenith-grand-prix-2026",
    overall: 1,
    dimensions: [
      { key: "prizes", label: "Prizes delivered as promised", rating: 1 },
      { key: "honesty", label: "Honest marketing", rating: 1 },
    ],
    headline: "Named on stage for a track prize, then silence",
    body:
      "Our team was named on stage for a track prize and then heard nothing: no transfer, no timeline, and no reply to our follow-up emails.",
    verified: false,
    author: "Track finalist, Zenith Grand Prix 2026",
    date: "2026-08-27",
  },

  // ══ OpenBuild Hack 2026 — a well-run event (the counter-example) ══════════════
  {
    id: "openbuild-2026-1",
    actorSlug: "openbuild-collective",
    eventSlug: "openbuild-hack-2026",
    overall: 5,
    dimensions: [
      { key: "prizes", label: "Prizes delivered as promised", rating: 5 },
      { key: "perks", label: "Perks & credits were real", rating: 5 },
      { key: "judging", label: "Judging was fair & transparent", rating: 5 },
      { key: "organization", label: "Well organized", rating: 5 },
      { key: "honesty", label: "Honest marketing", rating: 5 },
      { key: "respect", label: "Respected participants' work", rating: 5 },
    ],
    headline: "Prize hit my account the same week — exactly as promised",
    body:
      "My team took a runner-up spot. They called us up on stage, and the cash landed in our account four " +
      "days later by bank transfer, no chasing required. The rules were clear that we keep our IP, and nobody " +
      "asked for our source code. This is how it's supposed to work.",
    verified: true,
    verifyMethod: "github",
    author: "Runner-up, OpenBuild 2026",
    date: "2026-03-20",
    evidence: [
      { label: "Bank transfer confirmation", kind: "screenshot", note: "Prize received four days after the event." },
    ],
  },
  {
    id: "openbuild-2026-2",
    actorSlug: "openbuild-collective",
    eventSlug: "openbuild-hack-2026",
    overall: 5,
    dimensions: [
      { key: "prizes", label: "Prizes delivered as promised", rating: 5 },
      { key: "judging", label: "Judging was fair & transparent", rating: 5 },
      { key: "organization", label: "Well organized", rating: 5 },
      { key: "honesty", label: "Honest marketing", rating: 5 },
      { key: "respect", label: "Respected participants' work", rating: 5 },
    ],
    headline: "No corporate strings — they just wanted us to build",
    body:
      "Open theme, no assigned company problem to solve, no IP grab. The judges walked each team through their " +
      "scores afterwards, which I've never had at a hackathon before. Everything they advertised matched the day.",
    verified: true,
    verifyMethod: "evidence",
    author: "Participant, OpenBuild 2026",
    date: "2026-03-22",
  },
  {
    id: "openbuild-2026-3",
    actorSlug: "openbuild-collective",
    eventSlug: "openbuild-hack-2026",
    overall: 4,
    dimensions: [
      { key: "prizes", label: "Prizes delivered as promised", rating: 5 },
      { key: "judging", label: "Judging was fair & transparent", rating: 5 },
      { key: "organization", label: "Well organized", rating: 3 },
      { key: "honesty", label: "Honest marketing", rating: 5 },
      { key: "respect", label: "Respected participants' work", rating: 5 },
    ],
    headline: "Fantastic weekend — the only miss was the wifi",
    body:
      "Genuinely well run, fair judging, prizes paid. My one gripe: the venue wifi buckled on Saturday " +
      "afternoon when everyone was deploying at once. Small thing against how much they got right.",
    verified: true,
    verifyMethod: "founder-attested",
    author: "Participant, OpenBuild 2026",
    date: "2026-03-19",
    reply: {
      author: "OpenBuild Collective",
      body:
        "Thank you for the kind words, and you're right about the wifi on Saturday afternoon — that's on us. " +
        "We've already booked a bigger uplink for next year's venue. See you there.",
      date: "2026-03-24",
    },
  },
  {
    id: "openbuild-2026-4",
    actorSlug: "openbuild-collective",
    eventSlug: "openbuild-hack-2026",
    overall: 5,
    dimensions: [
      { key: "prizes", label: "Prizes delivered as promised", rating: 5 },
      { key: "perks", label: "Perks & credits were real", rating: 5 },
      { key: "judging", label: "Judging was fair & transparent", rating: 5 },
      { key: "organization", label: "Well organized", rating: 4 },
      { key: "honesty", label: "Honest marketing", rating: 5 },
    ],
    headline: "Transparent judging and an instant payout",
    body:
      "The DigitalOcean and GitHub perks were real codes that actually worked, not links to some program you " +
      "have to separately qualify for. Prizes were handed out on the day. No complaints.",
    verified: true,
    verifyMethod: "email-dkim",
    author: "Finalist, OpenBuild 2026",
    date: "2026-03-21",
  },

  // ══ Nexus AI Challenge 2026 — well-run but slow on the money (mixed) ══════════
  {
    id: "nexus-2026-1",
    actorSlug: "nexus-labs",
    eventSlug: "nexus-ai-challenge-2026",
    overall: 4,
    dimensions: [
      { key: "prizes", label: "Prizes delivered as promised", rating: 3 },
      { key: "perks", label: "Perks & credits were real", rating: 4 },
      { key: "judging", label: "Judging was fair & transparent", rating: 4 },
      { key: "organization", label: "Well organized", rating: 5 },
      { key: "honesty", label: "Honest marketing", rating: 4 },
      { key: "respect", label: "Respected participants' work", rating: 4 },
    ],
    headline: "Great mentorship — just budget on a wait for the prize",
    body:
      "The lab's engineers sat with our team for hours and the whole thing was well organized. Judging used a " +
      "rubric we'd seen in advance, which I appreciated. The prize did arrive, but it took a few weeks, so go " +
      "in expecting that rather than a same-day payout.",
    verified: true,
    verifyMethod: "evidence",
    author: "Participant, Nexus 2026",
    date: "2026-05-28",
  },
  {
    id: "nexus-2026-2",
    actorSlug: "nexus-labs",
    eventSlug: "nexus-ai-challenge-2026",
    overall: 2,
    dimensions: [
      { key: "prizes", label: "Prizes delivered as promised", rating: 2 },
      { key: "perks", label: "Perks & credits were real", rating: 3 },
      { key: "judging", label: "Judging was fair & transparent", rating: 3 },
      { key: "organization", label: "Well organized", rating: 3 },
      { key: "honesty", label: "Honest marketing", rating: 4 },
      { key: "respect", label: "Respected participants' work", rating: 3 },
    ],
    headline: "The prize took three months and three follow-up emails",
    body:
      "We won our category in early May. The money didn't reach us until August, after I chased it three times. " +
      "To be fair, the amount was exactly what they advertised and nobody was rude — but three months of silence " +
      "for a prize you announced on stage is not okay. Posting so others know to keep following up.",
    verified: true,
    verifyMethod: "evidence",
    author: "Category winner, Nexus 2026",
    date: "2026-08-18",
    evidence: [
      { label: "Follow-up email thread (3 messages)", kind: "email", note: "May–August, prize eventually paid." },
    ],
    reply: {
      author: "Nexus Labs",
      body:
        "You're right, and we're sorry. Our finance approval chain was too slow in 2026. We've since moved prize " +
        "disbursement to same-week payouts and added a named contact so nobody has to chase again. Thank you for " +
        "flagging it publicly — it's the reason we changed the process.",
      date: "2026-08-25",
    },
  },
  {
    id: "nexus-2026-3",
    actorSlug: "nexus-labs",
    eventSlug: "nexus-ai-challenge-2026",
    overall: 3,
    dimensions: [
      { key: "prizes", label: "Prizes delivered as promised", rating: 3 },
      { key: "perks", label: "Perks & credits were real", rating: 4 },
      { key: "judging", label: "Judging was fair & transparent", rating: 2 },
      { key: "organization", label: "Well organized", rating: 4 },
      { key: "honesty", label: "Honest marketing", rating: 4 },
      { key: "respect", label: "Respected participants' work", rating: 4 },
    ],
    headline: "Solid event, but the judging felt a bit opaque",
    body:
      "Logistics were smooth and the Azure credits were real. My only real issue was that even with a published " +
      "rubric, I couldn't tell how the finalists were picked over some stronger demos. Would do it again, just " +
      "wish the scoring was shown per team.",
    verified: true,
    verifyMethod: "github",
    author: "Participant, Nexus 2026",
    date: "2026-05-30",
  },
  {
    id: "nexus-2026-4",
    actorSlug: "nexus-labs",
    eventSlug: "nexus-ai-challenge-2026",
    overall: 4,
    dimensions: [
      { key: "organization", label: "Well organized", rating: 4 },
      { key: "respect", label: "Respected participants' work", rating: 4 },
    ],
    headline: "Loved it — learned a ton from the mentors",
    body:
      "First time at one of these and I had a great time. Can't speak to the prize side since we didn't place, " +
      "but the mentorship alone was worth the weekend.",
    verified: false,
    author: "Attendee, Nexus 2026",
    date: "2026-05-06",
  },

  // ══ Apex / Pinnacle — the same operator across a rebrand (bad record) ═════════
  {
    id: "pinnacle-2025-1",
    actorSlug: "apex-innovation",
    eventSlug: "pinnacle-buildoff-2025",
    overall: 1,
    dimensions: [
      { key: "prizes", label: "Prizes delivered as promised", rating: 1 },
      { key: "perks", label: "Perks & credits were real", rating: 1 },
      { key: "judging", label: "Judging was fair & transparent", rating: 2 },
      { key: "organization", label: "Well organized", rating: 2 },
      { key: "honesty", label: "Honest marketing", rating: 1 },
      { key: "respect", label: "Respected participants' work", rating: 1 },
    ],
    headline: "We won the top prize. Six months later, still not paid",
    body:
      "Our team was announced as the grand-prize winner at Pinnacle AI Buildoff 2025. We were told the transfer " +
      "would come 'within 30 days.' It's been six months. I've sent nine emails; the last four bounced or went " +
      "unanswered. The '$100k in perks' turned out to be links to partners' own free programs. I'm documenting " +
      "this so nobody else counts on a prize from this organizer without money in hand first.",
    verified: true,
    verifyMethod: "evidence",
    author: "Grand-prize winner, Pinnacle 2025",
    date: "2026-05-15",
    evidence: [
      { label: "On-stage winner announcement", kind: "screenshot" },
      { label: "Unanswered email thread (9 messages)", kind: "email", note: "Nov 2025 – May 2026, no payment." },
    ],
  },
  {
    id: "apex-2026-1",
    actorSlug: "apex-innovation",
    eventSlug: "apex-agent-jam-2026",
    overall: 2,
    dimensions: [
      { key: "prizes", label: "Prizes delivered as promised", rating: 2 },
      { key: "perks", label: "Perks & credits were real", rating: 2 },
      { key: "judging", label: "Judging was fair & transparent", rating: 2 },
      { key: "organization", label: "Well organized", rating: 3 },
      { key: "honesty", label: "Honest marketing", rating: 1 },
      { key: "respect", label: "Respected participants' work", rating: 1 },
    ],
    headline: "Same team as Pinnacle — and this time they take your IP",
    body:
      "Halfway through I realized the organizers were the same people who ran the 'Pinnacle' event a friend got " +
      "burned by. Then I actually read the submission terms: anything you submit becomes their property. So you " +
      "hand over working code, they keep the rights, and the prize is 'to be confirmed.' I pulled our submission. " +
      "Read the fine print before you build for this one.",
    verified: true,
    verifyMethod: "github",
    author: "Participant, Apex Agent Jam 2026",
    date: "2026-06-12",
    evidence: [
      { label: "Submission terms — IP assignment clause", kind: "screenshot" },
    ],
    reply: {
      author: "Apex Innovation Labs",
      body:
        "We take these concerns seriously. Participants with questions about their submission should contact our " +
        "support team with their registration reference and we will look into it.",
      date: "2026-06-18",
    },
  },
  {
    id: "apex-2026-2",
    actorSlug: "apex-innovation",
    eventSlug: "apex-agent-jam-2026",
    overall: 2,
    dimensions: [
      { key: "prizes", label: "Prizes delivered as promised", rating: 2 },
      { key: "judging", label: "Judging was fair & transparent", rating: 2 },
      { key: "organization", label: "Well organized", rating: 3 },
      { key: "honesty", label: "Honest marketing", rating: 2 },
      { key: "respect", label: "Respected participants' work", rating: 1 },
    ],
    headline: "The sponsors left with free prototypes; we left with nothing",
    body:
      "Every track was a company's real problem, and the 'winning' teams' work went straight to those companies. " +
      "The promised investment conversation never happened for us or anyone I spoke to. Felt less like a hackathon " +
      "and more like unpaid contract work with a leaderboard.",
    verified: true,
    verifyMethod: "evidence",
    author: "Participant, Apex Agent Jam 2026",
    date: "2026-06-14",
  },

  // ══ MetaHacks 2026 — a beginner-friendly student event (good) ═════════════════
  {
    id: "metahacks-2026-1",
    actorSlug: "metahacks",
    eventSlug: "metahacks-2026",
    overall: 5,
    dimensions: [
      { key: "prizes", label: "Prizes delivered as promised", rating: 4 },
      { key: "judging", label: "Judging was fair & transparent", rating: 5 },
      { key: "organization", label: "Well organized", rating: 5 },
      { key: "honesty", label: "Honest marketing", rating: 5 },
      { key: "respect", label: "Respected participants' work", rating: 5 },
    ],
    headline: "My first hackathon and the mentors made it unforgettable",
    body:
      "I came in knowing almost nothing and left having shipped a working demo. The beginner track had mentors on " +
      "call the whole time. Prizes were modest, exactly as advertised, and the swag was handed out on site. " +
      "Couldn't recommend it more for students.",
    verified: true,
    verifyMethod: "github",
    author: "First-time hacker, MetaHacks 2026",
    date: "2026-04-28",
  },
  {
    id: "metahacks-2026-2",
    actorSlug: "metahacks",
    eventSlug: "metahacks-2026",
    overall: 4,
    dimensions: [
      { key: "prizes", label: "Prizes delivered as promised", rating: 4 },
      { key: "judging", label: "Judging was fair & transparent", rating: 4 },
      { key: "organization", label: "Well organized", rating: 3 },
      { key: "honesty", label: "Honest marketing", rating: 5 },
      { key: "respect", label: "Respected participants' work", rating: 5 },
    ],
    headline: "Great vibe — the venue just got a little crowded",
    body:
      "Really welcoming crowd and honest about what was on offer. It got tight on space once all the teams showed " +
      "up, but the organizers kept it running smoothly and were upfront about everything.",
    verified: true,
    verifyMethod: "evidence",
    author: "Participant, MetaHacks 2026",
    date: "2026-04-29",
  },
  {
    id: "metahacks-2026-3",
    actorSlug: "metahacks",
    eventSlug: "metahacks-2026",
    overall: 5,
    dimensions: [
      { key: "respect", label: "Respected participants' work", rating: 5 },
      { key: "organization", label: "Well organized", rating: 5 },
    ],
    headline: "So welcoming to newcomers",
    body:
      "Didn't place but had a blast. Everyone was patient with beginners. Would come back next year.",
    verified: false,
    author: "Attendee, MetaHacks 2026",
    date: "2026-04-30",
  },

  // ══ ChainForge Global Hack 2026 — a token 'prize' that cratered (bad) ═════════
  {
    id: "chainforge-2026-1",
    actorSlug: "chainforge",
    eventSlug: "chainforge-hack-2026",
    overall: 1,
    dimensions: [
      { key: "prizes", label: "Prizes delivered as promised", rating: 1 },
      { key: "perks", label: "Perks & credits were real", rating: 1 },
      { key: "judging", label: "Judging was fair & transparent", rating: 2 },
      { key: "organization", label: "Well organized", rating: 2 },
      { key: "honesty", label: "Honest marketing", rating: 1 },
      { key: "respect", label: "Respected participants' work", rating: 2 },
    ],
    headline: "The '$5,000' prize was a token worth about $180 when it landed",
    body:
      "We placed and were told our prize was '$5,000' — paid in the organizer's own $FORGE token. By the time it " +
      "hit our wallet, the token had dropped so far that the whole thing was worth around $180. The '$500k prize " +
      "pool' headline was denominated at a launch price that never held. Technically they 'paid'; in reality it " +
      "was a fraction of the number they advertised.",
    verified: true,
    verifyMethod: "evidence",
    author: "Prize winner, ChainForge 2026",
    date: "2026-03-05",
    evidence: [
      { label: "Wallet receipt for the $FORGE payout", kind: "screenshot" },
      { label: "Token price chart at payout date", kind: "link" },
    ],
  },
  {
    id: "chainforge-2026-2",
    actorSlug: "chainforge",
    eventSlug: "chainforge-hack-2026",
    overall: 2,
    dimensions: [
      { key: "prizes", label: "Prizes delivered as promised", rating: 2 },
      { key: "perks", label: "Perks & credits were real", rating: 2 },
      { key: "judging", label: "Judging was fair & transparent", rating: 1 },
      { key: "organization", label: "Well organized", rating: 2 },
      { key: "honesty", label: "Honest marketing", rating: 2 },
      { key: "respect", label: "Respected participants' work", rating: 3 },
    ],
    headline: "Disorganized, and the judging was never explained",
    body:
      "Two weeks online with barely any communication from the organizers. Results were posted with no scores and " +
      "no feedback, and support questions went unanswered. Even setting aside the token mess, it just wasn't run " +
      "with any care.",
    verified: true,
    verifyMethod: "email-dkim",
    author: "Participant, ChainForge 2026",
    date: "2026-03-08",
  },
];

export const reviewsData = reviews;
