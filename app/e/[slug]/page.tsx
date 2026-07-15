import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { events, getEvent, getActor, reviewsForEvent, aggregateForEvent } from "@/lib/data";
import type { Perk, Winner } from "@/lib/types";
import { getT } from "@/lib/i18n/server";
import { AggregateBar } from "@/components/aggregate-bar";
import { ReviewCard } from "@/components/review-card";
import { Badge, type BadgeTone } from "@/components/ui/badge";

export function generateStaticParams() {
  return events.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const t = await getT();
  const e = getEvent(slug);
  if (!e) return { title: t.eventPage.metaTitleFallback };
  return {
    title: t.eventPage.metaTitle(e.name),
    description: t.eventPage.metaDescription(e.name, e.dates, e.location),
  };
}

const perkTone: Record<Perk["status"], BadgeTone> = {
  not_received: "danger",
  third_party_program: "warning",
  out_of_stock: "warning",
  delivered: "success",
  unknown: "neutral",
};

export default async function EventPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const t = await getT();
  const event = getEvent(slug);
  if (!event) notFound();

  const organizer = getActor(event.organizerSlug);
  const sponsors = event.sponsorSlugs.map(getActor).filter((a): a is NonNullable<typeof a> => !!a);
  const reviews = reviewsForEvent(slug);
  const agg = aggregateForEvent(slug);
  const problemsByTrack = groupBy(event.problems ?? [], (p) => p.track);
  const winnersByTrack = groupBy(event.winners ?? [], (w) => w.track);
  const winnerCount = (event.winners ?? []).length;
  const winnersSponsorMapped = (event.winners ?? []).some((w) => w.sponsor);

  return (
    <div className="mx-auto max-w-4xl px-5 py-10">
      {/* Header */}
      <div className="flex flex-wrap items-center gap-2 text-sm text-faint">
        <Link href="/directory" className="hover:text-foreground">{t.nav.directory}</Link>
        <span>/</span>
        <span>{t.eventPage.crumbEvent}</span>
      </div>

      <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{event.name}</h1>
      <p className="mt-2 text-[15px] text-muted">
        {event.dates} · {event.location}
        {organizer && (
          <>
            {" "}· {t.eventPage.organizedBy}{" "}
            <Link href={`/o/${organizer.slug}`} className="font-medium text-accent-strong hover:underline">
              {organizer.name}
            </Link>
          </>
        )}
      </p>
      <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-muted">{event.blurb}</p>
      {event.format && (
        <p className="mt-3 max-w-2xl rounded-lg border border-border bg-surface-muted px-4 py-3 text-sm text-muted">
          <span className="font-semibold text-foreground">{t.eventPage.howItWorked}</span>{event.format}
        </p>
      )}
      <div className="mt-5 flex flex-wrap gap-3">
        <Link href={`/review/new`} className="rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground shadow-sm transition-colors hover:bg-accent-strong">
          {t.eventPage.writeReview}
        </Link>
      </div>

      {/* Aggregate */}
      <div className="mt-10">
        <AggregateBar aggregate={agg} title={t.eventPage.aggregateTitle} />
      </div>

      {/* Advertised claims */}
      {event.claims && event.claims.length > 0 && (
        <Section title={t.eventPage.advertisedHeading}>
          <div className="grid gap-3 sm:grid-cols-2">
            {event.claims.map((c) => (
              <div key={c.label} className="rounded-2xl border border-border bg-surface p-4 shadow-sm">
                <div className="text-xs font-medium uppercase tracking-wide text-faint">{c.label}</div>
                <div className="mt-1 text-lg font-semibold text-foreground">{c.value}</div>
                {c.note && <div className="mt-1 text-xs text-muted">{c.note}</div>}
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Perks — the evidence */}
      {event.perks && event.perks.length > 0 && (
        <Section title={t.eventPage.perksHeading}>
          <div className="overflow-hidden rounded-2xl border border-border shadow-sm">
            <table className="w-full text-left text-sm">
              <thead className="bg-surface-muted text-xs uppercase tracking-wide text-faint">
                <tr>
                  <th className="px-4 py-3 font-semibold">{t.eventPage.perksColProvider}</th>
                  <th className="px-4 py-3 font-semibold">{t.eventPage.perksColAdvertised}</th>
                  <th className="px-4 py-3 font-semibold">{t.eventPage.perksColReported}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {event.perks.map((p, i) => (
                  <tr key={i} className="bg-surface align-top transition-colors hover:bg-surface-muted/50">
                    <td className="px-4 py-3 font-medium text-foreground">{p.provider}</td>
                    <td className="px-4 py-3 text-muted">{p.promised}</td>
                    <td className="px-4 py-3">
                      <Badge tone={perkTone[p.status]}>{t.perkStatus[p.status]}</Badge>
                      {p.note && <div className="mt-1 text-xs text-muted">{p.note}</div>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>
      )}

      {/* Tracks — the corporate backlog */}
      {event.tracks && event.tracks.length > 0 && (
        <Section
          title={t.eventPage.tracksHeading}
          subtitle={t.eventPage.tracksSubtitle((event.problems ?? []).length, event.tracks.length)}
        >
          <div className="grid gap-3 sm:grid-cols-2">
            {event.tracks.map((tr) => {
              const sponsor = tr.sponsor ? getActor(tr.sponsor) : undefined;
              return (
                <div key={tr.name} className="rounded-2xl border border-border bg-surface p-4 shadow-sm">
                  <div className="flex items-center justify-between gap-2">
                    <div className="font-semibold text-foreground">{tr.name}</div>
                    <Badge tone="neutral">{t.eventPage.problemsBadge(tr.problemCount)}</Badge>
                  </div>
                  {sponsor && (
                    <div className="mt-1 text-xs text-muted">
                      {t.eventPage.sponsoredBy}{" "}
                      <Link href={`/o/${sponsor.slug}`} className="text-accent-strong hover:underline">{sponsor.name}</Link>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </Section>
      )}

      {/* Winners → sponsor mapping (the bias, as fact) */}
      {winnerCount > 0 && (
        <Section
          title={t.eventPage.winnersHeading}
          subtitle={
            winnersSponsorMapped
              ? t.eventPage.winnersSubtitleMapped(winnerCount)
              : t.eventPage.winnersSubtitlePlain
          }
        >
          <div className="space-y-4">
            {Object.entries(winnersByTrack).map(([track, ws]) => {
              const sponsor = ws[0]?.sponsor ? getActor(ws[0].sponsor) : undefined;
              return (
                <div key={track} className="rounded-2xl border border-border bg-surface p-4 shadow-sm">
                  <div className="flex items-center justify-between gap-2">
                    <div className="font-semibold text-foreground">{track}</div>
                    {sponsor && (
                      <Link href={`/o/${sponsor.slug}`} className="text-xs text-accent-strong hover:underline">
                        {t.eventPage.forSponsor(sponsor.name)}
                      </Link>
                    )}
                  </div>
                  <ul className="mt-2 space-y-1.5">
                    {ws.map((w: Winner, i) => (
                      <li key={i} className="flex flex-wrap items-center gap-2 text-sm">
                        <Badge tone={w.placement === "Winner" ? "success" : "neutral"} size="sm">{t.placement[w.placement]}</Badge>
                        <span className="font-medium text-foreground">{w.team}</span>
                        {w.project && <span className="text-muted">— {w.project}</span>}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </Section>
      )}

      {/* Neutral facts */}
      {event.facts && event.facts.length > 0 && (
        <Section title={t.eventPage.factsHeading} subtitle={t.eventPage.factsSubtitle}>
          <div className="space-y-3">
            {event.facts.map((f) => (
              <div key={f.label} className="rounded-2xl border border-border bg-surface p-4 shadow-sm">
                <div className="font-semibold text-foreground">{f.label}</div>
                <p className="mt-1 text-sm leading-relaxed text-muted">{f.fact}</p>
                {f.source && <div className="mt-1 text-xs text-faint">{t.eventPage.source(f.source)}</div>}
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Problem statements (evidence, grouped) */}
      {Object.keys(problemsByTrack).length > 0 && (
        <Section title={t.eventPage.problemsHeading((event.problems ?? []).length)} subtitle={t.eventPage.problemsSubtitle}>
          <div className="space-y-4">
            {Object.entries(problemsByTrack).map(([track, ps]) => (
              <details key={track} className="rounded-2xl border border-border bg-surface p-4 shadow-sm">
                <summary className="cursor-pointer font-semibold text-foreground">{track} <span className="font-normal text-faint">({ps.length})</span></summary>
                <ul className="mt-3 space-y-2">
                  {ps.map((p, i) => (
                    <li key={i}>
                      <div className="text-sm font-medium text-foreground">{p.title}</div>
                      <div className="text-xs leading-relaxed text-muted">{p.statement}</div>
                    </li>
                  ))}
                </ul>
              </details>
            ))}
          </div>
        </Section>
      )}

      {/* Reviews */}
      <Section title={t.common.reviewsWithCount(reviews.length)}>
        {reviews.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border bg-surface p-6 text-center">
            <p className="text-sm text-muted">{t.eventPage.noReviews}</p>
            <Link href="/review/new" className="mt-3 inline-block rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground shadow-sm transition-colors hover:bg-accent-strong">
              {t.eventPage.beFirst}
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {reviews.map((r) => (
              <ReviewCard key={r.id} review={r} />
            ))}
          </div>
        )}
      </Section>

      {sponsors.length > 0 && (
        <p className="mt-10 text-xs text-faint">
          {t.eventPage.sponsorsOnRecord(sponsors.map((s) => s.name).join(", "))}
        </p>
      )}
    </div>
  );
}

function Section({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <section className="mt-10">
      <h2 className="text-xl font-semibold tracking-tight text-foreground">{title}</h2>
      {subtitle && <p className="mt-1 max-w-2xl text-sm leading-relaxed text-muted">{subtitle}</p>}
      <div className="mt-4">{children}</div>
    </section>
  );
}

function groupBy<T>(arr: T[], key: (t: T) => string): Record<string, T[]> {
  return arr.reduce<Record<string, T[]>>((acc, item) => {
    const k = key(item);
    (acc[k] ??= []).push(item);
    return acc;
  }, {});
}
