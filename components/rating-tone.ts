// Pure rating-band logic — no JSX, no "use client", no i18n. Safe to import from
// both server components (home page, metadata) and client components (rating-score,
// aggregate-bar). The band LABEL text lives in the i18n dictionaries under
// `ratingBand[tone]`; this module only decides the tone from an average.

export type ScoreTone = "good" | "mixed" | "poor";

/**
 * The average is the reviewers' aggregate — a COUNT of what verified attendees
 * reported, not a HackHonest verdict — so tone is only ever used for legibility
 * (the Trustpilot/Glassdoor convention), like a temperature reading.
 */
export function scoreTone(avg: number | null): ScoreTone | null {
  if (avg === null) return null;
  if (avg >= 4.0) return "good";
  if (avg >= 2.5) return "mixed";
  return "poor";
}
