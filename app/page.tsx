import Link from "next/link";
import {
  Search,
  ArrowRight,
  Stamp,
  ScrollText,
} from "lucide-react";
import { getT } from "@/lib/i18n/server";
import {
  getEvent,
  getActor,
  aggregateForEvent,
  actors,
  events,
  reviews,
} from "@/lib/data";
import { ActorCard } from "@/components/actor-card";
import { StarRating } from "@/components/star-rating";
import { Badge, type BadgeTone } from "@/components/ui/badge";
import { scoreTone, type ScoreTone } from "@/components/rating-tone";

const TONE_TEXT: Record<ScoreTone, string> = {
  good: "text-success",
  mixed: "text-warning",
  poor: "text-danger",
};
const TONE_BADGE: Record<ScoreTone, BadgeTone> = {
  good: "success",
  mixed: "warning",
  poor: "danger",
};

export default async function Home() {
  const t = await getT();
  const featured = getEvent("zenith-grand-prix-2026");
  const featuredAgg = featured ? aggregateForEvent(featured.slug) : null;
  const featuredOrg = featured ? getActor(featured.organizerSlug) : null;
  const notable = actors.filter((a) => a.kinds.includes("organizer")).slice(0, 4);

  const organizerCount = actors.filter((a) => a.kinds.includes("organizer")).length;
  const verifiedReviews = reviews.filter((r) => r.verified).length;
  const eventCount = events.length;

  const featuredTone = featuredAgg ? scoreTone(featuredAgg.avgOverall) : null;
  const featuredBand = featuredTone ? t.ratingBand[featuredTone] : null;

  return (
    <div>
      {/* ── Masthead ─────────────────────────────────────────────────────────
          Not a marketing hero: the opening of a public record. Mono dateline,
          a declarative headline, and the running ledger totals. */}
      <section className="relative overflow-hidden border-b border-border">
        <div aria-hidden="true" className="hh-grid pointer-events-none absolute inset-0" />
        <div className="relative mx-auto max-w-6xl px-5 py-16 sm:px-6 sm:py-24">
          {/* Dateline — the record's masthead line */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-accent-strong">
            <span className="hh-label flex items-center gap-1.5">
              <ScrollText aria-hidden="true" className="size-3.5" />
              {t.home.recordEyebrow}
            </span>
            <span aria-hidden="true" className="h-3 w-px bg-border-strong" />
            <span className="hh-label text-faint">{t.brand.region}</span>
          </div>

          <h1 className="mt-6 max-w-4xl text-4xl font-bold leading-[1.04] tracking-tight text-foreground sm:text-6xl">
            {t.home.heroTitleLead}
            <span className="text-accent-strong">{t.home.heroTitleAccent}</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">
            {t.brand.pitch}
          </p>

          {/* Primary action — query the record */}
          <form
            action="/directory"
            method="get"
            className="mt-8 flex w-full max-w-2xl flex-col gap-2.5 sm:flex-row"
          >
            <div className="relative flex-1">
              <Search
                aria-hidden="true"
                className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-faint"
              />
              <input
                type="search"
                name="q"
                aria-label={t.home.searchAria}
                placeholder={t.home.searchPlaceholder}
                className="h-14 w-full rounded-lg border border-border-strong bg-surface pl-12 pr-4 text-base text-foreground shadow-sm outline-none placeholder:text-faint focus:border-accent focus:ring-4 focus:ring-accent/15"
              />
            </div>
            <button
              type="submit"
              className="inline-flex h-14 shrink-0 items-center justify-center gap-2 rounded-lg bg-accent px-8 text-base font-semibold text-accent-foreground shadow-sm transition-colors hover:bg-accent-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <Search aria-hidden="true" className="size-5" />
              {t.home.searchButton}
            </button>
          </form>

          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
            <Link href="/directory" className="inline-flex items-center gap-1 font-semibold text-accent-strong hover:underline">
              {t.common.browseDirectory}
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
            <span className="text-border-strong" aria-hidden="true">|</span>
            <Link href="/review/new" className="font-semibold text-accent-strong hover:underline">
              {t.home.writeReview}
            </Link>
          </div>

          {/* Ledger strip — running totals, presented as the record's tallies, not
              three giant marketing numbers. Mono figures, ruled dividers. */}
          <dl className="mt-12 inline-grid grid-cols-3 divide-x divide-border rounded-lg border border-border bg-surface/70 shadow-sm backdrop-blur-sm">
            <LedgerTally value={organizerCount} label={t.home.statOrganizers} />
            <LedgerTally value={verifiedReviews} label={t.home.statVerifiedReviews} />
            <LedgerTally value={eventCount} label={t.home.statEvents} />
          </dl>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        {/* ── Featured record — a single filed entry, the visual anchor ─────── */}
        {featured && featuredAgg && (
          <section className="mt-16">
            <div className="flex items-center justify-between gap-3">
              <span className="hh-label flex items-center gap-1.5 text-faint">
                <Stamp aria-hidden="true" className="size-3.5" />
                {t.home.onTheRecord}
              </span>
              <span className="hh-ref">REC-2026-001</span>
            </div>

            <Link
              href={`/e/${featured.slug}`}
              className="group mt-3 block overflow-hidden rounded-xl border border-border bg-surface shadow-md transition duration-200 hover:-translate-y-0.5 hover:border-border-strong hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <div className="grid lg:grid-cols-[1.7fr_1fr]">
                {/* Case */}
                <div className="p-6 sm:p-8">
                  <h2 className="text-2xl font-bold tracking-tight text-foreground transition-colors group-hover:text-accent-strong sm:text-3xl">
                    {featured.name}
                  </h2>
                  <p className="hh-ref mt-2 flex flex-wrap items-center gap-x-2 gap-y-1">
                    <span>{featured.dates}</span>
                    <span aria-hidden="true">·</span>
                    <span>{featured.location}</span>
                    {featuredOrg && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span className="font-medium text-muted">{featuredOrg.name}</span>
                      </>
                    )}
                  </p>

                  {/* Ledger rows — mono labels, ruled dividers, filed not floaty */}
                  <dl className="mt-6 divide-y divide-border border-y border-border">
                    <LedgerRow
                      label={t.home.featuredProblemsLabel}
                      value={`${(featured.problems ?? []).length}`}
                      sub={t.home.featuredProblemsSub}
                    />
                    <LedgerRow
                      label={t.home.featuredAdvertisedLabel}
                      value={t.home.featuredAdvertisedValue}
                      sub={t.home.featuredAdvertisedSub}
                    />
                    <LedgerRow
                      label={t.home.featuredReportedLabel}
                      value={t.home.featuredReportedValue}
                      sub={t.home.featuredReportedSub}
                      valueTone="danger"
                    />
                  </dl>

                  <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-strong">
                    {t.home.seeFullRecord}
                    <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>

                {/* Scorecard — the record's tally, big mono numeral + stamp */}
                {featuredAgg.avgOverall !== null && (
                  <div className="relative flex flex-col justify-center gap-3 border-t border-border bg-surface-sunken p-6 sm:p-8 lg:border-l lg:border-t-0">
                    <span className="hh-stamp absolute right-5 top-5 hidden text-accent-strong sm:inline-flex">
                      {t.aggregate.verifiedSuffix}
                    </span>
                    <span className="hh-label text-faint">
                      {t.home.communityRecord}
                    </span>
                    <div className="flex items-end gap-2">
                      <span className={`font-mono text-6xl font-semibold leading-none tabular-nums ${featuredTone ? TONE_TEXT[featuredTone] : "text-foreground"}`}>
                        {featuredAgg.avgOverall.toFixed(1)}
                      </span>
                      <span className="pb-1 font-mono text-lg text-faint">/ 5</span>
                    </div>
                    <StarRating value={featuredAgg.avgOverall} size="md" />
                    {featuredBand && featuredTone && (
                      <Badge tone={TONE_BADGE[featuredTone]} size="md" className="w-fit font-semibold">
                        {featuredBand}
                      </Badge>
                    )}
                    <p className="hh-ref">
                      <span className="font-semibold text-foreground">{featuredAgg.count}</span> {t.common.reviews} ·{" "}
                      <span className="font-semibold text-foreground">{featuredAgg.verifiedCount}</span> {t.aggregate.verifiedSuffix}
                    </p>
                  </div>
                )}
              </div>
            </Link>
          </section>
        )}

        {/* ── The process — three filed steps, a real sequence ─────────────── */}
        <section className="mt-20">
          <span className="hh-label text-faint">{t.home.processEyebrow}</span>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-foreground">{t.home.howItWorksTitle}</h2>
          <div className="mt-6 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-3">
            <ProcessStep n="01" title={t.home.step1Title} body={t.home.step1Body} />
            <ProcessStep n="02" title={t.home.step2Title} body={t.home.step2Body} />
            <ProcessStep n="03" title={t.home.step3Title} body={t.home.step3Body} />
          </div>
          <div className="mt-4">
            <Link href="/how-it-works" className="inline-flex items-center gap-1 text-sm font-semibold text-accent-strong hover:underline">
              {t.home.howItWorksLink}
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </div>
        </section>

        {/* ── Organizers on record ───────────────────────────────────────── */}
        {notable.length > 0 && (
          <section className="mt-20">
            <span className="hh-label text-faint">{t.home.recordEyebrow}</span>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-foreground">{t.home.organizersOnRecord}</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {notable.map((a) => (
                <ActorCard key={a.slug} actor={a} />
              ))}
            </div>
            <div className="mt-4">
              <Link href="/directory" className="inline-flex items-center gap-1 text-sm font-semibold text-accent-strong hover:underline">
                {t.common.browseDirectory}
                <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
            </div>
          </section>
        )}

        {/* ── Posture ────────────────────────────────────────────────────── */}
        <section className="my-20 overflow-hidden rounded-xl border border-border bg-surface">
          <div className="border-l-2 border-accent px-6 py-8 sm:px-10">
            <span className="hh-label text-accent-strong">{t.home.postureEyebrow}</span>
            <p className="mt-3 max-w-3xl text-base leading-relaxed text-muted sm:text-lg">
              {t.brand.posture}
            </p>
            <Link href="/trust" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-accent-strong hover:underline">
              {t.home.howWeKeepItHonest}
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}

