import type { Metadata } from "next";
import { actors, events, aggregateForActor } from "@/lib/data";
import { brand } from "@/lib/brand";
import {
  DirectoryBrowser,
  type DirectoryItem,
} from "@/components/directory-browser";

export const metadata: Metadata = {
  title: `Directory — ${brand.name}`,
  description:
    "Browse and search hackathon organizers, companies, and sponsors, and see what verified participants reported.",
};

export default async function DirectoryPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
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
      example: a.example ?? false,
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
    example: e.example ?? false,
  }));

  const items: DirectoryItem[] = [...actorItems, ...eventItems];

  return (
    <div className="mx-auto max-w-4xl px-5 py-10">
      <h1 className="text-3xl font-bold tracking-tight text-foreground">Directory</h1>
      <p className="mt-2 text-[15px] text-muted">
        Search the companies, organizers, and sponsors behind hackathon events.
      </p>

      <DirectoryBrowser items={items} initialQuery={query} />
    </div>
  );
}
