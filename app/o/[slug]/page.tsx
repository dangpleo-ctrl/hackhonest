import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { actors, getActor, eventsForActor, reviewsForActor, aggregateForActor } from "@/lib/data";
import type { ActorKind } from "@/lib/types";
import { brand } from "@/lib/brand";
import { AggregateBar } from "@/components/aggregate-bar";
import { ReviewCard } from "@/components/review-card";
import { Badge, type BadgeTone } from "@/components/ui/badge";

export function generateStaticParams() {
  return actors.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const a = getActor(slug);
  if (!a) return { title: `Organizer — ${brand.name}` };
  return {
    title: `${a.name} — hackathon reviews & record — ${brand.name}`,
    description: `Is ${a.name} a good hackathon organizer/sponsor? What verified participants reported: ${a.blurb}`,
  };
}

const kindTone: Record<ActorKind, BadgeTone> = { organizer: "accent", sponsor: "neutral", company: "outline" };
const kindLabel: Record<ActorKind, string> = { organizer: "Organizer", sponsor: "Sponsor", company: "Company" };

export default async function ActorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const actor = getActor(slug);
  if (!actor) notFound();

  const events = eventsForActor(slug);
  const reviews = reviewsForActor(slug);
  const agg = aggregateForActor(slug);

  return (
    <div className="mx-auto max-w-3xl px-5 py-10">
      <div className="flex flex-wrap items-center gap-2 text-sm text-faint">
        <Link href="/directory" className="hover:text-foreground">Directory</Link>
        <span>/</span>
        <span>{actor.kinds.includes("organizer") ? "Organizer" : "Sponsor"}</span>
      </div>

      <div className="mt-2 flex flex-wrap items-center gap-3">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{actor.name}</h1>
        <div className="flex gap-1.5">
          {actor.kinds.map((k) => (
            <Badge key={k} tone={kindTone[k]}>{kindLabel[k]}</Badge>
          ))}
        </div>
      </div>

      <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-muted">{actor.blurb}</p>
      <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-faint">
        {actor.location && <span>{actor.location}</span>}
        {actor.website && (
          <a href={actor.website} target="_blank" rel="noopener noreferrer" className="text-accent-strong hover:underline">
            {actor.website.replace(/^https?:\/\//, "")}
          </a>
        )}
      </div>
      {actor.aka && actor.aka.length > 1 && (
        <p className="mt-2 text-xs text-faint">Also seen as: {actor.aka.join(", ")}</p>
      )}

      <div className="mt-5 flex flex-wrap gap-3">
        <Link href="/review/new" className="rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground shadow-sm transition-colors hover:bg-accent-strong">
          Write a review
        </Link>
        <button className="cursor-not-allowed rounded-lg border border-border px-5 py-2.5 text-sm font-semibold text-faint" title="Right of reply — coming with public launch" disabled>
          Claim this page
        </button>
      </div>

      <div className="mt-10">
        <AggregateBar aggregate={agg} title="What verified reviewers reported" />
      </div>

      {events.length > 0 && (
        <section className="mt-10">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Events</h2>
          <div className="mt-4 grid gap-3">
            {events.map((e) => {
              const role = e.organizerSlug === slug ? "Organized" : "Sponsored";
              return (
                <Link key={e.slug} href={`/e/${e.slug}`} className="group block rounded-2xl border border-border bg-surface p-4 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-border-strong hover:shadow-md">
                  <div className="flex items-center justify-between gap-2">
                    <div className="font-semibold text-foreground transition-colors group-hover:text-accent-strong">{e.name}</div>
                    <Badge tone="outline" size="sm">{role}</Badge>
                  </div>
                  <div className="mt-1.5 text-sm text-muted">{e.dates} · {e.location}</div>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      <section className="mt-10">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Reviews ({reviews.length})</h2>
        <div className="mt-4">
          {reviews.length === 0 ? (
            <div className="rounded-xl border border-dashed border-border bg-surface p-6 text-center">
              <p className="text-sm text-muted">No reviews yet.</p>
              <Link href="/review/new" className="mt-3 inline-block rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground shadow-sm transition-colors hover:bg-accent-strong">
                Be the first to review
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {reviews.map((r) => (
                <ReviewCard key={r.id} review={r} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
