// Shared shapes + helpers for the "suggest an entry" flow (assist-and-confirm).
//
// A person pastes a link → the analyze route reads it, asks the product AI to
// extract the entry, and checks the existing directory for duplicates → the
// person reviews a pre-filled form and submits it into a moderation queue.
//
// This module is deliberately free of any `@/lib/data` import so it stays safe
// to import from the CLIENT form (for `ENTRY_TYPES` + the shared types) without
// pulling the seed dataset into the browser bundle. `computeDuplicates` takes
// the actors/events arrays as arguments; the server route passes them in.

import type { Actor, Event } from "@/lib/types";

// The four kinds of directory entry a person can suggest. `organizer` and
// `event` map to the two existing detail routes (/o/[slug], /e/[slug]);
// `company`/`sponsor` are actor kinds that also live on the organizer route.
export const ENTRY_TYPES = ["organizer", "event", "company", "sponsor"] as const;
export type SuggestEntryType = (typeof ENTRY_TYPES)[number];

export function isEntryType(v: unknown): v is SuggestEntryType {
  return typeof v === "string" && (ENTRY_TYPES as readonly string[]).includes(v);
}

// What the AI extracts from a page (all optional-ish; the person edits it).
export interface ExtractedEntry {
  type: SuggestEntryType;
  name: string;
  website: string;
  location: string;
  dates: string; // events only; empty otherwise
  blurb: string;
  sponsors: string[]; // detected sponsor names (free text; not slugs)
}

// A possible existing directory entry the suggestion might duplicate.
export interface DuplicateMatch {
  kind: "actor" | "event";
  slug: string;
  name: string;
  score: number; // 0..1 similarity (higher = closer)
  href: string; // /o/<slug> or /e/<slug>
}

// The analyze route's response. `extracted: null` + `aiDisabled` = no key set;
// `extracted: null` + `error` = a soft failure (bad url, fetch/AI error) the UI
// shows while still letting the person fill the form manually. Never a 500.
export interface AnalyzeResult {
  extracted: ExtractedEntry | null;
  duplicates: DuplicateMatch[];
  aiDisabled?: boolean;
  error?: string;
}

// The payload the suggest route accepts (the reviewed, confirmed entry).
export interface SuggestionPayload {
  type: SuggestEntryType;
  name: string;
  website?: string;
  location?: string;
  dates?: string;
  blurb?: string;
  sponsors: string[];
  sourceUrl?: string;
  submittedBy?: string;
}

// ── Normalization + fuzzy matching (no heavy dependency) ─────────────────────

const LEGAL_SUFFIXES = new Set([
  "the", "inc", "incorporated", "llc", "ltd", "limited", "co", "corp",
  "corporation", "gmbh", "plc", "pte", "pvt", "llp", "lp", "sa", "ag", "bv",
]);

/** Lowercase, expand &, strip punctuation + "the"/legal suffixes, collapse spaces. */
export function normalizeName(input: string): string {
  return input
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((w) => w && !LEGAL_SUFFIXES.has(w))
    .join(" ")
    .trim();
}

/**
 * Distinctive tokens of a name: drops single characters and purely-numeric
 * tokens (a shared year like "2026" is never evidence of the same entity).
 */
function tokenSet(input: string): Set<string> {
  return new Set(
    normalizeName(input)
      .split(" ")
      .filter((w) => w.length >= 2 && !/^\d+$/.test(w)),
  );
}

/** Bare host (no scheme, no www, lowercase) of a possibly-schemeless url, or null. */
export function hostOf(raw: string): string | null {
  const s = raw.trim();
  if (!s) return null;
  try {
    const u = new URL(/^https?:\/\//i.test(s) ? s : `https://${s}`);
    return u.hostname.replace(/^www\./, "").toLowerCase() || null;
  } catch {
    return null;
  }
}

/**
 * Similarity of two names in [0,1]. Dice coefficient over distinctive tokens
 * (order-independent, robust to extra words), lifted to 0.7 when one normalized
 * name fully contains the other (e.g. "Zenith" vs "Zenith AI Ventures").
 */
export function nameSimilarity(a: string, b: string): number {
  const A = tokenSet(a);
  const B = tokenSet(b);
  if (A.size === 0 || B.size === 0) return 0;
  let inter = 0;
  for (const t of A) if (B.has(t)) inter++;
  const dice = (2 * inter) / (A.size + B.size);

  const na = normalizeName(a);
  const nb = normalizeName(b);
  const contain =
    na.length >= 3 && nb.length >= 3 && (na.includes(nb) || nb.includes(na)) ? 0.7 : 0;

  return Math.max(dice, contain);
}

const DUPLICATE_THRESHOLD = 0.4;

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

/**
 * Top 1-3 existing directory entries the suggestion might duplicate. Matches an
 * actor on its name OR any `aka` alias, and boosts to a near-certain score when
 * the website host matches. Events match on name only (no website in the model).
 */
export function computeDuplicates(
  name: string,
  website: string | undefined,
  actors: Actor[],
  events: Event[],
): DuplicateMatch[] {
  const trimmed = name.trim();
  if (!trimmed) return [];
  const host = website ? hostOf(website) : null;
  const out: DuplicateMatch[] = [];

  for (const a of actors) {
    let score = nameSimilarity(trimmed, a.name);
    for (const alias of a.aka ?? []) score = Math.max(score, nameSimilarity(trimmed, alias));
    if (host && a.website && hostOf(a.website) === host) score = Math.max(score, 0.95);
    if (score >= DUPLICATE_THRESHOLD) {
      out.push({ kind: "actor", slug: a.slug, name: a.name, score: round2(score), href: `/o/${a.slug}` });
    }
  }

  for (const e of events) {
    const score = nameSimilarity(trimmed, e.name);
    if (score >= DUPLICATE_THRESHOLD) {
      out.push({ kind: "event", slug: e.slug, name: e.name, score: round2(score), href: `/e/${e.slug}` });
    }
  }

  return out.sort((x, y) => y.score - x.score).slice(0, 3);
}
