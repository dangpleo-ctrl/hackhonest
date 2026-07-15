import type { Event } from "@/lib/types";

// Zenith Agent Grand Prix 2026 (organizerSlug "zenith-ai") — the flagship "on the record" case.
// A multi-track agentic AI competition whose record shows the patterns HackHonest helps builders
// spot: an inflated third-party "perk pool", sponsor-owned problem tracks, prizes hidden until an
// in-person kickoff, a referral leaderboard, and credits that never arrive. The recent July 2026
// events further down are neutral, factual directory entries with no reviews.
export const events: Event[] = [
  // ── Zenith Agent Grand Prix 2026 — the flagship "on the record" case ───────────────────────
  {
    slug: "zenith-grand-prix-2026",
    name: "Zenith Agent Grand Prix 2026",
    organizerSlug: "zenith-ai",
    sponsorSlugs: ["crestline-bank", "swiftcart", "playforge", "cloudnova", "circuitai"],
    dates: "Aug 20–24, 2026",
    location: "Singapore (in-person) + online",
    blurb:
      "Billed by its organizer as \"the region's largest agentic AI grand prix\": four sponsor tracks, seven enterprise problem statements, an in-person build day, and a Demo Day. Verified reviewers report advertised credits that never arrived and prizes announced on stage but never paid.",
    format:
      "Every project must address a chosen sponsor's problem statement; submission requires a demo, docs, and a source-code link. Stated goal: winning solutions move toward real deployment.",
    claims: [
      { label: "Advertised prize/perk pool", value: "$1,000,000+", note: "Summed largely from third-party credit programs and free tiers; see perks below." },
      { label: "Advertised scale", value: "3,000 builders · 600 projects · 25 partner perks" },
      { label: "Prize reveal", value: "Track prizes announced only at the Aug 22 in-person kickoff (RSVP required)" },
    ],
    tracks: [
      { name: "Fintech", sponsor: "crestline-bank", problemCount: 2 },
      { name: "Retail", sponsor: "swiftcart", problemCount: 2 },
      { name: "Gaming", sponsor: "playforge", problemCount: 2 },
      { name: "Built with CloudNova", sponsor: "cloudnova", problemCount: 1 },
    ],
    problems: [
      { track: "Fintech", title: "Real-time fraud triage copilot", statement: "Cut manual review load on Crestline Bank's transaction-monitoring queue without raising false declines." },
      { track: "Fintech", title: "Explainable instant underwriting", statement: "Sub-2s loan decisions for thin-file applicants, with a reason code a Crestline Bank officer can defend." },
      { track: "Retail", title: "Conversational shopping agent", statement: "Guide SwiftCart shoppers to the right product mid-session to lift checkout conversion." },
      { track: "Retail", title: "Returns-fraud detection", statement: "Flag abusive return patterns across SwiftCart's marketplace before refunds are issued." },
      { track: "Gaming", title: "Live-ops balance copilot", statement: "Turn PlayForge Studios' match telemetry into balance changes designers can ship in the same patch." },
      { track: "Gaming", title: "Player-support ticket triage", statement: "Route and draft first replies for PlayForge Studios' high-volume, mixed-language support inbox." },
      { track: "Built with CloudNova", title: "Built on CloudNova AI services", statement: "Make a CloudNova managed AI service the core of the solution." },
    ],
    perks: [
      { provider: "CircuitAI", promised: "$150 credits per participant", status: "not_received", note: "Participant applied (portal showed 'Claimed') and received $0." },
      { provider: "CloudNova", promised: "$1,000 CloudNova credits", status: "third_party_program", note: "The perk link redirected to CloudNova's standard startup-credits program, open to any applicant and unrelated to the event." },
      { provider: "Hyperion for Startups", promised: "Up to $1,500,000 'prize pool'", status: "third_party_program", note: "Hyperion's own standard cloud + tooling program, presented as an event prize pool." },
      { provider: "Noteflow", promised: "Over $6,000 'estimated value'", status: "third_party_program", note: "Noteflow's standard startup offer; an estimated value, not cash." },
      { provider: "Nimbus AI", promised: "$10 API credits", status: "out_of_stock", note: "Listed as OUT OF STOCK on the perks page." },
    ],
    winners: [
      { track: "Fintech", team: "Team Ledgerline", project: "RiskLens — for Crestline Bank", placement: "Winner", sponsor: "crestline-bank" },
      { track: "Fintech", team: "Team Underwrite", project: "SnapDecision — for Crestline Bank", placement: "Runner-up", sponsor: "crestline-bank" },
      { track: "Retail", team: "Team Cartwheel", project: "ShopGuide — for SwiftCart", placement: "Winner", sponsor: "swiftcart" },
      { track: "Gaming", team: "Team Respawn", project: "BalanceBot — for PlayForge Studios", placement: "Winner", sponsor: "playforge" },
      { track: "Gaming", team: "Team Checkpoint", project: "TriageQuest — for PlayForge Studios", placement: "Runner-up", sponsor: "playforge" },
      { track: "Built with CloudNova", team: "Team Nimbus", project: "Agentic Ordering — built on CloudNova", placement: "Winner", sponsor: "cloudnova" },
    ],
    facts: [
      { label: "Moved off the accountable platform", fact: "The event was first listed on a public hackathon platform, then moved to a private portal days before it started, so entries and results no longer sit on a neutral third-party site.", source: "zenithai.example/portal" },
      { label: "Source code required", fact: "Submission rules require a source-code link plus a demo and docs, and state the project 'should address the problem statement for the chosen sponsored track.'", source: "build.zenithai.example/rules" },
      { label: "Deployment framing", fact: "Positioning stated: 'Sponsors aren't here to judge you, they're here to find solutions they can ship,' with winning solutions 'potentially deploying within 90 days.'", source: "build.zenithai.example" },
      { label: "Prizes hidden until the kickoff", fact: "Track prizes were announced only at the Aug 22 kickoff, which required an in-person RSVP.", source: "build.zenithai.example/prizes" },
      { label: "Public leaderboard measures referrals", fact: "The only public 'Leaderboard' ranks Top Referrers (who brought the most people in), not solution quality.", source: "build.zenithai.example/leaderboard" },
      { label: "Perk disclaimer", fact: "The perks page states: 'Submitting an application does not guarantee receipt.'", source: "build.zenithai.example/perks" },
    ],
  },

  // ── OpenBuild Hack 2026 — a well-run community event (the counter-example) ────
  {
    slug: "openbuild-hack-2026",
    name: "OpenBuild Hack 2026",
    organizerSlug: "openbuild-collective",
    sponsorSlugs: [],
    dates: "Mar 14–15, 2026",
    location: "Singapore",
    blurb:
      "An open-theme community hackathon. Build anything you like, keep your IP, and winners are paid in cash on stage on the final day.",
    format:
      "Open theme — no assigned corporate problem and no source-code hand-over. Judged on demo, originality, and craft. Winners paid on the day by bank transfer.",
    claims: [
      { label: "Prize pool", value: "$20,000 cash", note: "Paid on stage the same day, per the organizer and verified reviewers." },
      { label: "IP ownership", value: "Builders keep 100%", note: "No assignment clause in the rules." },
    ],
    perks: [
      { provider: "DigitalOcean", promised: "$200 credits per team", status: "delivered", note: "Verified reviewers confirmed the codes worked." },
      { provider: "GitHub", promised: "Copilot Pro vouchers", status: "delivered" },
    ],
    winners: [
      { track: "Open", team: "Team Photon", project: "LiveCaption for lectures", placement: "Winner" },
      { track: "Open", team: "Midnight Compiler", project: "A CLI that explains stack traces", placement: "Runner-up" },
      { track: "Open", team: "The Rubber Ducks", project: "Pair-programming voice bot", placement: "Runner-up" },
    ],
    facts: [
      { label: "Prizes paid on stage", fact: "Cash prizes were handed to winners on the final day; multiple verified attendees confirmed the transfer landed within the week.", source: "openbuild.dev/2026" },
      { label: "No IP claim", fact: "The rules state participants retain all rights to what they build.", source: "openbuild.dev/rules" },
    ],
  },

  // ── Nexus AI Challenge 2026 — well-organized, slow on the money (mixed) ───────
  {
    slug: "nexus-ai-challenge-2026",
    name: "Nexus AI Challenge 2026",
    organizerSlug: "nexus-labs",
    sponsorSlugs: [],
    dates: "May 2–4, 2026",
    location: "Hanoi, Vietnam",
    blurb:
      "A corporate-run AI hackathon with hands-on mentorship from the lab's engineers. Builders keep their IP; the recurring complaint has been how long prize money took to arrive.",
    format:
      "Theme-based (AI for enterprise operations). Builders retain their IP. Judged by an internal panel against a rubric published before submissions closed.",
    claims: [
      { label: "Prize pool", value: "$10,000", note: "Paid by bank transfer after the event; the timing has drawn complaints." },
    ],
    perks: [
      { provider: "Azure", promised: "$300 credits per team", status: "delivered" },
      { provider: "Noteflow", promised: "Team-plan vouchers", status: "out_of_stock", note: "Listed as a perk but marked out of stock by day two." },
    ],
    facts: [
      { label: "Judging criteria published up front", fact: "The scoring rubric was shared with participants before submissions closed.", source: "nexuslabs.example/rules" },
    ],
  },

  // ── Pinnacle AI Buildoff 2025 — same operator as Apex, older brand (bad) ──────
  {
    slug: "pinnacle-buildoff-2025",
    name: "Pinnacle AI Buildoff 2025",
    organizerSlug: "apex-innovation",
    sponsorSlugs: [],
    dates: "Nov 21–23, 2025",
    location: "Southeast Asia",
    blurb:
      "Run under the 'Pinnacle Ventures' brand. Advertised a large prize pool; verified winners report the headline prizes were announced but never paid.",
    claims: [
      { label: "Advertised prize pool", value: "$50,000", note: "Verified winners report the headline prizes were not paid." },
      { label: "Advertised perks", value: "'$100k+ in partner perks'", note: "Links pointed to partners' own public startup programs." },
    ],
    perks: [
      { provider: "Assorted partners", promised: "'$100,000+ in perks'", status: "third_party_program", note: "The listed perks were partners' own standard programs, open to anyone." },
    ],
    facts: [
      { label: "Same operator, later renamed", fact: "The organizer went on to run a near-identical event in 2026 under the name 'Apex Agent Jam'.", source: "apexlabs.example/about" },
    ],
  },

  // ── Apex Agent Jam 2026 — the rebrand, with an IP-assignment clause (bad) ─────
  {
    slug: "apex-agent-jam-2026",
    name: "Apex Agent Jam 2026",
    organizerSlug: "apex-innovation",
    sponsorSlugs: [],
    dates: "Jun 6–8, 2026",
    location: "Southeast Asia",
    blurb:
      "The 'Pinnacle' event rebranded. Submission rules require assigning project IP to the organizer, and verified reviewers again report prizes falling short of what was advertised.",
    format:
      "Source-code submission required. The rules include an IP-assignment clause transferring rights in submitted projects to the organizer.",
    claims: [
      { label: "Advertised prize pool", value: "$40,000 + investment", note: "Verified reviewers report the investment offer did not materialize." },
    ],
    facts: [
      { label: "IP assignment in the terms", fact: "The submission terms state that projects submitted become the property of the organizer.", source: "apexlabs.example/terms" },
      { label: "Previously known as Pinnacle", fact: "Verified reviewers identified this as the same operator that ran the 2025 'Pinnacle AI Buildoff'.", source: "apexlabs.example/about" },
    ],
  },

  // ── MetaHacks 2026 — a beginner-friendly student event (good) ─────────────────
  {
    slug: "metahacks-2026",
    name: "MetaHacks 2026",
    organizerSlug: "metahacks",
    sponsorSlugs: [],
    dates: "Apr 25–26, 2026",
    location: "Da Nang, Vietnam",
    blurb:
      "A 24-hour student hackathon. Beginner-friendly, open theme, strong mentorship, with swag and modest cash for the winners.",
    format:
      "24 hours, open theme, teams of up to four, with a dedicated beginner track and mentors. Participants keep their IP.",
    claims: [
      { label: "Prizes", value: "$2,000 + swag", note: "Modest, but paid; swag handed out on site." },
    ],
    perks: [
      { provider: "GitHub Education", promised: "Student developer packs", status: "delivered" },
    ],
    facts: [
      { label: "Beginner-friendly by design", fact: "Around half the participants were first-time hackers, supported by a dedicated mentor track.", source: "metahacks.example/2026" },
    ],
  },

  // ── ChainForge Global Hack 2026 — a token 'prize pool' that cratered (bad) ────
  {
    slug: "chainforge-hack-2026",
    name: "ChainForge Global Hack 2026",
    organizerSlug: "chainforge",
    sponsorSlugs: [],
    dates: "Feb 8–22, 2026",
    location: "Online",
    blurb:
      "A two-week online web3 hackathon. Advertised a large 'token prize pool'; verified winners report the prize token was worth a fraction of the advertised figure by the time it arrived.",
    format:
      "Online. Submit a repository plus a demo. Prizes paid in the organizer's own token.",
    claims: [
      { label: "Advertised prize pool", value: "$500,000 in $FORGE tokens", note: "Verified winners report the token traded far below the advertised value on receipt." },
    ],
    perks: [
      { provider: "Assorted L2 chains", promised: "Testnet credits & 'ecosystem grants'", status: "third_party_program" },
    ],
    facts: [
      { label: "Prize denominated in the organizer's token", fact: "The advertised USD figure was based on a token price that verified winners say did not hold when prizes were distributed.", source: "chainforge.example/hack-2026" },
    ],
  },

  // ══ Real, recent July 2026 events — NO reviews. Neutral, factual entries only, so a
  //    live demo audience can be invited to post the first review of an event they
  //    actually attended. The empty-reviews state shows the "were you there?" prompt. ══
  {
    slug: "genaifund-aabw-2026",
    name: "Agentic AI Build Week 2026 (AABW)",
    organizerSlug: "genai-fund",
    sponsorSlugs: [],
    dates: "Jul 8–12, 2026",
    location: "Ho Chi Minh City, Vietnam",
    blurb:
      "An enterprise-focused agentic AI hackathon with multiple sponsor tracks, on-site build days, and a Demo Day, held in Ho Chi Minh City.",
    format: "Multi-track hackathon built around sponsor problem statements, with an on-site build day and Demo Day.",
  },
  {
    slug: "openai-build-week-2026",
    name: "OpenAI Build Week — Community Event (HCMC & Hanoi)",
    organizerSlug: "openai-build-week",
    sponsorSlugs: [],
    dates: "Jul 18, 2026",
    location: "Ho Chi Minh City & Hanoi, Vietnam",
    blurb:
      "A community OpenAI Build Week event run across two Vietnamese cities, where builders collaborate on open-source projects using AI tools, with prizes for the best work.",
    format: "In-person across two cities (Grab Vietnam office, HCMC; National Startup Support Center, Hanoi). Open-source project builds with prizes.",
  },
  {
    slug: "alibaba-agentic-hackathon-2026",
    name: "Alibaba Cloud Agentic AI Hackathon",
    organizerSlug: "alibaba-cloud",
    sponsorSlugs: [],
    dates: "Jul 2026",
    location: "Ho Chi Minh City, Vietnam",
    blurb:
      "A kickoff plus two-week competition to build agentic AI solutions for banking, insurance, and capital-markets problems, using the Qoder AI-native coding platform.",
    format: "Kickoff workshop and guided build, then a two-week main competition. Introduces the Qoder AI-native coding platform.",
  },
];

export const eventBySlug = new Map(events.map((e) => [e.slug, e]));
