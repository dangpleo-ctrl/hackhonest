import Link from "next/link";
import { brand } from "@/lib/brand";
import { getEvent, getActor, aggregateForEvent, actors } from "@/lib/data";
import { ActorCard } from "@/components/actor-card";
import { StarRating } from "@/components/star-rating";

export default function Home() {
  const featured = getEvent("abs-2026");
  const featuredAgg = featured ? aggregateForEvent(featured.slug) : null;
  const featuredOrg = featured ? getActor(featured.organizerSlug) : null;
  const notable = actors.filter((a) => a.kinds.includes("organizer")).slice(0, 4);

  return (
    <div>
      {/* Hero */}
      <section className="border-b border-border bg-surface">
        <div className="mx-auto max-w-4xl px-5 py-16 sm:py-20">
          <p className="text-sm font-medium text-accent-strong">{brand.region}</p>
          <h1 className="mt-3 max-w-3xl text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl">
            Know who you&rsquo;re building for.
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">{brand.pitch}</p>

          <form action="/directory" method="get" className="mt-8 flex max-w-xl gap-2">
            <input
              type="search"
              name="q"
              placeholder="Search an organizer, sponsor, or event…"
              className="h-12 flex-1 rounded-lg border border-border bg-background px-4 text-[15px] text-foreground outline-none placeholder:text-faint focus:border-accent"
            />
            <button type="submit" className="h-12 rounded-lg bg-accent px-6 text-sm font-semibold text-accent-foreground hover:opacity-90">
              Search
            </button>
          </form>

          <div className="mt-4 flex flex-wrap gap-3 text-sm">
            <Link href="/directory" className="font-semibold text-accent-strong hover:underline">Browse the directory →</Link>
            <span className="text-faint">·</span>
            <Link href="/review/new" className="font-semibold text-accent-strong hover:underline">Write a review</Link>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-5">
        {/* Featured case */}
        {featured && featuredAgg && (
          <section className="mt-12">
            <p className="text-xs font-semibold uppercase tracking-wide text-faint">On the record</p>
            <Link
              href={`/e/${featured.slug}`}
              className="mt-2 block rounded-2xl border border-border bg-surface p-6 transition hover:border-border-strong"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="text-xl font-bold tracking-tight text-foreground">{featured.name}</h2>
                  <p className="mt-1 text-sm text-muted">
                    {featured.dates} · {featured.location}
                    {featuredOrg && <> · {featuredOrg.name}</>}
                  </p>
                </div>
                {featuredAgg.avgOverall !== null && (
                  <div className="flex items-center gap-2">
                    <StarRating value={featuredAgg.avgOverall} readOnly size="sm" showValue />
                    <span className="text-xs text-faint">{featuredAgg.count} review{featuredAgg.count === 1 ? "" : "s"}</span>
                  </div>
                )}
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                <Stat label="Problem statements" value={`${(featured.problems ?? []).length}`} sub="each a sponsor's real production problem" />
                <Stat label="Advertised" value="$1M+ perks" sub="mostly third-party programs & free tiers" />
                <Stat label="Reported" value="Credits not delivered" sub="OpenAI & AWS credits: applied, received $0" />
              </div>
              <span className="mt-4 inline-block text-sm font-semibold text-accent-strong">See the full record →</span>
            </Link>
          </section>
        )}

        {/* How it works */}
        <section className="mt-14">
          <div className="grid gap-4 sm:grid-cols-3">
            <HowStep n="1" title="Search the organizer" body="Reputation follows the actor across events, not just one weekend." />
            <HowStep n="2" title="Read the record" body="A neutral count of what verified attendees actually reported." />
            <HowStep n="3" title="Add yours" body="Took part? Post a verified review. You stay anonymous." />
          </div>
          <div className="mt-4">
            <Link href="/how-it-works" className="text-sm font-semibold text-accent-strong hover:underline">How it works →</Link>
          </div>
        </section>

        {/* Notable */}
        {notable.length > 0 && (
          <section className="mt-14">
            <h2 className="text-lg font-semibold tracking-tight text-foreground">Organizers on record</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {notable.map((a) => (
                <ActorCard key={a.slug} actor={a} />
              ))}
            </div>
          </section>
        )}

        {/* Posture */}
        <section className="my-16 rounded-2xl border border-border bg-surface-muted p-6 text-center">
          <p className="mx-auto max-w-2xl text-[15px] leading-relaxed text-muted">{brand.posture}</p>
          <Link href="/trust" className="mt-3 inline-block text-sm font-semibold text-accent-strong hover:underline">
            How we keep it honest →
          </Link>
        </section>
      </div>
    </div>
  );
}

function Stat({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div className="rounded-xl border border-border bg-background p-3">
      <div className="text-xs font-medium uppercase tracking-wide text-faint">{label}</div>
      <div className="mt-0.5 font-bold text-foreground">{value}</div>
      <div className="mt-0.5 text-xs leading-snug text-muted">{sub}</div>
    </div>
  );
}

function HowStep({ n, title, body }: { n: string; title: string; body: string }) {
  return (
    <div className="rounded-xl border border-border bg-surface p-5">
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent-subtle text-sm font-bold text-accent-strong">{n}</span>
      <h3 className="mt-3 font-semibold text-foreground">{title}</h3>
      <p className="mt-1 text-sm leading-relaxed text-muted">{body}</p>
    </div>
  );
}
