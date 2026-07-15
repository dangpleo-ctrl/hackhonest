import type { Actor } from "@/lib/types";

// Actors = the reputation subjects. Neutral, factual blurbs. The seed spans a range of
// hackathon organizers and sponsors — well-run and badly-run alike. Reputation attaches to
// the actor across events, because the same operators re-run hackathons under new names.
export const actors: Actor[] = [
  // ── Zenith AI Ventures + its sponsor cohort — the flagship "on the record" case ──
  {
    slug: "zenith-ai",
    name: "Zenith AI Ventures",
    kinds: ["organizer", "company", "sponsor"],
    aka: ["Zenith Labs"],
    website: "https://zenithai.example",
    location: "Singapore",
    blurb:
      "An AI-focused venture group. Organizer of the Zenith Agent Grand Prix 2026, a multi-track agentic AI competition built around sponsor problem statements; verified reviewers report advertised credits that never arrived and prizes that were never paid.",
    claimed: false,
  },
  {
    slug: "crestline-bank",
    name: "Crestline Bank",
    kinds: ["company", "sponsor"],
    website: "https://crestlinebank.example",
    location: "Singapore",
    blurb:
      "A fintech company. Sponsored the Fintech track of the Zenith Agent Grand Prix 2026 with production-style problem statements.",
    claimed: false,
  },
  {
    slug: "swiftcart",
    name: "SwiftCart",
    kinds: ["company", "sponsor"],
    website: "https://swiftcart.example",
    location: "Southeast Asia",
    blurb:
      "A retail company. Sponsored the Retail track of the Zenith Agent Grand Prix 2026.",
    claimed: false,
  },
  {
    slug: "playforge",
    name: "PlayForge Studios",
    kinds: ["company", "sponsor"],
    website: "https://playforge.example",
    location: "Southeast Asia",
    blurb:
      "A game studio. Sponsored the Gaming track of the Zenith Agent Grand Prix 2026.",
    claimed: false,
  },
  {
    slug: "cloudnova",
    name: "CloudNova",
    kinds: ["sponsor"],
    website: "https://cloudnova.example",
    location: "Global / Remote",
    blurb:
      "A cloud provider. Listed as a credits partner for the Zenith Agent Grand Prix 2026; verified reviewers report its advertised event credits redirected to CloudNova's own standard signup program.",
    claimed: false,
  },
  {
    slug: "circuitai",
    name: "CircuitAI",
    kinds: ["sponsor"],
    website: "https://circuitai.example",
    location: "Singapore / Southeast Asia",
    blurb:
      "An AI infrastructure company. Listed as a credits partner for the Zenith Agent Grand Prix 2026; verified reviewers report its advertised per-participant credits were never delivered.",
    claimed: false,
  },

  // ── A well-run community organizer (the counter-example — good actors exist) ──
  {
    slug: "openbuild-collective",
    name: "OpenBuild Collective",
    kinds: ["organizer"],
    website: "https://openbuild.dev",
    location: "Singapore / Southeast Asia",
    blurb:
      "A volunteer-run, non-profit developer community. Runs open-theme hackathons with cash prizes paid on the day and no claim on participants' IP.",
    claimed: true,
  },

  // ── A corporate lab: well-organized but slow on the money (mixed record) ──────
  {
    slug: "nexus-labs",
    name: "Nexus Labs",
    kinds: ["organizer", "company"],
    website: "https://nexuslabs.example",
    location: "Hanoi, Vietnam",
    blurb:
      "Corporate innovation lab of a regional tech group. Runs an annual AI challenge; builders keep their IP, though prize payout has drawn complaints about speed.",
    claimed: true,
  },

  // ── A repeat bad actor that has run under several names (the rebrand signal) ──
  {
    slug: "apex-innovation",
    name: "Apex Innovation Labs",
    kinds: ["organizer", "company"],
    aka: ["Pinnacle Ventures", "Summit AI Collective", "apexlabs.io"],
    website: "https://apexlabs.example",
    location: "Southeast Asia",
    blurb:
      "Runs recurring 'innovation challenge' hackathons. Has operated the same event under multiple brand names; verified reviewers report unpaid prizes and IP-assignment terms across those runs.",
    claimed: false,
  },

  // ── A student league (good, beginner-friendly) ───────────────────────────────
  {
    slug: "metahacks",
    name: "MetaHacks Student League",
    kinds: ["organizer"],
    website: "https://metahacks.example",
    location: "Da Nang, Vietnam",
    blurb:
      "Student-run collegiate hackathon league. Beginner-friendly, open theme, modest cash plus swag; mentors and judging draw consistent praise.",
    claimed: true,
  },

  // ── A web3 organizer whose 'prize pool' was a token that cratered ────────────
  {
    slug: "chainforge",
    name: "ChainForge Labs",
    kinds: ["organizer", "company"],
    website: "https://chainforge.example",
    location: "Global / Remote",
    blurb:
      "Web3 hackathon organizer. Advertised large 'token prize pools'; verified reviewers report the prize token was paid at a value far below what was advertised.",
    claimed: false,
  },

  // ── Real, recent July 2026 events — added as NEUTRAL directory entries with NO
  //    reviews, so a live demo audience can be invited to post the first reviews.
  //    Facts only; no ratings, no accusations. ──────────────────────────────────
  {
    slug: "genai-fund",
    name: "GenAI Fund",
    kinds: ["organizer", "company", "sponsor"],
    website: "https://genaifund.ai",
    location: "Southeast Asia (HCMC)",
    blurb:
      "A generative-AI-focused venture fund in Southeast Asia. Organizer of Agentic AI Build Week 2026 (AABW) in Ho Chi Minh City.",
    claimed: false,
  },
  {
    slug: "openai-build-week",
    name: "OpenAI Build Week — Vietnam Community",
    kinds: ["organizer"],
    location: "Ho Chi Minh City & Hanoi, Vietnam",
    blurb:
      "Community-run OpenAI Build Week event across two Vietnamese cities, where builders collaborate on open-source projects using AI tools.",
    claimed: false,
  },
  {
    slug: "alibaba-cloud",
    name: "Alibaba Cloud",
    kinds: ["organizer", "company", "sponsor"],
    website: "https://alibabacloud.com",
    location: "Ho Chi Minh City, Vietnam",
    blurb:
      "Cloud provider. Organizer of the Alibaba Cloud Agentic AI Hackathon (with Nghiên AI), featuring its Qoder AI-native coding platform.",
    claimed: false,
  },
];

export const actorBySlug = new Map(actors.map((a) => [a.slug, a]));
