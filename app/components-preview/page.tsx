"use client";

import * as React from "react";
import {
  PenLine,
  ExternalLink,
  Search,
  Calendar,
  MapPin,
  Trophy,
} from "lucide-react";
import type {
  Actor,
  Event,
  Review,
  Aggregate,
  ReviewDimension,
  PerkStatus,
} from "@/lib/types";
import { REVIEW_DIMENSIONS } from "@/lib/types";
import { brand } from "@/lib/brand";

import { Button } from "@/components/ui/button";
import { Badge, type BadgeTone } from "@/components/ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { StarRating } from "@/components/star-rating";
import { VerifiedBadge } from "@/components/verified-badge";
import { AggregateBar } from "@/components/aggregate-bar";
import { ReviewCard } from "@/components/review-card";
import { ActorCard } from "@/components/actor-card";

/* --------------------------------------------------------------------------
   Sample data — realistic, neutral, and typed against lib/types.ts.
   -------------------------------------------------------------------------- */

function makeDims(ratings: Record<string, number>): ReviewDimension[] {
  return REVIEW_DIMENSIONS.filter((d) => d.key in ratings).map((d) => ({
    key: d.key,
    label: d.label,
    rating: ratings[d.key],
  }));
}

const organizer: Actor = {
  slug: "saigon-hack-collective",
  name: "Saigon Hack Collective",
  kinds: ["organizer", "sponsor"],
  aka: ["SGN Devfest Group", "HCMC Builders"],
  website: "https://saigonhack.example",
  location: "Ho Chi Minh City, Vietnam",
  blurb:
    "Runs weekend AI hackathons across HCMC and Hanoi. Advertises large sponsor prize pools and enterprise problem tracks.",
  claimed: true,
};

const sponsor: Actor = {
  slug: "vinacloud",
  name: "VinaCloud",
  kinds: ["company", "sponsor"],
  website: "https://vinacloud.example",
  location: "Da Nang, Vietnam",
  blurb:
    "Regional cloud provider that sponsors credit-based prizes at student hackathons across Southeast Asia.",
  claimed: false,
};

const organizer2: Actor = {
  slug: "mekong-buildathon",
  name: "Mekong Buildathon",
  kinds: ["organizer"],
  location: "Can Tho, Vietnam",
  blurb:
    "University-run buildathon focused on agri-tech and climate solutions in the Mekong Delta.",
  claimed: false,
};

const event: Event = {
  slug: "saigon-ai-hack-2026",
  name: "Saigon AI Hack 2026",
  organizerSlug: "saigon-hack-collective",
  sponsorSlugs: ["vinacloud"],
  dates: "March 14–16, 2026",
  location: "Ho Chi Minh City, Vietnam",
  blurb:
    "48-hour AI hackathon advertising a $1M+ prize-and-perks pool across six enterprise tracks.",
  format: "In-person · 48 hours",
  claims: [
    {
      label: "Advertised prize pool",
      value: "$1M+ perks & credits",
      note: "As stated on the event landing page.",
    },
    {
      label: "Registered participants",
      value: "1,200+",
      note: "Organizer figure; not independently verified.",
    },
  ],
  tracks: [
    { name: "Enterprise AI", sponsor: "VinaCloud", problemCount: 3 },
    { name: "Fintech", problemCount: 2 },
  ],
  perks: [
    { provider: "VinaCloud", promised: "$150 cloud credits", status: "delivered" },
    {
      provider: "OpenAI",
      promised: "$150 credits + 3-mo ChatGPT Plus",
      status: "third_party_program",
      note: "Reviewers report this was the public free tier, not an event grant.",
    },
    { provider: "Notion", promised: "6-mo Plus plan", status: "not_received" },
    { provider: "AWS", promised: "$300 activate credits", status: "out_of_stock" },
  ],
  winners: [
    {
      track: "Enterprise AI",
      team: "Team Nhện",
      project: "SupplySight",
      placement: "Winner",
      sponsor: "VinaCloud",
    },
  ],
  facts: [
    {
      label: "Prize payout timeline",
      fact: "Grand-prize transfer completed 61 days after the event.",
      source: "Winner-provided bank record",
    },
  ],
};

