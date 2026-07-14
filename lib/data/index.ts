import type { Actor, Event, Review, Aggregate } from "@/lib/types";
import { REVIEW_DIMENSIONS } from "@/lib/types";
import { actors, actorBySlug } from "./actors";
import { events, eventBySlug } from "./events";
import { reviews } from "./reviews";

export { actors, events, reviews };

export function getActor(slug: string): Actor | undefined {
  return actorBySlug.get(slug);
}
export function getEvent(slug: string): Event | undefined {
  return eventBySlug.get(slug);
}

// All reviews (seed for now; extend here to merge persisted submissions once a DB is wired).
export function allReviews(): Review[] {
  return reviews;
}

export function reviewsForActor(slug: string): Review[] {
  return allReviews().filter((r) => r.actorSlug === slug);
}
export function reviewsForEvent(slug: string): Review[] {
  return allReviews().filter((r) => r.eventSlug === slug);
}

// Events an actor is involved in — as organizer OR sponsor.
export function eventsForActor(slug: string): Event[] {
  return events.filter((e) => e.organizerSlug === slug || e.sponsorSlugs.includes(slug));
}

// Neutral aggregate: a COUNT of what reviewers reported, never a platform verdict.
export function computeAggregate(rs: Review[]): Aggregate {
  const count = rs.length;
  const verified = rs.filter((r) => r.verified);
  const verifiedCount = verified.length;
  const avgOverall = count ? round1(rs.reduce((s, r) => s + r.overall, 0) / count) : null;

  const dimensionAverages = REVIEW_DIMENSIONS.map((d) => {
    const vals = rs
      .map((r) => r.dimensions.find((x) => x.key === d.key)?.rating)
      .filter((v): v is number => typeof v === "number");
    return {
      key: d.key,
      label: d.label,
      avg: vals.length ? round1(vals.reduce((a, b) => a + b, 0) / vals.length) : null,
      count: vals.length,
    };
  });

  // "N of M verified reviewers rated '<dimension>' 2 stars or lower" — a neutral count.
  const signals = REVIEW_DIMENSIONS.map((d) => {
    const of = verified.length;
    const n = verified.filter((r) => (r.dimensions.find((x) => x.key === d.key)?.rating ?? 5) <= 2).length;
    return { label: `rated "${d.label}" 2 stars or lower`, n, of };
  }).filter((s) => s.of > 0 && s.n > 0);

  return { count, verifiedCount, avgOverall, dimensionAverages, signals };
}

export function aggregateForActor(slug: string): Aggregate {
  return computeAggregate(reviewsForActor(slug));
}
export function aggregateForEvent(slug: string): Aggregate {
  return computeAggregate(reviewsForEvent(slug));
}

// Simple full-text-ish search over actors + events (name, blurb, aka).
export function search(query: string): { actors: Actor[]; events: Event[] } {
  const q = query.trim().toLowerCase();
  if (!q) return { actors, events };
  const inActor = (a: Actor) =>
    [a.name, a.blurb, ...(a.aka ?? []), a.location ?? ""].join(" ").toLowerCase().includes(q);
  const inEvent = (e: Event) =>
    [e.name, e.blurb, e.location, e.format ?? ""].join(" ").toLowerCase().includes(q);
  return { actors: actors.filter(inActor), events: events.filter(inEvent) };
}

export function actorsWithActivity(): { actor: Actor; agg: Aggregate; events: number }[] {
  return actors
    .map((a) => ({ actor: a, agg: aggregateForActor(a.slug), events: eventsForActor(a.slug).length }))
    .sort((x, y) => y.agg.count - x.agg.count || y.events - x.events);
}

function round1(n: number): number {
  return Math.round(n * 10) / 10;
}
