import type { Metadata } from "next";
import Link from "next/link";
import { search, aggregateForActor } from "@/lib/data";
import type { Actor } from "@/lib/types";
import { brand } from "@/lib/brand";
import { ActorCard } from "@/components/actor-card";

export const metadata: Metadata = {
  title: `Directory — ${brand.name}`,
  description: "Browse and search hackathon organizers, companies, and sponsors, and see what verified participants reported.",
};

export default async function DirectoryPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q } = await searchParams;
  const query = (q ?? "").trim();
  const { actors: acts, events: evs } = search(query);

  const organizers = acts.filter((a) => a.kinds.includes("organizer"));
  const sponsors = acts.filter((a) => !a.kinds.includes("organizer"));

  return (
    <div className="mx-auto max-w-4xl px-5 py-10">
      <h1 className="text-3xl font-bold tracking-tight text-foreground">Directory</h1>
      <p className="mt-2 text-[15px] text-muted">
        Search the companies, organizers, and sponsors behind hackathon events.
      </p>

      <form action="/directory" method="get" className="mt-6 flex gap-2">
        <input
          type="search"
          name="q"
          defaultValue={query}
          placeholder="Search organizers, sponsors, events…"
          className="h-11 flex-1 rounded-lg border border-border bg-surface px-4 text-[15px] text-foreground outline-none placeholder:text-faint focus:border-accent"
        />
        <button type="submit" className="h-11 rounded-lg bg-accent px-5 text-sm font-semibold text-accent-foreground hover:opacity-90">
          Search
        </button>
      </form>

      {query && (
        <p className="mt-4 text-sm text-muted">
          {acts.length + evs.length} result{acts.length + evs.length === 1 ? "" : "s"} for &ldquo;{query}&rdquo;.{" "}
          {acts.length + evs.length === 0 && <Link href="/directory" className="text-accent-strong hover:underline">Clear</Link>}
        </p>
      )}

      {organizers.length > 0 && (
        <Group title="Organizers" actors={organizers} />
      )}

      {evs.length > 0 && (
        <section className="mt-10">
          <h2 className="text-lg font-semibold tracking-tight text-foreground">Events</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {evs.map((e) => (
              <Link key={e.slug} href={`/e/${e.slug}`} className="rounded-xl border border-border bg-surface p-4 transition hover:border-border-strong">
                <div className="font-semibold text-foreground">{e.name}</div>
                <div className="mt-1 text-sm text-muted">{e.dates} · {e.location}</div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {sponsors.length > 0 && (
        <Group title="Companies & sponsors" actors={sponsors} />
      )}

      {acts.length === 0 && evs.length === 0 && (
        <div className="mt-10 rounded-xl border border-dashed border-border bg-surface p-8 text-center">
          <p className="text-muted">Nothing matches yet.</p>
          <Link href="/review/new" className="mt-3 inline-block rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground hover:opacity-90">
            Add the first review
          </Link>
        </div>
      )}
    </div>
  );
}

function Group({ title, actors }: { title: string; actors: Actor[] }) {
  return (
    <section className="mt-10">
      <h2 className="text-lg font-semibold tracking-tight text-foreground">{title}</h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {actors.map((a) => (
          <ActorCard key={a.slug} actor={a} aggregate={aggregateForActor(a.slug)} />
        ))}
      </div>
    </section>
  );
}