const reviews: Review[] = [
  {
    id: "r1",
    actorSlug: organizer.slug,
    eventSlug: event.slug,
    overall: 2,
    dimensions: makeDims({
      prizes: 2,
      perks: 1,
      judging: 3,
      organization: 4,
      honesty: 2,
      respect: 3,
    }),
    headline: "Great venue, but the advertised perks mostly weren't real",
    body: "I flew in from Hanoi for this. The space and schedule were genuinely well run, and the mentors on-site were helpful.\n\nThe problem was the perks. The \"$1M pool\" turned out to be mostly public free tiers you could sign up for on your own. One credit advertised as exclusive was just the standard free plan. I'm reporting what I personally received, with the confirmation email attached.",
    verified: true,
    verifyMethod: "email-dkim",
    author: "delta_builder",
    date: "2026-03-20",
    evidence: [
      {
        label: "Perk email",
        kind: "email",
        note: "Confirmation email listing the advertised credits.",
      },
      { label: "Sponsor page screenshot", kind: "screenshot" },
      {
        label: "Public program link",
        kind: "link",
        note: "The 'exclusive' credit was the standard free tier.",
      },
    ],
    reply: {
      author: "Saigon Hack Collective",
      body: "Thanks for the detailed feedback. Two sponsors changed their offers the week of the event and we should have updated the page faster. We've since published a perks-status tracker for all future events.",
      date: "2026-03-24",
    },
  },
  {
    id: "r2",
    actorSlug: organizer.slug,
    eventSlug: event.slug,
    overall: 4,
    dimensions: makeDims({ prizes: 5, judging: 4, organization: 4, honesty: 4 }),
    headline: "Prize actually paid — 8 weeks late, but paid in full",
    body: "We won the Enterprise AI track. Payout took about two months and I had to follow up twice, but the full amount landed exactly as advertised. Judging criteria were shared in advance and the results were explained. Docking a star for the wait and the silence in between.",
    verified: true,
    verifyMethod: "founder-attested",
    author: "nhen_team_lead",
    date: "2026-05-18",
    evidence: [
      {
        label: "Payout record",
        kind: "screenshot",
        note: "Bank transfer confirmation.",
      },
    ],
  },
  {
    id: "r3",
    actorSlug: organizer.slug,
    eventSlug: event.slug,
    overall: 3,
    dimensions: makeDims({ organization: 3, respect: 3, honesty: 3 }),
    headline: "Solid mid-size event, nothing egregious",
    body: "First hackathon I attended from this group. Comms were a bit chaotic on day one but they fixed it by the afternoon. Judging felt fair. I'd go again if the prize terms were spelled out more clearly up front.",
    verified: false,
    author: "quiet_intern",
    date: "2026-06-02",
  },
];

const aggregate: Aggregate = {
  count: 23,
  verifiedCount: 18,
  avgOverall: 3.1,
  dimensionAverages: [
    { key: "prizes", label: "Prizes delivered as promised", avg: 3.4, count: 16 },
    { key: "perks", label: "Perks & credits were real", avg: 2.2, count: 17 },
    {
      key: "judging",
      label: "Judging was fair & transparent",
      avg: 3.8,
      count: 15,
    },
    { key: "organization", label: "Well organized", avg: 4.1, count: 20 },
    { key: "honesty", label: "Honest marketing", avg: 2.6, count: 19 },
    {
      key: "respect",
      label: "Respected participants' work",
      avg: null,
      count: 0,
    },
  ],
  signals: [
    { label: "perks not delivered as advertised", n: 11, of: 17 },
    { label: "prizes paid late (more than 30 days)", n: 6, of: 16 },
    { label: "a perk was a reskinned public program", n: 8, of: 17 },
  ],
};

const emptyAggregate: Aggregate = {
  count: 0,
  verifiedCount: 0,
  avgOverall: null,
  dimensionAverages: [],
  signals: [],
};

const PERK_STATUS_META: Record<PerkStatus, { label: string; tone: BadgeTone }> =
  {
    delivered: { label: "Delivered", tone: "success" },
    not_received: { label: "Not received", tone: "danger" },
    third_party_program: {
      label: "Reskinned public program",
      tone: "warning",
    },
    out_of_stock: { label: "Out of stock", tone: "warning" },
    unknown: { label: "Unknown", tone: "neutral" },
  };

/* --------------------------------------------------------------------------
   Preview scaffolding
   -------------------------------------------------------------------------- */

function Section({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-5 scroll-mt-20" id={title.toLowerCase().replace(/\s+/g, "-")}>
      <div className="flex flex-col gap-1 border-b border-border pb-3">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          {title}
        </h2>
        {description && <p className="text-sm text-muted">{description}</p>}
      </div>
      {children}
    </section>
  );
}

