import Link from "next/link";
import {
  Search,
  ShieldCheck,
  FileText,
  Calendar,
  MapPin,
  ArrowRight,
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
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-border">
        {/* One subtle brand wash — the only gradient on the page. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-accent-subtle/70 to-background"
        />
        <div className="relative mx-auto max-w-5xl px-5 py-20 sm:py-28">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-accent-border bg-accent-subtle px-3 py-1 text-xs font-semibold text-accent-strong">
            <ShieldCheck aria-hidden="true" className="size-3.5" />
            {t.home.heroBadge}
          </span>

          <h1 className="mt-5 max-w-3xl text-4xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-6xl">
            {t.home.heroTitleLead}
            <span className="text-accent-strong">{t.home.heroTitleAccent}</span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">
            {t.brand.pitch}
          </p>

          {/* Primary CTA — search the directory */}
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
                className="h-14 w-full rounded-xl border border-border bg-surface pl-12 pr-4 text-base text-foreground shadow-sm outline-none placeholder:text-faint focus:border-accent focus:ring-4 focus:ring-accent/15"
              />
            </div>
            <button
              type="submit"
              className="inline-flex h-14 shrink-0 items-center justify-center rounded-xl bg-accent px-8 text-base font-semibold text-accent-foreground shadow-sm transition-colors hover:bg-accent-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
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

          {/* Trust stats — real counts from the seed */}
          <dl className="mt-12 flex flex-wrap gap-x-10 gap-y-6">
            <HeroStat value={organizerCount} label={t.home.statOrganizers} />
            <HeroStat value={verifiedReviews} label={t.home.statVerifiedReviews} />
            <HeroStat value={eventCount} label={t.home.statEvents} />
          </dl>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-5">
        {/* ── Featured case — the visual anchor ──────────────────────────── */}
        {featured && featuredAgg && (
          <section className="mt-16">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-faint">
              <FileText aria-hidden="true" className="size-4" />
              {t.home.onTheRecord}
            </div>

            <Link
              href={`/e/${featured.slug}`}
              className="group mt-3 block overflow-hidden rounded-2xl border border-border bg-surface shadow-md transition duration-200 hover:-translate-y-0.5 hover:border-border-strong hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <div className="grid lg:grid-cols-[1.7fr_1fr]">
                {/* Content */}
                <div className="p-6 sm:p-8">
                  <h2 className="text-2xl font-bold tracking-tight text-foreground transition-colors group-hover:text-accent-strong sm:text-3xl">
                    {featured.name}
                  </h2>
                  <p className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted">
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar aria-hidden="true" className="size-3.5 text-faint" />
                      {featured.dates}
                    </span>
                    <span className="text-border-strong" aria-hidden="true">·</span>
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin aria-hidden="true" className="size-3.5 text-faint" />
                      {featured.location}
                    </span>
                    {featuredOrg && (
                      <>
                        <span className="text-border-strong" aria-hidden="true">·</span>
                        <span className="font-medium text-foreground">{featuredOrg.name}</span>
                      </>
                    )}
                  </p>

                  <div className="mt-6 grid gap-3 sm:grid-cols-3">
                    <Stat label={t.home.featuredProblemsLabel} value={`${(featured.problems ?? []).length}`} sub={t.home.featuredProblemsSub} />
                    <Stat label={t.home.featuredAdvertisedLabel} value={t.home.featuredAdvertisedValue} sub={t.home.featuredAdvertisedSub} />
                    <Stat label={t.home.featuredReportedLabel} value={t.home.featuredReportedValue} sub={t.home.featuredReportedSub} />
                  </div>

                  <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-strong">
                    {t.home.seeFullRecord}
                    <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>

                {/* Scorecard — the rating, big and instant */}
                {featuredAgg.avgOverall !== null && (
                  <div className="flex flex-col justify-center gap-3 border-t border-border bg-surface-sunken p-6 sm:p-8 lg:border-l lg:border-t-0">
                    <span className="text-xs font-semibold uppercase tracking-wide text-faint">
                      {t.home.communityRecord}
                    </span>
                    <div className="flex items-end gap-2">
                      <span className={`text-6xl font-bold leading-none tabular-nums ${featuredTone ? TONE_TEXT[featuredTone] : "text-foreground"}`}>
                        {featuredAgg.avgOverall.toFixed(1)}
                      </span>
                      <span className="pb-1 text-lg font-medium text-faint">/ 5</span>
                    </div>
                    <StarRating value={featuredAgg.avgOverall} size="md" />
                    {featuredBand && featuredTone && (
                      <Badge tone={TONE_BADGE[featuredTone]} size="md" className="w-fit font-semibold">
                        {featuredBand}
                      </Badge>
                    )}
                    <p className="text-sm text-muted">
                      <span className="font-semibold text-foreground">{featuredAgg.count}</span> {t.common.reviews} ·{" "}
                      <span className="font-semibold text-foreground">{featuredAgg.verifiedCount}</span> {t.aggregate.verifiedSuffix}
                    </p>
                  </div>
                )}
              </div>
            </Link>
          </section>
        )}

        {/* ── How it works ───────────────────────────────────────────────── */}
        <section className="mt-16">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">{t.home.howItWorksTitle}</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            <HowStep n="1" title={t.home.step1Title} body={t.home.step1Body} />
            <HowStep n="2" title={t.home.step2Title} body={t.home.step2Body} />
            <HowStep n="3" title={t.home.step3Title} body={t.home.step3Body} />
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
          <section className="mt-16">
            <h2 className="text-xl font-semibold tracking-tight text-foreground">{t.home.organizersOnRecord}</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
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
        <section className="my-20 overflow-hidden rounded-2xl border border-border bg-surface-muted">
          <div className="flex flex-col items-center gap-4 px-6 py-10 text-center sm:px-10">
            <span className="flex size-11 items-center justify-center rounded-full bg-accent-subtle text-accent-strong">
              <ShieldCheck aria-hidden="true" className="size-5" />
            </span>
            <p className="mx-auto max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
              {t.brand.posture}
            </p>
            <Link href="/trust" className="inline-flex items-center gap-1 text-sm font-semibold text-accent-strong hover:underline">
              {t.home.howWeKeepItHonest}
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}

function HeroStat({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col border-l border-border pl-5 first:border-l-0 first:pl-0">
      <dt className="text-3xl font-bold tabular-nums tracking-tight text-foreground">{value}</dt>
      <dd className="mt-0.5 text-sm text-faint">{label}</dd>
    </div>
  );
}

function Stat({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div className="rounded-xl border border-border bg-background p-4">
      <div className="text-xs font-medium uppercase tracking-wide text-faint">{label}</div>
      <div className="mt-1 font-bold text-foreground">{value}</div>
      <div className="mt-1 text-xs leading-snug text-muted">{sub}</div>
    </div>
  );
}

function HowStep({ n, title, body }: { n: string; title: string; body: string }) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-5 shadow-sm">
      <span className="flex size-9 items-center justify-center rounded-full bg-accent-subtle text-sm font-bold text-accent-strong">
        {n}
      </span>
      <h3 className="mt-3 font-semibold text-foreground">{title}</h3>
      <p className="mt-1 text-sm leading-relaxed text-muted">{body}</p>
    </div>
  );
}
