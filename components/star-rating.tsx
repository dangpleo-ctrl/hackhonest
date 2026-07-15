"use client";

import * as React from "react";
import { Star } from "lucide-react";
import { useT } from "@/lib/i18n/locale-provider";
import { cn } from "./ui/cn";

export type StarSize = "sm" | "md" | "lg";

export interface StarRatingProps {
  /** Current rating. May be fractional in display mode (e.g. 4.3). */
  value: number;
  /** Provide to make the control interactive (whole-star selection). */
  onChange?: (value: number) => void;
  max?: number;
  size?: StarSize;
  /** Force read-only even if onChange is supplied. */
  readOnly?: boolean;
  /** Accessible name. Defaults to a sensible "N out of M stars". */
  label?: string;
  /** Show the numeric value beside the stars (display mode). */
  showValue?: boolean;
  className?: string;
}

const STAR_PX: Record<StarSize, number> = { sm: 16, md: 20, lg: 24 };
const GAP_PX: Record<StarSize, number> = { sm: 2, md: 4, lg: 4 };
const GAP_CLASS: Record<StarSize, string> = {
  sm: "gap-0.5",
  md: "gap-1",
  lg: "gap-1",
};
const VALUE_TEXT: Record<StarSize, string> = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
};

function clamp(n: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, n));
}

export function StarRating({
  value,
  onChange,
  max = 5,
  size = "md",
  readOnly,
  label,
  showValue = false,
  className,
}: StarRatingProps) {
  const t = useT();
  const interactive = !!onChange && !readOnly;
  const px = STAR_PX[size];
  const gapPx = GAP_PX[size];
  const fullWidth = max * px + (max - 1) * gapPx;
  const stars = Array.from({ length: max }, (_, i) => i + 1);

  const [hover, setHover] = React.useState(0);
  const shown = interactive && hover > 0 ? hover : value;

  if (interactive && onChange) {
    const current = clamp(Math.round(value), 0, max);
    const handleKey = (e: React.KeyboardEvent, i: number) => {
      let next = i;
      if (e.key === "ArrowRight" || e.key === "ArrowUp") next = clamp(i + 1, 1, max);
      else if (e.key === "ArrowLeft" || e.key === "ArrowDown")
        next = clamp(i - 1, 1, max);
      else if (e.key === "Home") next = 1;
      else if (e.key === "End") next = max;
      else return;
      e.preventDefault();
      onChange(next);
    };
    return (
      <div
        role="radiogroup"
        aria-label={label ?? t.starRating.ratingWithMax(max)}
        className={cn("inline-flex items-center", GAP_CLASS[size], className)}
        onMouseLeave={() => setHover(0)}
      >
        {stars.map((i) => {
          const filled = i <= shown;
          return (
            <button
              key={i}
              type="button"
              role="radio"
              aria-checked={i === current}
              aria-label={t.starRating.starOfMax(i, max)}
              tabIndex={i === current || (current === 0 && i === 1) ? 0 : -1}
              onClick={() => onChange(i)}
              onMouseEnter={() => setHover(i)}
              onKeyDown={(e) => handleKey(e, i)}
              className="rounded-sm p-0.5 text-rating transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
            >
              <Star
                style={{ width: px, height: px }}
                strokeWidth={1.75}
                className={cn(
                  filled ? "fill-rating text-rating" : "fill-none text-rating-track",
                )}
              />
            </button>
          );
        })}
      </div>
    );
  }

  // Display mode: fractional fill via a clipped overlay row.
  const pct = clamp(value / max, 0, 1) * 100;
  const roundedLabel = Math.round(value * 10) / 10;
  return (
    <span
      className={cn("inline-flex items-center gap-2", className)}
    >
      <span
        role="img"
        aria-label={label ?? t.starRating.valueOutOfMax(String(roundedLabel), max)}
        className="relative inline-flex shrink-0"
        style={{ width: fullWidth, height: px }}
      >
        <span className={cn("inline-flex", GAP_CLASS[size])} aria-hidden="true">
          {stars.map((i) => (
            <Star
              key={i}
              style={{ width: px, height: px }}
              strokeWidth={1.75}
              className="fill-none text-rating-track"
            />
          ))}
        </span>
        <span
          className="absolute inset-y-0 left-0 overflow-hidden"
          style={{ width: `${pct}%` }}
          aria-hidden="true"
        >
          <span
            className={cn("inline-flex", GAP_CLASS[size])}
            style={{ width: fullWidth }}
          >
            {stars.map((i) => (
              <Star
                key={i}
                style={{ width: px, height: px }}
                strokeWidth={1.75}
                className="fill-rating text-rating"
              />
            ))}
          </span>
        </span>
      </span>
      {showValue && (
        <span
          className={cn("font-semibold text-foreground tabular-nums", VALUE_TEXT[size])}
        >
          {roundedLabel.toFixed(1)}
        </span>
      )}
    </span>
  );
}
