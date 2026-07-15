import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { events, getEvent, getActor, reviewsForEvent, aggregateForEvent } from "@/lib/data";
import type { Perk, Winner } from "@/lib/types";
import { brand } from "@/lib/brand";
import { AggregateBar } from "@/components/aggregate-bar";
import { ReviewCard } from "@/components/review-card";
import { Badge, type BadgeTone } from "@/components/ui/badge";

export function generateStaticParams() {
  return events.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const e = getEvent(slug);
  if (!e) return { title: `Event — ${brand.name}` };
  return {
    title: `${e.name} — reviews & record — ${brand.name}`,
    description: `What verified participants reported about ${e.name} (${e.dates}, ${e.location}): prizes, perks, judging, and the sponsor-problem structure.`,
  };
}

const perkTone: Record<Perk["status"], BadgeTone> = {
  not_received: "danger",
  third_party_program: "warning",
  out_of_stock: "warning",
  delivered: "success",
  unknown: "neutral",
};
const perkLabel: Record<Perk["status"], string> = {
  not_received: "Not received",
  third_party_program: "Third-party program",
  out_of_stock: "Out of stock",
  delivered: "Delivered",
  unknown: "Unverified",
};

export default async function EventPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
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
        <Link href="/directory" className="hover:text-foreground">Directory</Link>
        <span>/</span>
        <span>Event</span>
      </div>
      <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground">{event.name}</h1>
      <p className="mt-2 text-[15px] text-muted">
        {event.dates} · {event.location}
        {organizer && (
          <>
            {" "}· organized by{" "}
            <Link href={`/o/${organizer.slug}`} className="font-medium text-accent-strong hover:underline">
              {organizer.name}
            </Link>
          </>
        )}
      </p>
      <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-muted">{event.blurb}</p>
      {event.format && (
        <p className="mt-3 max-w-2xl rounded-lg border border-border bg-surface-muted px-4 py-3 text-sm text-muted">
          <span className="font-semibold text-foreground">How it worked: </span>{event.format}
        </p>
      )}
      <div className="mt-5 flex flex-wrap gap-3">
        <Link href={`/review/new`} className="rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground hover:opacity-90">
          Write a review
        </Link>
      </div>

      {/* Aggregate */}
      <div className="mt-10">
        <AggregateBar aggregate={agg} title="What verified attendees reported" />
      </div>

      {/* Advertised claims */}
      {event.claims && event.claims.length > 0 && (
        <Section title="What was advertised">
          <div className="grid gap-3 sm:grid-cols-2">
            {event.claims.map((c) => (
              <div key={c.label} className="rounded-xl border border-border bg-surface p-4">
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
        <Section title="Advertised perks & credits, vs. what a verified attendee reported">
          <div className="overflow-hidden rounded-xl border border-border">
            <table className="w-full text-left text-sm">
              <thead className="bg-surface-muted text-xs uppercase tracking-wide text-faint">
                <tr>
                  <th className="px-4 py-2.5 font-medium">Provider</th>
                  <th className="px-4 py-2.5 font-medium">Advertised</th>
                  <th className="px-4 py-2.5 font-medium">Reported</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {event.perks.map((p, i) => (
                  <tr key={i} className="bg-surface align-top">
                    <td className="px-4 py-3 font-medium text-foreground">{p.provider}</td>
                    <td className="px-4 py-3 text-muted">{p.promised}</td>
                    <td className="px-4 py-3">
                      <Badge tone={perkTone[p.status]}>{perkLabel[p.status]}</Badge>
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
          title="Tracks & problem statements"
          subtitle={`${(event.problems ?? []).length} problem statements across ${event.tracks.length} tracks, each owned by a named enterprise. Every submission had to solve one of these.`}
        >
          <div className="grid gap-3 sm:grid-cols-2">
            {event.tracks.map((t) => {
              const sponsor = t.sponsor ? getActor(t.sponsor) : undefined;
              return (
                <div key={t.name} className="rounded-xl border border-border bg-surface p-4">
                  <div className="flex items-center justify-between gap-2">
                    <div className="font-semibold text-foreground">{t.name}</div>
                    <Badge tone="neutral">{t.problemCount} problems</Badge>
                  </div>
                  {sponsor && (
                    <div className="mt-1 text-xs text-muted">
                      Sponsored by{" "}
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
          title="Shortlisted teams & winners"
          subtitle={
            winnersSponsorMapped
              ? `As posted by the organizer. Every one of the ${winnerCount} projects on record was built to solve a named sponsor's production problem.`
              : "As posted by the organizer."
          }
        >
          <div className="space-y-4">
            {Object.entries(winnersByTrack).map(([track, ws]) => {
              const sponsor = ws[0]?.sponsor ? getActor(ws[0].sponsor) : undefined;
              return (
                <div key={track} className="rounded-xl border border-border bg-surface p-4">
                  <div className="flex items-center justify-between gap-2">
                    <div className="font-semibold text-foreground">{track}</div>
                    {sponsor && (
                      <Link href={`/o/${sponsor.slug}`} className="text-xs text-accent-strong hover:underline">
                        for {sponsor.name}
                      </Link>
                    )}
                  </div>
                  <ul className="mt-2 space-y-1.5">
                    {ws.map((w: Winner, i) => (
                      <li key={i} className="flex flex-wrap items-center gap-2 text-sm">
                        <Badge tone={w.placement === "Winner" ? "success" : "neutral"} size="sm">{w.placement}</Badge>
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
        <Section title="On the record" subtitle="Sourced facts about this event. We state them; we don't interpret them.">
          <div className="space-y-3">
            {event.facts.map((f) => (
              <div key={f.label} className="rounded-xl border border-border bg-surface p-4">
                <div className="font-semibold text-foreground">{f.label}</div>
                <p className="mt-1 text-sm leading-relaxed text-muted">{f.fact}</p>
                {f.source && <div className="mt-1 text-xs text-faint">Source: {f.source}</div>}
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Problem statements (evidence, grouped) */}
      {Object.keys(problemsByTrack).length > 0 && (
        <Section title={`The ${(event.problems ?? []).length} problem statements`} subtitle="Each is a named enterprise's real production problem.">
          <div className="space-y-4">
            {Object.entries(problemsByTrack).map(([track, ps]) => (
              <details key={track} className="rounded-xl border border-border bg-surface p-4">
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
      <Section title={`Reviews (${reviews.length})`}>
        {reviews.length === 0 ? (
          <EmptyReviews />
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
          Sponsors on record: {sponsors.map((s) => s.name).join(", ")}.
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

function EmptyReviews() {
  return (
    <div className="rounded-xl border border-dashed border-border bg-surface p-6 text-center">
      <p className="text-sm text-muted">No reviews yet. Were you there?</p>
      <Link href="/review/new" className="mt-3 inline-block rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground hover:opacity-90">
        Be the first to review
      </Link>
    </div>
  );
}

function groupBy<T>(arr: T[], key: (t: T) => string): Record<string, T[]> {
  return arr.reduce<Record<string, T[]>>((acc, item) => {
    const k = key(item);
    (acc[k] ??= []).push(item);
    return acc;
  }, {});
}
