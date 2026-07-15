import * as React from "react";
import Link from "next/link";
import { MapPin, Globe, History } from "lucide-react";
import type { Actor, ActorKind, Aggregate } from "@/lib/types";
import { RatingScore } from "./rating-score";
import { Badge, type BadgeTone } from "./ui/badge";
import { cn } from "./ui/cn";

const KIND_META: Record<ActorKind, { label: string; tone: BadgeTone }> = {
  organizer: { label: "Organizer", tone: "accent" },
  company: { label: "Company", tone: "neutral" },
  sponsor: { label: "Sponsor", tone: "neutral" },
};

export interface ActorCardProps {
  actor: Actor;
  /** Optional community record shown compactly on the card. */
  aggregate?: Aggregate;
  /** Link target; defaults to the actor detail route. */
  href?: string;
  className?: string;
}

/**
 * Directory card for an Actor (organizer / company / sponsor). Reputation lives
 * on the actor, so aliases (`aka`) are surfaced as a neutral "same operator?"
 * signal — shown, never asserted.
 */
export function ActorCard({ actor, aggregate, href, className }: ActorCardProps) {
  const { slug, name, kinds, aka, website, location, blurb, claimed } = actor;
  const target = href ?? `/o/${slug}`;
  const websiteHost = website
    ? website.replace(/^https?:\/\//, "").replace(/\/$/, "")
    : null;

  return (
    <Link
      href={target}
      className={cn(
        "group block rounded-2xl border border-border bg-surface shadow-sm transition duration-200",
        "hover:-translate-y-0.5 hover:border-border-strong hover:shadow-md",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className,
      )}
    >
      <div className="flex flex-col gap-3 p-5">
        {/* Name + claimed */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex flex-col gap-1">
            <h3 className="text-lg font-semibold leading-snug tracking-tight text-foreground transition-colors group-hover:text-accent-strong">
              {name}
            </h3>
            {location && (
              <span className="inline-flex items-center gap-1.5 text-sm text-muted">
                <MapPin aria-hidden="true" className="size-3.5 text-faint" />
                {location}
              </span>
            )}
          </div>
          {claimed && (
            <Badge tone="success" size="sm" className="shrink-0">
              Claimed
            </Badge>
          )}
        </div>

        {/* Kind badges */}
        {kinds.length > 0 && (
          <ul className="flex flex-wrap gap-1.5">
            {kinds.map((k) => (
              <li key={k}>
                <Badge tone={KIND_META[k].tone} size="sm">
                  {KIND_META[k].label}
                </Badge>
              </li>
            ))}
          </ul>
        )}

        {/* Compact community record — the rating reads at a glance */}
        {aggregate && aggregate.avgOverall !== null && (
          <RatingScore
            avg={aggregate.avgOverall}
            count={aggregate.count}
            size="md"
          />
        )}

        {/* Blurb */}
        <p className="line-clamp-2 text-sm leading-relaxed text-muted">
          {blurb}
        </p>

        {/* Aliases — the neutral "same operator?" signal */}
        {aka && aka.length > 0 && (
          <p className="inline-flex items-start gap-1.5 text-xs leading-relaxed text-faint">
            <History aria-hidden="true" className="mt-0.5 size-3.5 shrink-0" />
            <span>Also known as {aka.join(", ")}</span>
          </p>
        )}

        {/* Website (plain text — the whole card is the link) */}
        {websiteHost && (
          <span className="inline-flex items-center gap-1.5 text-xs text-faint">
            <Globe aria-hidden="true" className="size-3.5" />
            {websiteHost}
          </span>
        )}
      </div>
    </Link>
  );
}