const COLOR_TOKENS: { name: string; className: string; hex: string }[] = [
  { name: "background", className: "bg-background", hex: "#f8fafc" },
  { name: "surface", className: "bg-surface", hex: "#ffffff" },
  { name: "surface-muted", className: "bg-surface-muted", hex: "#f1f5f9" },
  { name: "border", className: "bg-border", hex: "#e2e8f0" },
  { name: "border-strong", className: "bg-border-strong", hex: "#cbd5e1" },
  { name: "foreground", className: "bg-foreground", hex: "#0f172a" },
  { name: "muted", className: "bg-muted", hex: "#475569" },
  { name: "faint", className: "bg-faint", hex: "#64748b" },
  { name: "accent", className: "bg-accent", hex: "#1d4ed8" },
  { name: "accent-strong", className: "bg-accent-strong", hex: "#1e40af" },
  { name: "accent-subtle", className: "bg-accent-subtle", hex: "#eff6ff" },
  { name: "accent-border", className: "bg-accent-border", hex: "#bfdbfe" },
  { name: "success", className: "bg-success", hex: "#15803d" },
  { name: "warning", className: "bg-warning", hex: "#b45309" },
  { name: "danger", className: "bg-danger", hex: "#b91c1c" },
  { name: "rating", className: "bg-rating", hex: "#f59e0b" },
];

const BADGE_TONES: BadgeTone[] = [
  "neutral",
  "accent",
  "success",
  "warning",
  "danger",
  "outline",
];

