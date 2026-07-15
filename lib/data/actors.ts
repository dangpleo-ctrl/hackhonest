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
    slug: "goldenspoon",
    name: "GoldenSpoon",
    kinds: ["company", "sponsor"],
    website: "https://goldenspoon.example",
    location: "Vietnam",
    blurb: "Quick-service restaurant chain. Sponsored the F&B track at ABS 2026 with production ordering/operations problem statements.",
    claimed: false,
  },
  {
    slug: "vantix-games",
    name: "Vantix Games",
    kinds: ["company", "sponsor"],
    website: "https://vantixgames.example",
    location: "Vietnam",
    blurb: "Game publisher/studio. Sponsored the Gaming track at ABS 2026 with 12 internal game-ops problem statements.",
    claimed: false,
  },
  {
    slug: "tollbridge",
    name: "TollBridge",
    kinds: ["company", "sponsor"],
    website: "https://tollbridge.example",
    location: "Vietnam",
    blurb: "Infrastructure and mobility group; operates AutoPass (electronic toll collection) and mapping products. Sponsored the Mobility track at ABS 2026 (12 problems, 60 submission slots).",
    claimed: false,
  },
  {
    slug: "voltmart",
    name: "VoltMart",
    kinds: ["company", "sponsor"],
    website: "https://voltmart.example",
    location: "Vietnam",
    blurb: "Electronics and technology retailer. Sponsored the Retail track at ABS 2026 with e-commerce and sales-agent problem statements.",
    claimed: false,
  },
  {
    slug: "purecare",
    name: "PureCare",
    kinds: ["company", "sponsor"],
    location: "Vietnam",
    blurb: "Health and beauty retailer. Co-sponsored the Retail & Hospitality track at ABS 2026.",
    claimed: false,
  },
  {
    slug: "azure-bay",
    name: "Azure Bay Resorts",
    kinds: ["company", "sponsor"],
    website: "https://azurebayresorts.example",
    location: "Vietnam",
    blurb: "Luxury resort group. Co-sponsored the Retail & Hospitality track at ABS 2026 with hospitality-operations problems.",
    claimed: false,
  },
  {
    slug: "meridian-holdings",
    name: "Meridian Holdings",
    kinds: ["company", "sponsor"],
    location: "Vietnam",
    blurb: "Holding group. Sponsored the Aviation track at ABS 2026.",
    claimed: false,
  },
  {
    slug: "novabank",
    name: "NovaBank",
    kinds: ["company", "sponsor"],
    website: "https://novabank.example",
    location: "Vietnam / Southeast Asia",
    blurb: "Digital bank group. Sponsored a Financial Services track at ABS 2026 with production fintech problem statements (underwriting, AML/KYT, collections).",
    claimed: false,
  },
  {
    slug: "everbank",
    name: "EverBank (Future Lab)",
    kinds: ["company", "sponsor"],
    location: "Vietnam / Korea",
    blurb: "Banking group innovation lab. Sponsored a Financial Services track at ABS 2026 with fraud, eKYC, and RegTech problems.",
    claimed: false,
  },
  {
    slug: "stratuscloud",
    name: "StratusCloud",
    kinds: ["sponsor"],
    website: "https://stratuscloud.example",
    location: "Global",
    blurb: "Cloud provider. Listed as a credits/prize partner at ABS 2026 (StratusCloud track + advertised credits).",
    claimed: false,
  },
  {
    slug: "neuralforge",
    name: "NeuralForge",
    kinds: ["sponsor"],
    website: "https://neuralforge.example",
    location: "Global",
    blurb: "AI provider. Listed by the organizer as a credits partner at ABS 2026 (advertised NeuralForge credits + NeuralForge Pro).",
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
