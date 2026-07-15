import type { Event } from "@/lib/types";

// Agent Builders Summit 2026 (ABS) — the launch case. Every field here mirrors a real
// organizer's public pages and first-hand attendee reports; the organizer's name and its
// own URLs have been changed for this demo, but the structure and figures are kept intact.
// Presented neutrally.
export const events: Event[] = [
  {
    slug: "abs-2026",
    name: "Agent Builders Summit 2026 (ABS)",
    organizerSlug: "catalyst-ai",
    sponsorSlugs: [
      "goldenspoon", "vantix-games", "tollbridge", "voltmart", "purecare",
      "azure-bay", "meridian-holdings", "novabank", "everbank", "stratuscloud", "neuralforge",
    ],
    dates: "Jul 8–12, 2026",
    location: "Ho Chi Minh City, Vietnam",
    blurb:
      'Billed by the organizer as "Southeast Asia\'s largest agentic AI hackathon." 11 tracks, 67 enterprise problem statements, on-site build day + Demo Day.',
    format:
      "Every project must address a chosen sponsor's problem statement; submission requires a demo, docs, and a source-code link. Stated goal: winning solutions move toward real deployment.",
    claims: [
      { label: "Advertised prize/perk pool", value: "$1,000,000+", note: "Summed largely from third-party credit programs and free tiers; see perks below." },
      { label: "Advertised scale", value: "2,000 builders · 500 projects · 30 partner perks" },
      { label: "Founder Mode track", value: "Up to $150K investment opportunity" },
      { label: "Prize reveal", value: "Track prizes announced only at the Jul 11 kickoff (RSVP in person required)" },
    ],
    tracks: [
      { name: "Founder Mode", sponsor: "catalyst-ai", problemCount: 6 },
      { name: "Mobility", sponsor: "tollbridge", problemCount: 12 },
      { name: "F&B", sponsor: "goldenspoon", problemCount: 4 },
      { name: "Gaming", sponsor: "vantix-games", problemCount: 12 },
      { name: "Retail", sponsor: "voltmart", problemCount: 4 },
      { name: "Retail & Hospitality", sponsor: "purecare", problemCount: 4 },
      { name: "Aviation", sponsor: "meridian-holdings", problemCount: 5 },
      { name: "Financial Services I", sponsor: "everbank", problemCount: 10 },
      { name: "Financial Services II", sponsor: "novabank", problemCount: 8 },
      { name: "Built with StratusCloud", sponsor: "stratuscloud", problemCount: 1 },
      { name: "Physical AI & Robotics", sponsor: "catalyst-ai", problemCount: 1 },
    ],
    problems: [
      { track: "Financial Services II", title: "Regulatory capability engine", statement: "Real-time jurisdiction-aware product configuration; KYC eligibility currently hard-coded per market." },
      { track: "Financial Services II", title: "Adaptive AML/KYT workflow engine", statement: "Policy-driven alert triage that learns; reduce manual review load and false positives." },
      { track: "Financial Services II", title: "In-app financial concierge", statement: "Support agent with safe action-taking across KYC, on/off-ramp, yield, card declines." },
      { track: "Financial Services II", title: "Agentic treasury & capital optimisation", statement: "Prefund management across payment corridors, currently manual and reactive." },
      { track: "Financial Services II", title: "Integrated financial life view", statement: "Personalised insights across spend/save/borrow/grow from NovaBank's data." },
      { track: "Financial Services II", title: "Agentic incentives & gamification", statement: "Adaptive rewards for product adoption and retention." },
      { track: "Financial Services II", title: "Agentic credit decision engine", statement: "Explainable real-time underwriting across personal loans and BNPL, sub-2s decisions." },
      { track: "Financial Services II", title: "Predictive collections agent", statement: "Early risk detection and tailored outreach instead of reactive dunning." },
      { track: "Founder Mode", title: "Open Innovation Event OS", statement: "Run hackathons/accelerators/grants across disconnected tools." },
      { track: "Founder Mode", title: "AI Startup & Enterprise Discovery Platform", statement: "Match enterprises to relevant startups and decision-makers." },
      { track: "Founder Mode", title: "AI Digital Transformation Scorecard", statement: "Current view of digital maturity, AI readiness, capability gaps." },
      { track: "Founder Mode", title: "Human-AgentOS", statement: "Discovery, assignment, governance for human + AI agent teams." },
      { track: "Founder Mode", title: "Organizational AI Memory", statement: "Capability layer so orgs don't lose AI knowledge when people leave." },
      { track: "Founder Mode", title: "Physical World Data Layer", statement: "Real-world interaction data collection for robotics/embodied AI." },
      { track: "Mobility", title: "AI Workspace: Enterprise Knowledge & Secure Search", statement: "Find org knowledge with strict permissions over sensitive docs." },
      { track: "Mobility", title: "AutoPass growth & engagement platform", statement: "Surface roadside assistance, insurance, loyalty beyond toll payment." },
      { track: "Mobility", title: "AutoPass mini-app ecosystem", statement: "Integration-ready mini apps solving vehicle-owner problems." },
      { track: "Mobility", title: "Gamification & engagement platform", statement: "Loyalty, missions, personalised rewards for AutoPass." },
      { track: "Mobility", title: "Vehicle ownership & document assistant", statement: "Manage insurance, inspections, registration, renewals." },
      { track: "Mobility", title: "AI search understanding for maps", statement: "Handle Vietnamese typos, abbreviations, missing accents, mixed-language queries." },
      { track: "Mobility", title: "Semantic search & ranking", statement: "Search by needs/attributes, not just exact place names." },
      { track: "Mobility", title: "Conversational map assistant", statement: "Natural conversation, clarification, personalised recommendations." },
      { track: "Mobility", title: "Autocomplete & query suggestions", statement: "Better intent prediction + Vietnamese handling." },
      { track: "Mobility", title: "Hotel POI intelligence", statement: "Fix fragmented, incomplete accommodation POI data." },
      { track: "Mobility", title: "Restaurant & menu intelligence", statement: "Structure image-heavy menu data, search by dish/preference." },
      { track: "Mobility", title: "Group drive navigation", statement: "Safe collaborative navigation for multi-vehicle trips." },
      { track: "F&B", title: "Recurring payment processing (250+ store QSR)", statement: "Replace manual paper approval chains, invoice re-keying, duplicate-payment risk." },
      { track: "F&B", title: "Kiosk product recommendation engine", statement: "Real-time upsell/cross-sell vs static menus." },
      { track: "F&B", title: "Sales forecasting & anomaly detection", statement: "Detect sales anomalies faster than 24-48h manual review." },
      { track: "F&B", title: "Conversational ordering via chat", statement: "Order inside messaging apps without app-switching." },
      { track: "Aviation", title: "AI maintenance knowledge copilot", statement: "Retrieve/validate aircraft maintenance docs faster." },
      { track: "Aviation", title: "Real-time airport operations monitoring", statement: "Passenger flow, queue congestion, bottlenecks." },
      { track: "Aviation", title: "Aircraft tire remaining-life prediction", statement: "Reduce AOG risk and inventory inefficiency." },
      { track: "Aviation", title: "Alternative credit scoring (thin-file)", statement: "Vietnam has ~45-50M thin-file consumers with little formal credit history." },
      { track: "Aviation", title: "Demand forecasting & inventory optimization", statement: "Balance availability with inventory cost for a retail ecosystem." },
      { track: "Built with StratusCloud", title: "Build with StratusCloud AI/ML", statement: "Make a StratusCloud AI/ML technology a core part of the solution." },
      { track: "Physical AI & Robotics", title: "AI that can listen, speak, see, act", statement: "Systems that interact with people, devices, machines, real-world environments." },
      { track: "Retail", title: "AI sales agent for e-commerce", statement: "Real-time assistance during product discovery to lift conversion." },
      { track: "Retail", title: "Omnichannel personalized recommendation", statement: "Real-time personalized bundles from behavioral + purchase data." },
      { track: "Retail", title: "AI copilot for omnichannel sales/support", statement: "Manage multi-channel social commerce conversations." },
      { track: "Retail", title: "Self-service business intelligence", statement: "Remove the Data/IT reporting bottleneck." },
      { track: "Retail & Hospitality", title: "Product onboarding & compliance automation", statement: "Handle inconsistent supplier docs, certificates, product data." },
      { track: "Retail & Hospitality", title: "Voice of Customer intelligence", statement: "Unify fragmented feedback across marketplaces, channels, social." },
      { track: "Retail & Hospitality", title: "Real-time price checking & comparison", statement: "Single source of truth for competitor pricing, promotions, gaps." },
      { track: "Retail & Hospitality", title: "Commercial intelligence & demand forecasting", statement: "Automate manual daily reservation/performance assembly." },
      { track: "Gaming", title: "Post-release impact agent", statement: "Understand player behavior changes after a patch, not days late." },
      { track: "Gaming", title: "Telemetry-grounded balance copilot", statement: "Balance recommendations grounded in live telemetry." },
      { track: "Gaming", title: "Bug report to reproducible test case", statement: "Turn vague bug reports into reproducible steps." },
      { track: "Gaming", title: "Patch notes & changelog generator", statement: "Tickets/commits/diffs into player-facing notes." },
      { track: "Gaming", title: "Creative performance intelligence", statement: "Which creatives attract high-value players, not just spend." },
      { track: "Gaming", title: "Creative variant generator", statement: "On-brand variants per channel and market." },
      { track: "Gaming", title: "pLTV budget reallocation copilot", statement: "Stop spend flowing to low-value cohorts." },
      { track: "Gaming", title: "Localized store listing & ASO copy", statement: "Culturally tuned listings for new markets." },
      { track: "Gaming", title: "Natural-language segment builder", statement: "Audience descriptions into config/query syntax." },
      { track: "Gaming", title: "Per-segment offer & event copy", statement: "Tailored copy across segments and channels." },
      { track: "Gaming", title: "A/B test design & readout agent", statement: "Consistent experiment design and interpretation." },
      { track: "Gaming", title: "Support ticket triage & resolution", statement: "High-volume mixed-language support tickets." },
      { track: "Financial Services I", title: "AI voice biometrics for fraud", statement: "Faster identity verification + impersonation detection." },
      { track: "Financial Services I", title: "Branch traffic prediction & queue mgmt", statement: "Forecast visit demand and wait times." },
      { track: "Financial Services I", title: "AI-based CRM next-best-action", statement: "Use behavior data for retention/cross-sell." },
      { track: "Financial Services I", title: "Open banking API for credit scoring", statement: "Alternative trusted data for instant loan approval." },
      { track: "Financial Services I", title: "Video call eKYC enhancement", statement: "Stronger liveness, biometric matching, duplicate checks." },
      { track: "Financial Services I", title: "AI for ICT cyber security", statement: "Threat intel, ICT risk detection, prevention." },
      { track: "Financial Services I", title: "AI management BI reporting", statement: "Ask a system directly instead of requesting MIS." },
      { track: "Financial Services I", title: "AI-native rapid POC / vibe coding", statement: "Test new service ideas quickly." },
      { track: "Financial Services I", title: "RegTech / compliance technology", statement: "Scale manual, expensive AML/compliance." },
      { track: "Financial Services I", title: "Insurance claims fraud detection", statement: "Earlier fraud detection before payout." },
    ],
    perks: [
      { provider: "NeuralForge", promised: "$150 credits + 3-mo NeuralForge Pro, per participant", status: "not_received", note: "Attendee applied (portal showed 'Applied'/'Claimed') and received $0." },
      { provider: "StratusCloud", promised: "$1,000 StratusCloud credits", status: "third_party_program", note: "Link redirected to StratusCloud's standard Activate program (open to any accepted applicant; unrelated to the event)." },
      { provider: "Hyperion for Startups", promised: "Up to $1,500,000 'prize pool'", status: "third_party_program", note: "Hyperion's own standard cloud + tooling program, presented as an event prize pool." },
      { provider: "PixelByte", promised: "$15,000 (V-START)", status: "third_party_program", note: "A startup credit program you apply to separately." },
      { provider: "Noteflow", promised: "Over $6,000 'estimated value'", status: "third_party_program", note: "Noteflow's standard startup offer; an estimated value, not cash." },
      { provider: "Lumen AI", promised: "$10 API credits", status: "out_of_stock", note: "Listed as OUT OF STOCK on the perks page." },
    ],
    winners: [
      { track: "Founder Mode", team: "Team Synapse", project: "Founder Mode 1", placement: "Winner", sponsor: "catalyst-ai" },
      { track: "Founder Mode", team: "Cortex Collective", project: "Founder Track 2", placement: "Winner", sponsor: "catalyst-ai" },
      { track: "Mobility", team: "WindQuery", project: "AI In Office: Ask Anything", placement: "Winner", sponsor: "tollbridge" },
      { track: "Mobility", team: "PathPilot", project: "Maps & Search", placement: "Winner", sponsor: "tollbridge" },
      { track: "Mobility", team: "PoolUp", project: "AutoPass Car Pooling", placement: "Winner", sponsor: "tollbridge" },
      { track: "F&B", team: "TwinStack", project: "Chat & Voice Order for GoldenSpoon", placement: "Winner", sponsor: "goldenspoon" },
      { track: "F&B", team: "RootAgents", project: "GoldenSpoon AP Autopilot / VOUCH", placement: "Shortlist", sponsor: "goldenspoon" },
      { track: "F&B", team: "InsightGuard", project: "Sales Forecasting", placement: "Shortlist", sponsor: "goldenspoon" },
      { track: "Aviation", team: "SkyTrace", project: "SkyTrace Tire Intelligence", placement: "Winner", sponsor: "meridian-holdings" },
      { track: "Built with StratusCloud", team: "Unison", project: "StratusCloud-Powered Agentic Ordering for GoldenSpoon", placement: "Winner", sponsor: "stratuscloud" },
      { track: "Built with StratusCloud", team: "Sentinel Labs", project: "The AML that learns", placement: "Runner-up", sponsor: "stratuscloud" },
      { track: "Built with StratusCloud", team: "ScoutAI", project: "ScoutAI", placement: "Runner-up", sponsor: "stratuscloud" },
      { track: "Retail", team: "WorksmartAI", project: "WorksmartAI", placement: "Winner", sponsor: "voltmart" },
      { track: "Retail", team: "VeriWorks", project: "VoltMart Sales Agents", placement: "Winner", sponsor: "voltmart" },
      { track: "Retail & Hospitality", team: "PalmGuard", project: "PureCare Palm", placement: "Winner", sponsor: "purecare" },
      { track: "Retail & Hospitality", team: "PriceHawks", project: "Price Radar", placement: "Shortlist", sponsor: "purecare" },
      { track: "Hospitality", team: "DaybreakAI", project: "Daybreak", placement: "Winner", sponsor: "azure-bay" },
      { track: "Physical AI & Robotics", team: "Elemental", project: "Elemental Arena", placement: "Winner", sponsor: "catalyst-ai" },
      { track: "Gaming", team: "TimeLoop", project: "Agamotto", placement: "Winner", sponsor: "vantix-games" },
      { track: "Gaming", team: "GameBot Labs", project: "AI Game Bot", placement: "Runner-up", sponsor: "vantix-games" },
      { track: "Gaming", team: "FlowDirector", project: "GameFlow AI Director", placement: "Runner-up", sponsor: "vantix-games" },
      { track: "Financial Services I", team: "Aegis Labs", project: "Aegis", placement: "Winner", sponsor: "everbank" },
      { track: "Financial Services I", team: "VerdictAI", project: "Verdictgate", placement: "Runner-up", sponsor: "everbank" },
      { track: "Financial Services II", team: "FinOS", project: "The Financial OS for AI Agents", placement: "Winner", sponsor: "novabank" },
      { track: "Financial Services II", team: "ComplyHub", project: "Compliance Hub", placement: "Runner-up", sponsor: "novabank" },
    ],
    facts: [
      { label: "Moved off the accountable platform", fact: "The event was originally listed on Devpost, then moved to a private portal days before it started. The Devpost page still banners: 'We have moved away from Devpost to our official portal.'", source: "agent-builders-summit-2026.devpost.com" },
      { label: "Source code required", fact: "Submission rules require a source-code link plus a demo and docs, and state the project 'should address the problem statement for the chosen sponsored track.'", source: "build.catalystai.vc/hackathon" },
      { label: "Deployment framing", fact: "Positioning stated: 'Enterprises aren't here to judge you, they're here to find solutions they can ship,' with winning solutions 'potentially deploying within 90 days.'", source: "build.catalystai.vc" },
      { label: "Prizes hidden until mid-event", fact: "Track prizes were announced only at the Jul 11 kickoff, which required an in-person RSVP.", source: "build.catalystai.vc/prizes" },
      { label: "Public leaderboard measures referrals", fact: "The only public 'Leaderboard' ranks Top Referrers (who brought the most people in), not solution quality.", source: "build.catalystai.vc/leaderboard" },
      { label: "Perk disclaimer", fact: "The perks page states: 'Submitting an application does not guarantee receipt.'", source: "build.catalystai.vc/perks" },
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