/** A running tally in the masthead ledger strip. Mono figure, mono label. */
function LedgerTally({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col gap-1 px-5 py-4 sm:px-6">
      <dt className="font-mono text-3xl font-semibold tabular-nums tracking-tight text-foreground">{value}</dt>
      <dd className="hh-label text-faint">{label}</dd>
    </div>
  );
}

/** A single ruled row inside a filed record card. */
function LedgerRow({
  label,
  value,
  sub,
  valueTone,
}: {
  label: string;
  value: string;
  sub: string;
  valueTone?: "danger";
}) {
  return (
    <div className="grid grid-cols-[9rem_1fr] gap-x-4 gap-y-1 py-3 sm:grid-cols-[11rem_1fr]">
      <dt className="hh-label pt-0.5 text-faint">{label}</dt>
      <dd>
        <span className={`font-semibold ${valueTone === "danger" ? "text-danger" : "text-foreground"}`}>{value}</span>
        <span className="mt-0.5 block text-xs leading-snug text-muted">{sub}</span>
      </dd>
    </div>
  );
}

/** One filed step in the process ledger. Mono step index, ruled cell. */
function ProcessStep({ n, title, body }: { n: string; title: string; body: string }) {
  return (
    <div className="bg-surface p-6">
      <span className="font-mono text-sm font-semibold text-accent-strong">{n}</span>
      <h3 className="mt-3 font-semibold text-foreground">{title}</h3>
      <p className="mt-1.5 text-sm leading-relaxed text-muted">{body}</p>
    </div>
  );
}