export default function ComponentsPreviewPage() {
  const [interactiveRating, setInteractiveRating] = React.useState(4);
  const [dimensionRating, setDimensionRating] = React.useState(0);

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      {/* Page header */}
      <header className="mb-12 flex flex-col gap-2">
        <Badge tone="accent" size="md" className="w-fit">
          Component library
        </Badge>
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {brand.name} design system
        </h1>
        <p className="max-w-2xl text-base leading-relaxed text-muted">
          Every reusable component rendered with realistic sample data. Light
          and dark themes, Be Vietnam Pro, AAA body contrast, one blue accent,
          restrained rating colors.
        </p>
      </header>

      <div className="flex flex-col gap-16">
        {/* Colors */}
        <Section
          title="Color tokens"
          description="Semantic tokens defined in app/globals.css. Components reference names, never hex."
        >
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {COLOR_TOKENS.map((t) => (
              <div key={t.name} className="flex items-center gap-3">
                <div
                  className={`size-11 shrink-0 rounded-lg border border-border ${t.className}`}
                />
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-foreground">
                    {t.name}
                  </span>
                  <span className="text-xs tabular-nums text-faint">
                    {t.hex}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Typography */}
        <Section
          title="Typography"
          description="Be Vietnam Pro across the scale. Weights 400 / 500 / 600 / 700."
        >
          <div className="flex flex-col gap-3">
            <p className="text-5xl font-bold tracking-tight text-foreground">
              Trust, verified.
            </p>
            <p className="text-3xl font-semibold tracking-tight text-foreground">
              The community record of hackathon organizers
            </p>
            <p className="text-xl font-medium text-foreground">
              Chào mừng — tiếng Việt hiển thị đầy đủ dấu.
            </p>
            <p className="text-base leading-relaxed text-muted">
              Body copy at 16px in muted slate for AAA contrast. Generous
              line-height keeps long reviews readable for people of all ages.
            </p>
            <p className="text-sm text-faint">
              Small print and metadata sit in the faint tone.
            </p>
          </div>
        </Section>

        {/* Buttons */}
        <Section
          title="Buttons"
          description="Variants, sizes, disabled, and icon usage."
        >
          <div className="flex flex-col gap-6">
            <div className="flex flex-wrap items-center gap-3">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="danger">Danger</Button>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
              <Button disabled>Disabled</Button>
              <Button variant="primary">
                <PenLine aria-hidden="true" />
                Write a review
              </Button>
              <Button variant="outline">
                <ExternalLink aria-hidden="true" />
                Visit site
              </Button>
            </div>
          </div>
        </Section>

        {/* Badges */}
        <Section title="Badges" description="Calm status pills in six tones.">
          <div className="flex flex-wrap gap-2.5">
            {BADGE_TONES.map((tone) => (
              <Badge key={tone} tone={tone} size="md">
                {tone}
              </Badge>
            ))}
          </div>
        </Section>

        {/* Star rating */}
        <Section
          title="Star rating"
          description="Display supports fractional fill; interactive is a keyboard-accessible radiogroup."
        >
          <div className="flex flex-col gap-6">
            <div className="flex flex-wrap items-center gap-8">
              <StarRating value={5} size="sm" showValue />
              <StarRating value={4.3} size="md" showValue />
              <StarRating value={2.6} size="lg" showValue />
              <StarRating value={0} size="md" showValue />
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-sm font-medium text-foreground">
                Interactive (click, or focus + arrow keys) — current:{" "}
                <span className="tabular-nums text-accent-strong">
                  {interactiveRating}
                </span>
              </span>
              <StarRating
                value={interactiveRating}
                onChange={setInteractiveRating}
                size="lg"
                label="Overall rating"
              />
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-sm font-medium text-foreground">
                Empty until picked — current:{" "}
                <span className="tabular-nums text-accent-strong">
                  {dimensionRating || "none"}
                </span>
              </span>
              <StarRating
                value={dimensionRating}
                onChange={setDimensionRating}
                size="md"
                label="Judging fairness"
              />
            </div>
          </div>
        </Section>

        {/* Verified badge */}
        <Section
          title="Verified badge"
          description="Trust marker; the tooltip explains how the reviewer was verified."
        >
          <div className="flex flex-wrap gap-3">
            <VerifiedBadge />
            <VerifiedBadge method="email-dkim" showMethod />
            <VerifiedBadge method="github" showMethod />
            <VerifiedBadge method="evidence" showMethod />
            <VerifiedBadge method="founder-attested" showMethod />
          </div>
        </Section>

        {/* Form primitives */}
        <Section
          title="Form primitives"
          description="Input, Textarea, and Select — with an invalid state."
        >
          <div className="grid max-w-2xl grid-cols-1 gap-5 sm:grid-cols-2">
            <label className="flex flex-col gap-1.5">
              <span className="text-sm font-medium text-foreground">
                Search organizers
              </span>
              <div className="relative">
                <Search
                  aria-hidden="true"
                  className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-faint"
                />
                <Input placeholder="e.g. Saigon Hack Collective" className="pl-9" />
              </div>
            </label>
            <label className="flex flex-col gap-1.5">
              <span className="text-sm font-medium text-foreground">
                Which event?
              </span>
              <Select defaultValue="">
                <option value="" disabled>
                  Select an event
                </option>
                <option value="saigon-ai-hack-2026">Saigon AI Hack 2026</option>
                <option value="mekong-2026">Mekong Buildathon 2026</option>
              </Select>
            </label>
            <label className="flex flex-col gap-1.5 sm:col-span-2">
              <span className="text-sm font-medium text-foreground">
                Your review
              </span>
              <Textarea placeholder="What actually happened? Stick to what you personally experienced…" />
            </label>
            <label className="flex flex-col gap-1.5">
              <span className="text-sm font-medium text-danger">
                Email (invalid example)
              </span>
              <Input invalid defaultValue="not-an-email" />
              <span className="text-xs text-danger">
                Enter a valid email so we can verify attendance.
              </span>
            </label>
          </div>
        </Section>

        {/* Cards */}
        <Section
          title="Cards"
          description="Base surface plus composable header / content / footer."
        >
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Static card</CardTitle>
                <CardDescription>
                  A plain surface with a subtle 1px border and minimal shadow.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed text-muted">
                  Use for grouping related content. Whitespace and the hairline
                  border carry the hierarchy — shadows stay barely-there.
                </p>
              </CardContent>
              <CardFooter>
                <Button size="sm" variant="secondary">
                  Action
                </Button>
                <Button size="sm" variant="ghost">
                  Cancel
                </Button>
              </CardFooter>
            </Card>
            <Card interactive>
              <CardHeader>
                <CardTitle>Interactive card</CardTitle>
                <CardDescription>
                  Hover me — a gentle lift for cards that are themselves links.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed text-muted">
                  The border strengthens and the shadow deepens slightly on
                  hover and focus-within.
                </p>
              </CardContent>
            </Card>
          </div>
        </Section>

        {/* Actor cards */}
        <Section
          title="Actor cards"
          description="Directory cards. Reputation lives on the actor; aliases surface as a neutral signal."
        >
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <ActorCard actor={organizer} aggregate={aggregate} />
            <ActorCard actor={sponsor} />
            <ActorCard actor={organizer2} aggregate={emptyAggregate} />
          </div>
        </Section>

        {/* Aggregate bar */}
        <Section
          title="Aggregate bar"
          description="The core neutral-counts UI. An average, per-dimension bars, and plain 'N of M reported X' lines — never a platform verdict."
        >
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            <AggregateBar
              aggregate={aggregate}
              title={organizer.name}
              subtitle="Across all indexed events"
            />
            <AggregateBar
              aggregate={emptyAggregate}
              title={organizer2.name}
              subtitle="No reviews yet"
            />
          </div>
        </Section>

        {/* Event summary — exercises the Event type */}
        <Section
          title="Event summary"
          description="Composed from primitives to exercise the Event type (claims, perk ledger, winners, sourced facts)."
        >
          <Card>
            <CardHeader>
              <div className="flex flex-wrap items-center gap-2">
                <CardTitle>{event.name}</CardTitle>
                {event.format && (
                  <Badge tone="neutral" size="sm">
                    {event.format}
                  </Badge>
                )}
              </div>
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted">
                <span className="inline-flex items-center gap-1.5">
                  <Calendar aria-hidden="true" className="size-3.5 text-faint" />
                  {event.dates}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <MapPin aria-hidden="true" className="size-3.5 text-faint" />
                  {event.location}
                </span>
              </div>
              <CardDescription>{event.blurb}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-6">
              {event.claims && event.claims.length > 0 && (
                <div className="flex flex-col gap-2">
                  <h4 className="text-xs font-semibold uppercase tracking-wide text-faint">
                    Advertised claims
                  </h4>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {event.claims.map((c) => (
                      <div
                        key={c.label}
                        className="rounded-lg border border-border bg-surface-muted p-3"
                      >
                        <div className="text-xs text-muted">{c.label}</div>
                        <div className="text-base font-semibold text-foreground">
                          {c.value}
                        </div>
                        {c.note && (
                          <div className="mt-0.5 text-xs text-faint">
                            {c.note}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {event.perks && event.perks.length > 0 && (
                <div className="flex flex-col gap-2">
                  <h4 className="text-xs font-semibold uppercase tracking-wide text-faint">
                    Perk ledger — advertised vs. reported
                  </h4>
                  <ul className="flex flex-col divide-y divide-border overflow-hidden rounded-lg border border-border">
                    {event.perks.map((p, i) => (
                      <li
                        key={i}
                        className="flex flex-wrap items-center justify-between gap-2 bg-surface px-3 py-2.5"
                      >
                        <div className="flex flex-col">
                          <span className="text-sm font-medium text-foreground">
                            {p.provider}
                          </span>
                          <span className="text-xs text-muted">
                            {p.promised}
                          </span>
                        </div>
                        <Badge tone={PERK_STATUS_META[p.status].tone} size="sm">
                          {PERK_STATUS_META[p.status].label}
                        </Badge>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {event.winners && event.winners.length > 0 && (
                <div className="flex flex-col gap-2">
                  <h4 className="text-xs font-semibold uppercase tracking-wide text-faint">
                    Winners
                  </h4>
                  {event.winners.map((w, i) => (
                    <div
                      key={i}
                      className="inline-flex flex-wrap items-center gap-2 text-sm text-foreground"
                    >
                      <Trophy aria-hidden="true" className="size-4 text-rating" />
                      <span className="font-medium">{w.team}</span>
                      {w.project && (
                        <span className="text-muted">— {w.project}</span>
                      )}
                      <Badge tone="accent" size="sm">
                        {w.placement} · {w.track}
                      </Badge>
                    </div>
                  ))}
                </div>
              )}

              {event.facts && event.facts.length > 0 && (
                <div className="flex flex-col gap-2">
                  <h4 className="text-xs font-semibold uppercase tracking-wide text-faint">
                    Sourced facts
                  </h4>
                  {event.facts.map((f, i) => (
                    <p key={i} className="text-sm leading-relaxed text-muted">
                      <span className="font-medium text-foreground">
                        {f.label}:
                      </span>{" "}
                      {f.fact}
                      {f.source && (
                        <span className="text-faint"> ({f.source})</span>
                      )}
                    </p>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </Section>

        {/* Review cards */}
        <Section
          title="Review cards"
          description="Verified with evidence + organizer right-of-reply, verified positive, and an unverified short note."
        >
          <div className="flex flex-col gap-5">
            {reviews.map((r) => (
              <ReviewCard key={r.id} review={r} />
            ))}
          </div>
        </Section>
      </div>
    </div>
  );
}
