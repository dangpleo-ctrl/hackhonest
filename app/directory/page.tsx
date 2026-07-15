import type { Metadata } from "next";
import { actors, events, aggregateForActor } from "@/lib/data";
import { getT } from "@/lib/i18n/server";
import {
  DirectoryBrowser,
  type DirectoryItem,
} from "@/components/directory-browser";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getT();
  return {
    title: t.directory.metaTitle,
    description: t.directory.metaDescription,
  };
}

export default async function DirectoryPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const t = await getT();
  const { q } = await searchParams;
  const query = (q ?? "").trim();

  // Flatten actors + events into a plain, serializable list for the client
  // browser. Each actor carries its precomputed neutral aggregate (avg + count)
  // so the client card can render the community record without any server call.
  const actorItems: DirectoryItem[] = actors.map((a) => {
    const agg = aggregateForActor(a.slug);
    return {
      type: "actor",
      slug: a.slug,
      name: a.name,
      kinds: a.kinds,
      aka: a.aka,
      website: a.website,
      location: a.location,
      blurb: a.blurb,
      claimed: a.claimed ?? false,
      avgOverall: agg.avgOverall,
      reviewCount: agg.count,
    };
  });

  const eventItems: DirectoryItem[] = events.map((e) => ({
    type: "event",
    slug: e.slug,
    name: e.name,
    dates: e.dates,
    location: e.location,
    blurb: e.blurb,
    format: e.format,
  }));

  const items: DirectoryItem[] = [...actorItems, ...eventItems];

  return (
    <div className="mx-auto max-w-4xl px-5 py-10">
      <h1 className="text-3xl font-bold tracking-tight text-foreground">{t.directory.title}</h1>
      <p className="mt-2 text-[15px] text-muted">{t.directory.subtitle}</p>

      <DirectoryBrowser items={items} initialQuery={query} />
    </div>
  );
}
