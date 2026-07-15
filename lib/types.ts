// Data model for HackHonest. Reputation attaches to the ACTOR (organizer / company /
// sponsor) across events, because bad actors rebrand and re-run. Reviews are verified,
// first-person, and structured; the platform only ever shows NEUTRAL COUNTS of what
// reviewers reported, never its own verdict.

export type ActorKind = "organizer" | "company" | "sponsor";

export interface Actor {
  slug: string;
  name: string;
  kinds: ActorKind[]; // an org can be both organizer AND sponsor
  aka?: string[]; // rebrands / aliases — the "same operator?" signal (shown, never auto-asserted)
  website?: string;
  location?: string;
  blurb: string; // neutral, factual, one or two sentences
  claimed?: boolean; // has the actor claimed the page (right-of-reply)?
  example?: boolean; // fictional, illustrative-only entry — rendered with a clear "example" banner, never a real accusation
}

// A perk/credit line as ADVERTISED by the organizer, plus what a verified attendee reported.
export type PerkStatus =
  | "not_received"
  | "third_party_program" // reskinned someone else's public program
  | "delivered"
  | "unknown"
  | "out_of_stock";

export interface Perk {
  provider: string; // "NeuralForge", "StratusCloud", ...
  promised: string; // "$150 credits + 3-mo NeuralForge Pro"
  status: PerkStatus;
  note?: string;
}

export interface Problem {
  track: string;
  title: string;
  statement: string;
}

export type Placement = "Winner" | "Runner-up" | "Shortlist";

export interface Winner {
  track: string;
  team: string;
  project?: string;
  placement: Placement;
  sponsor?: string; // the enterprise whose problem this addressed
}

// A neutral, sourced FACT about an event (never a platform accusation).
export interface EventFact {
  label: string;
  fact: string;
  source?: string;
}

export interface EventClaim {
  label: string; // "Advertised prize pool"
  value: string; // "$1M+ perks & credits"
  note?: string; // neutral caveat
}

export interface Event {
  slug: string;
  name: string;
  organizerSlug: string;
  sponsorSlugs: string[];
  dates: string;
  location: string;
  blurb: string;
  format?: string;
  claims?: EventClaim[];
  tracks?: { name: string; sponsor?: string; problemCount: number }[];
  problems?: Problem[];
  perks?: Perk[];
  winners?: Winner[];
  facts?: EventFact[]; // neutral, sourced facts (e.g. "moved off the accountable platform")
  example?: boolean; // fictional, illustrative-only event — rendered with a clear "example" banner, not a real event
}

export interface ReviewDimension {
  key: string;
  label: string;
  rating: number; // 1-5
}

export type VerifyMethod = "founder-attested" | "github" | "evidence" | "email-dkim";

export interface Evidence {
  label: string;
  kind: "screenshot" | "email" | "link";
  note?: string;
}

export interface Reply {
  author: string;
  body: string;
  date: string;
}

export interface Review {
  id: string;
  actorSlug?: string;
  eventSlug?: string;
  overall: number; // 1-5
  dimensions: ReviewDimension[];
  headline: string;
  body: string; // first-person, disclosed-facts framing
  verified: boolean;
  verifyMethod?: VerifyMethod;
  author: string; // pseudonym; identity is stored separately, never shown
  date: string;
  evidence?: Evidence[];
  reply?: Reply; // organizer right-of-reply (reply, never delete)
}

// The standard structured dimensions a reviewer scores. Keeping content on the
// OPINION side of the line (disclosed-facts) is the legal design; these are the
// checkable questions.
export const REVIEW_DIMENSIONS: { key: string; label: string; help: string }[] = [
  { key: "prizes", label: "Prizes delivered as promised", help: "Were advertised prizes actually paid, in full, on time?" },
  { key: "perks", label: "Perks & credits were real", help: "Were the listed credits/perks actually provided by the organizer, not a reskinned third-party program?" },
  { key: "judging", label: "Judging was fair & transparent", help: "Clear criteria, no conflicts, results explained?" },
  { key: "organization", label: "Well organized", help: "Venue, schedule, comms, support?" },
  { key: "honesty", label: "Honest marketing", help: "Did the reality match what was advertised?" },
  { key: "respect", label: "Respected participants' work", help: "Fair treatment of your time, IP, and effort?" },
];

// Neutral aggregate over a set of reviews — a COUNT of what reviewers reported,
// never a platform verdict.
export interface Aggregate {
  count: number;
  verifiedCount: number;
  avgOverall: number | null;
  dimensionAverages: { key: string; label: string; avg: number | null; count: number }[];
  // "N of M verified reviewers reported perks not delivered", etc.
  signals: { label: string; n: number; of: number }[];
}
