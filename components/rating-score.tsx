"use client";

import * as React from "react";
import { StarRating, type StarSize } from "./star-rating";
import { scoreTone, type ScoreTone } from "./rating-tone";
import { useT } from "@/lib/i18n/locale-provider";
import { cn } from "./ui/cn";

// Re-exported so existing imports of the tone helpers from this module keep working.
export { scoreTone, type ScoreTone } from "./rating-tone";

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
  const t = useT();
  const tone = scoreTone(avg);

  if (avg === null || tone === null) {
    return (
      <span className={cn("text-sm font-medium text-faint", className)}>
        {t.common.noReviewsYet}
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
          · {t.common.reviewCount(count)}
        </span>
      )}
    </span>
  );
}
