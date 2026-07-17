import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BadgeCheck } from "lucide-react";
import { getActor, eventsForActor, reviewsForActor, aggregateForActor } from "@/lib/data";
import type { ActorKind } from "@/lib/types";
import { getT } from "@/lib/i18n/server";
import { getSessionUser } from "@/lib/auth";
import { getActorOwnerHandle, getViewerClaimStatus, getRepliesForActor } from "@/lib/claims";
import { AggregateBar } from "@/components/aggregate-bar";
import { ReviewCard } from "@/components/review-card";
import { Badge, type BadgeTone } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const t = await getT();
  const a = getActor(slug);
  if (!a) return { title: t.organizerPage.metaTitleFallback };
  return {
    title: t.organizerPage.metaTitle(a.name),
    description: t.organizerPage.metaDescription(a.name, a.blurb),
  };
}

const kindTone: Record<ActorKind, BadgeTone> = { organizer: "accent", sponsor: "neutral", company: "outline" };

export default async function ActorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const t = await getT();
  const actor = getActor(slug);
  if (!actor) notFound();

  const events = eventsForActor(slug);
  const reviews = reviewsForActor(slug);
  const agg = aggregateForActor(slug);

  const [user, ownerHandle, replies] = await Promise.all([
    getSessionUser(),
    getActorOwnerHandle(slug),
    getRepliesForActor(slug),
  ]);
  const viewerOwnsClaim =
    !!user && (await getViewerClaimStatus(slug, user.id)) === "verified";

  return (
    <div className="mx-auto max-w-3xl px-5 py-10">
      <div className="flex flex-wrap items-center gap-2 text-sm text-faint">
        <Link href="/directory" className="hover:text-foreground">{t.nav.directory}</Link>
        <span>/</span>
        <span>{actor.kinds.includes("organizer") ? t.organizerPage.crumbOrganizer : t.organizerPage.crumbSponsor}</span>
      </div>

      <div className="mt-2 flex flex-wrap items-center gap-3">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{actor.name}</h1>
        <div className="flex gap-1.5">
          {actor.kinds.map((k) => (
            <Badge key={k} tone={kindTone[k]}>{t.actorKinds[k]}</Badge>
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
        <p className="mt-2 text-xs text-faint">{t.organizerPage.alsoSeenAs(actor.aka.join(", "))}</p>
      )}

      <div className="mt-5 flex flex-wrap gap-3">
        <Link href="/review/new" className="rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground shadow-sm transition-colors hover:bg-accent-strong">
          {t.organizerPage.writeReview}
        </Link>
        {ownerHandle ? (
          <span className="inline-flex items-center gap-1.5 rounded-lg border border-success-border bg-success-subtle px-4 py-2.5 text-sm font-semibold text-success-strong">
            <BadgeCheck aria-hidden="true" className="size-4" />
            {t.claim.claimedByName(ownerHandle)}
          </span>
        ) : (
          <Link
            href={`/o/${slug}/claim`}
            className={buttonVariants({ variant: "secondary", size: "md" })}
          >
            {t.organizerPage.claimPage}
          </Link>
        )}
      </div>

      <div className="mt-10">
        <AggregateBar aggregate={agg} title={t.organizerPage.aggregateTitle} />
      </div>

      {events.length > 0 && (
        <section className="mt-10">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">{t.organizerPage.eventsHeading}</h2>
          <div className="mt-4 grid gap-3">
            {events.map((e) => {
              const role = e.organizerSlug === slug ? t.organizerPage.roleOrganized : t.organizerPage.roleSponsored;
              return (
                <Link key={e.slug} href={`/e/${e.slug}`} className="group block rounded-lg border border-border bg-surface p-4 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-border-strong hover:shadow-md">
                  <div className="flex items-center justify-between gap-2">
                    <div className="font-semibold text-foreground transition-colors group-hover:text-accent-strong">{e.name}</div>
                    <Badge tone="outline" size="sm">{role}</Badge>
                  </div>
                  <div className="hh-ref mt-1.5">{e.dates} · {e.location}</div>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      <section className="mt-10">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">{t.common.reviewsWithCount(reviews.length)}</h2>
        <div className="mt-4">
          {reviews.length === 0 ? (
            <div className="rounded-xl border border-dashed border-border bg-surface p-6 text-center">
              <p className="text-sm text-muted">{t.organizerPage.noReviews}</p>
              <Link href="/review/new" className="mt-3 inline-block rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground shadow-sm transition-colors hover:bg-accent-strong">
                {t.organizerPage.beFirst}
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {reviews.map((r) => {
                const dr = replies.get(r.id);
                return (
                  <ReviewCard
                    key={r.id}
                    review={r}
                    actorSlug={slug}
                    canReply={viewerOwnsClaim}
                    dynamicReply={
                      dr ? { author: dr.handle, body: dr.body, date: dr.createdAt } : null
                    }
                  />
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
