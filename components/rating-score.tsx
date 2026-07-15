import * as React from "react";
import { StarRating, type StarSize } from "./star-rating";
import { cn } from "./ui/cn";

/**
 * The rating language, in one place. The average is the reviewers' aggregate —
 * a COUNT of what verified attendees reported, not a HackHonest verdict — so we
 * only ever color-code it for legibility (the Trustpilot/Glassdoor convention),
 * exactly like a temperature reading. Stars stay gold; the NUMBER carries the
 * band color so a good / caution / bad record reads in a single glance.
 */
export type ScoreTone = "good" | "mixed" | "poor";

export function scoreTone(avg: number | null): ScoreTone | null {
  if (avg === null) return null;
  if (avg >= 4.0) return "good";
  if (avg >= 2.5) return "mixed";
  return "poor";
}

/** Neutral, describes the REVIEWS (not the organizer's character). */
export function scoreBandLabel(avg: number | null): string | null {
  const tone = scoreTone(avg);
  if (tone === "good") return "Well reviewed";
  if (tone === "mixed") return "Mixed reviews";
  if (tone === "poor") return "Poorly reviewed";
  return null;
}

const TONE_TEXT: Record<ScoreTone, string> = {
  good: "text-success",
  mixed: "text-warning",
  poor: "text-danger",
};

type ScoreSize = "sm" | "md" | "lg";

const NUM_TEXT: Record<ScoreSize, string> = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-xl",
};
const STAR_SIZE: Record<ScoreSize, StarSize> = { sm: "sm", md: "sm", lg: "md" };
const COUNT_TEXT: Record<ScoreSize, string> = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-sm",
};

export interface RatingScoreProps {
  avg: number | null;
  count: number;
  size?: ScoreSize;
  /** Show "· N reviews" after the stars. Default true. */
  showCount?: boolean;
  className?: string;
}

/**
 * Compact rating readout used on cards: [colored average] [gold stars] · N reviews.
 * Renders a calm "No reviews yet" when there is nothing to aggregate.
 */
export function RatingScore({
  avg,
  count,
  size = "md",
  showCount = true,
  className,
}: RatingScoreProps) {
  const tone = scoreTone(avg);

  if (avg === null || tone === null) {
    return (
      <span className={cn("text-sm font-medium text-faint", className)}>
        No reviews yet
      </span>
    );
  }

  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <span
        className={cn(
          "font-bold tabular-nums leading-none",
          NUM_TEXT[size],
          TONE_TEXT[tone],
        )}
      >
        {avg.toFixed(1)}
      </span>
      <StarRating value={avg} size={STAR_SIZE[size]} />
      {showCount && (
        <span className={cn("text-faint tabular-nums", COUNT_TEXT[size])}>
          · {count} {count === 1 ? "review" : "reviews"}
        </span>
      )}
    </span>
  );
}
