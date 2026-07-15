import * as React from "react";
import { Info, ShieldCheck } from "lucide-react";
import type { Aggregate } from "@/lib/types";
import { brand } from "@/lib/brand";
import { StarRating } from "./star-rating";
import { scoreTone, scoreBandLabel, type ScoreTone } from "./rating-score";
import { Badge } from "./ui/badge";
import { cn } from "./ui/cn";

const TONE_TEXT: Record<ScoreTone, string> = {
  good: "text-success",
  mixed: "text-warning",
  poor: "text-danger",
};
const TONE_FILL: Record<ScoreTone, string> = {
  good: "bg-success",
  mixed: "bg-warning",
  poor: "bg-danger",
};
const TONE_BADGE: Record<ScoreTone, "success" | "warning" | "danger"> = {
  good: "success",
  mixed: "warning",
  poor: "danger",
};

export interface AggregateBarProps {
  aggregate: Aggregate;
  /** Heading for the block, e.g. an actor or event name. */
  title?: string;
  subtitle?: string;
  className?: string;
}

function pct(n: number, of: number): number {
  if (of <= 0) return 0;
  return Math.max(0, Math.min(1, n / of)) * 100;
}

/** A labelled 0–5 track used for per-dimension averages. */
function DimensionRow({
  label,
  avg,
  count,
}: {
  label: string;
  avg: number | null;
  count: number;
}) {
  const tone = scoreTone(avg);
  const fill = tone ? TONE_FILL[tone] : "bg-border-strong";
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-baseline justify-between gap-3">
        <span className="text-sm font-medium text-foreground">{label}</span>
        <span className="shrink-0 text-sm tabular-nums text-muted">
          {avg === null ? (
            <span className="text-faint">No ratings yet</span>
          ) : (
            <>
              <span
                className={cn(
                  "font-semibold",
                  tone ? TONE_TEXT[tone] : "text-foreground",
                )}
              >
                {avg.toFixed(1)}
              </span>
              <span className="text-faint"> · {count}</span>
            </>
          )}
        </span>
      </div>
      <div
        className="h-2 w-full overflow-hidden rounded-full bg-surface-muted"
        role="img"
        aria-label={
          avg === null
            ? `${label}: no ratings yet`
            : `${label}: ${avg.toFixed(1)} out of 5 from ${count} reviewers`
        }
      >
        <div
          className={cn("h-full rounded-full transition-[width]", fill)}
          style={{ width: `${avg === null ? 0 : (avg / 5) * 100}%` }}
        />
      </div>
    </div>
  );
}

/**
 * The heart of HackHonest: renders an Aggregate as a neutral COUNT of what
 * verified reviewers reported — an average, per-dimension bars, and plain
 * "N of M reviewers reported X" signal lines. It never states a verdict of
 * its own; the closing line makes that posture explicit.
 */
export function AggregateBar({
  aggregate,
  title = "Community record",
  subtitle,
  className,
}: AggregateBarProps) {
  const { count, verifiedCount, avgOverall, dimensionAverages, signals } =
    aggregate;
  const hasReviews = count > 0;
  const overallTone = scoreTone(avgOverall);
  const band = scoreBandLabel(avgOverall);

  return (
    <section
      className={cn(
        "rounded-xl border border-border bg-surface shadow-sm",
        className,
      )}
      aria-label={`${title}: community record`}
    >
      <div className="flex flex-col gap-6 p-5 sm:p-6">
        {/* Header */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <ShieldCheck aria-hidden="true" className="size-4 text-accent" />
            <h3 className="text-sm font-semibold uppercase tracking-wide text-muted">
              {title}
            </h3>
          </div>
          {subtitle && <p className="text-sm text-muted">{subtitle}</p>}
        </div>

        {/* Overall average */}
        {hasReviews && avgOverall !== null ? (
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <div className="flex items-center gap-4">
              <div
                className={cn(
                  "text-6xl font-bold leading-none tracking-tight tabular-nums",
                  overallTone ? TONE_TEXT[overallTone] : "text-foreground",
                )}
              >
                {avgOverall.toFixed(1)}
              </div>
              <div className="flex flex-col gap-1.5">
                <StarRating value={avgOverall} size="md" />
                <p className="text-sm text-muted">
                  Based on{" "}
                  <span className="font-semibold text-foreground">{count}</span>{" "}
                  {count === 1 ? "review" : "reviews"} ·{" "}
                  <span className="font-semibold text-foreground">
                    {verifiedCount}
                  </span>{" "}
                  verified
                </p>
              </div>
            </div>
            {band && overallTone && (
              <Badge tone={TONE_BADGE[overallTone]} size="md" className="font-semibold">
                {band}
              </Badge>
            )}
          </div>
        ) : (
          <p className="text-sm text-muted">
            No reviews yet. Be the first verified attendee to share what
            happened.
          </p>
        )}

        {/* Per-dimension averages */}
        {hasReviews && dimensionAverages.length > 0 && (
          <div className="grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
            {dimensionAverages.map((d) => (
              <DimensionRow
                key={d.key}
                label={d.label}
                avg={d.avg}
                count={d.count}
              />
            ))}
          </div>
        )}

        {/* Neutral signal lines */}
        {signals.length > 0 && (
          <div className="flex flex-col gap-3 border-t border-border pt-5">
            <h4 className="text-sm font-semibold text-foreground">
              What verified reviewers reported
            </h4>
            <ul className="flex flex-col gap-3">
              {signals.map((s, i) => (
                <li key={i} className="flex flex-col gap-1.5">
                  <p className="text-sm text-foreground">
                    <span className="font-semibold tabular-nums">
                      {s.n} of {s.of}
                    </span>{" "}
                    verified reviewers reported{" "}
                    <span className="font-medium">{s.label}</span>
                  </p>
                  <div
                    className="h-1.5 w-full overflow-hidden rounded-full bg-surface-muted"
                    aria-hidden="true"
                  >
                    <div
                      className="h-full rounded-full bg-warning"
                      style={{ width: `${pct(s.n, s.of)}%` }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Neutral-host posture — explicit, so counts are never mistaken for verdicts */}
        <p className="flex items-start gap-2 rounded-lg bg-surface-muted px-3 py-2.5 text-xs leading-relaxed text-muted">
          <Info aria-hidden="true" className="mt-0.5 size-3.5 shrink-0" />
          <span>
            These are counts of what verified attendees reported — not ratings
            issued by {brand.name}.
          </span>
        </p>
      </div>
    </section>
  );
}
