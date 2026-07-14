import * as React from "react";
import {
  Star,
  User,
  Mail,
  Link2,
  ImageIcon,
  CornerDownRight,
} from "lucide-react";
import type { Review, Evidence } from "@/lib/types";
import { StarRating } from "./star-rating";
import { VerifiedBadge } from "./verified-badge";
import { Badge } from "./ui/badge";
import { cn } from "./ui/cn";

/** Deterministic date formatting (safe across server/client render). */
function formatDate(raw: string): string {
  const d = new Date(raw);
  if (Number.isNaN(d.getTime())) return raw;
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  }).format(d);
}

const EVIDENCE_ICON: Record<Evidence["kind"], React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>> = {
  screenshot: ImageIcon,
  email: Mail,
  link: Link2,
};

const EVIDENCE_KIND_LABEL: Record<Evidence["kind"], string> = {
  screenshot: "Screenshot",
  email: "Email",
  link: "Link",
};

export interface ReviewCardProps {
  review: Review;
  className?: string;
}

/**
 * Renders a single verified, first-person review: overall stars, the reviewer's
 * per-dimension scores, headline + body, any evidence they attached, a
 * pseudonymous byline, and the organizer's right-of-reply if they responded.
 */
export function ReviewCard({ review, className }: ReviewCardProps) {
  const {
    overall,
    dimensions,
    headline,
    body,
    verified,
    verifyMethod,
    author,
    date,
    evidence,
    reply,
  } = review;

  return (
    <article
      className={cn(
        "rounded-xl border border-border bg-surface shadow-sm",
        className,
      )}
    >
      <div className="flex flex-col gap-4 p-5 sm:p-6">
        {/* Top row: overall rating + verification, date */}
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <StarRating value={overall} size="sm" showValue />
            {verified && <VerifiedBadge method={verifyMethod} showMethod />}
          </div>
          <time
            dateTime={date}
            className="text-sm text-faint"
          >
            {formatDate(date)}
          </time>
        </div>

        {/* Headline + body */}
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-semibold leading-snug tracking-tight text-foreground">
            {headline}
          </h3>
          <p className="whitespace-pre-line text-[0.95rem] leading-relaxed text-muted">
            {body}
          </p>
        </div>

        {/* Per-dimension scores */}
        {dimensions.length > 0 && (
          <ul className="flex flex-wrap gap-2">
            {dimensions.map((d) => (
              <li key={d.key}>
                <Badge tone="neutral" size="sm">
                  <Star
                    aria-hidden="true"
                    className="fill-rating text-rating"
                  />
                  <span>{d.label}</span>
                  <span className="font-semibold tabular-nums text-foreground">
                    {d.rating}/5
                  </span>
                </Badge>
              </li>
            ))}
          </ul>
        )}

        {/* Evidence */}
        {evidence && evidence.length > 0 && (
          <div className="flex flex-col gap-2">
            <span className="text-xs font-semibold uppercase tracking-wide text-faint">
              Evidence provided
            </span>
            <ul className="flex flex-wrap gap-2">
              {evidence.map((e, i) => {
                const Icon = EVIDENCE_ICON[e.kind];
                return (
                  <li key={i}>
                    <Badge
                      tone="outline"
                      size="sm"
                      title={e.note ?? `${EVIDENCE_KIND_LABEL[e.kind]} evidence`}
                    >
                      <Icon aria-hidden={true} />
                      <span>{e.label}</span>
                    </Badge>
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        {/* Byline */}
        <div className="flex items-center gap-2 border-t border-border pt-4 text-sm text-muted">
          <User aria-hidden="true" className="size-4 text-faint" />
          <span className="font-medium text-foreground">{author}</span>
          <span className="text-faint">· pseudonymous, identity kept private</span>
        </div>

        {/* Organizer right-of-reply */}
        {reply && (
          <div className="rounded-lg border-l-2 border-accent bg-accent-subtle px-4 py-3">
            <div className="mb-1 flex flex-wrap items-center gap-2">
              <CornerDownRight
                aria-hidden="true"
                className="size-4 text-accent-strong"
              />
              <span className="text-sm font-semibold text-accent-strong">
                Response from {reply.author}
              </span>
              <Badge tone="accent" size="sm">
                Organizer reply
              </Badge>
              <time
                dateTime={reply.date}
                className="ml-auto text-xs text-muted"
              >
                {formatDate(reply.date)}
              </time>
            </div>
            <p className="whitespace-pre-line text-sm leading-relaxed text-foreground">
              {reply.body}
            </p>
          </div>
        )}
      </div>
    </article>
  );
}
