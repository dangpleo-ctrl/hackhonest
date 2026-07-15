import type { Actor } from "@/lib/types";

// Actors = the reputation subjects. Neutral, factual blurbs. The Agent Builders Summit 2026
// cohort of organizer + enterprise sponsors is the launch seed, alongside a spread of other
// organizers so the record shows the full RANGE — well-run events and badly-run ones alike.
export const actors: Actor[] = [
  // ── Flagship case: organizer + its enterprise sponsors ──────────────────────
  {
    slug: "catalyst-ai",
    name: "Catalyst AI Ventures",
    kinds: ["organizer", "company", "sponsor"],
    aka: ["Catalyst AI", "catalystai.vc"],
    website: "https://catalystai.vc",
    location: "Southeast Asia (HCMC)",
    blurb:
      "A generative-AI-focused venture fund operating across Southeast Asia. Organizer of Agent Builders Summit 2026 (ABS) and prior events including SummerBuild 2025.",
    claimed: false,
  },
  {
    slug: "kfc-vietnam",
    name: "KFC Vietnam",
    kinds: ["company", "sponsor"],
    website: "https://kfcvietnam.com.vn",
    location: "Vietnam",
    blurb: "Quick-service restaurant chain. Sponsored the F&B track at ABS 2026 with production ordering/operations problem statements.",
    claimed: false,
  },
  {
    slug: "vng-games",
    name: "VNG Games",
    kinds: ["company", "sponsor"],
    website: "https://vnggames.com",
    location: "Vietnam",
    blurb: "Game publisher/studio. Sponsored the Gaming track at ABS 2026 with 12 internal game-ops problem statements.",
    claimed: false,
  },
  {
    slug: "tasco",
    name: "Tasco",
    kinds: ["company", "sponsor"],
    website: "https://tasco.com.vn",
    location: "Vietnam",
    blurb: "Infrastructure and mobility group; operates VETC (electronic toll collection) and mapping products. Sponsored the Mobility track at ABS 2026 (12 problems, 60 submission slots).",
    claimed: false,
  },
  {
    slug: "phong-vu",
    name: "Phong Vu",
    kinds: ["company", "sponsor"],
    website: "https://phongvu.vn",
    location: "Vietnam",
    blurb: "Electronics and technology retailer. Sponsored the Retail track at ABS 2026 with e-commerce and sales-agent problem statements.",
    claimed: false,
  },
  {
    slug: "guardian-vietnam",
    name: "Guardian",
    kinds: ["company", "sponsor"],
    location: "Vietnam",
    blurb: "Health and beauty retailer. Co-sponsored the Retail & Hospitality track at ABS 2026.",
    claimed: false,
  },
  {
    slug: "the-anam",
    name: "The Anam",
    kinds: ["company", "sponsor"],
    website: "https://theanam.com",
    location: "Vietnam",
    blurb: "Luxury resort group. Co-sponsored the Retail & Hospitality track at ABS 2026 with hospitality-operations problems.",
    claimed: false,
  },
  {
    slug: "galaxy-holdings",
    name: "Galaxy Holdings",
    kinds: ["company", "sponsor"],
    location: "Vietnam",
    blurb: "Holding group. Sponsored the Aviation track at ABS 2026.",
    claimed: false,
  },
  {
    slug: "gotyme",
    name: "GoTyme / Tyme",
    kinds: ["company", "sponsor"],
    website: "https://gotyme.com.vn",
    location: "Vietnam / Southeast Asia",
    blurb: "Digital bank group. Sponsored a Financial Services track at ABS 2026 with production fintech problem statements (underwriting, AML/KYT, collections).",
    claimed: false,
  },
  {
    slug: "shinhan",
    name: "Shinhan (Future's Lab)",
    kinds: ["company", "sponsor"],
    location: "Vietnam / Korea",
    blurb: "Banking group innovation lab. Sponsored a Financial Services track at ABS 2026 with fraud, eKYC, and RegTech problems.",
    claimed: false,
  },
  {
    slug: "aws",
    name: "Amazon Web Services",
    kinds: ["sponsor"],
    website: "https://aws.amazon.com",
    location: "Global",
    blurb: "Cloud provider. Listed as a credits/prize partner at ABS 2026 (AWS track + advertised credits).",
    claimed: false,
  },
  {
    slug: "openai",
    name: "OpenAI",
    kinds: ["sponsor"],
    website: "https://openai.com",
    location: "Global",
    blurb: "AI provider. Listed by the organizer as a credits partner at ABS 2026 (advertised OpenAI credits + ChatGPT Plus).",
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
];

export const actorBySlug = new Map(actors.map((a) => [a.slug, a]));
