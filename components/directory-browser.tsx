"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MapPin, Globe, History, Search, X } from "lucide-react";
import type { ActorKind } from "@/lib/types";
import { StarRating } from "./star-rating";
import { Badge, type BadgeTone } from "./ui/badge";
import { cn } from "./ui/cn";

// ── Serializable item shapes passed from the server page ──────────────────────
// The Directory page stays a server component; it flattens actors + events into
// these plain objects (each actor already carries its precomputed aggregate) and
// hands the array to this client component. No functions cross the boundary.

export interface DirectoryActorItem {
  type: "actor";
  slug: string;
  name: string;
  kinds: ActorKind[];
  aka?: string[];
  website?: string;
  location?: string;
  blurb: string;
  claimed?: boolean;
  example?: boolean;
  /** Precomputed via aggregateForActor on the server — a neutral count, never a verdict. */
  avgOverall: number | null;
  reviewCount: number;
}

export interface DirectoryEventItem {
  type: "event";
  slug: string;
  name: string;
  dates: string;
  location: string;
  blurb: string;
  format?: string;
  example?: boolean;
}

export type DirectoryItem = DirectoryActorItem | DirectoryEventItem;

type Category = "all" | "organizers" | "events" | "companies" | "sponsors";

const KIND_META: Record<ActorKind, { label: string; tone: BadgeTone }> = {
  organizer: { label: "Organizer", tone: "accent" },
  company: { label: "Company", tone: "neutral" },
  sponsor: { label: "Sponsor", tone: "neutral" },
};

// How many cards each category shows in the compact "All" overview before the
// "See all →" jump. Keeps the landing view short instead of one long stack.
const OVERVIEW_CAP = 4;
// Max rows in the autocomplete dropdown.
const MAX_SUGGESTIONS = 8;

function hrefFor(it: DirectoryItem): string {
  return it.type === "actor" ? `/o/${it.slug}` : `/e/${it.slug}`;
}

function primaryKind(a: DirectoryActorItem): ActorKind {
  if (a.kinds.includes("organizer")) return "organizer";
  if (a.kinds.includes("company")) return "company";
  return "sponsor";
}

function badgeFor(it: DirectoryItem): { label: string; tone: BadgeTone } {
  if (it.type === "event") return { label: "Event", tone: "outline" };
  return KIND_META[primaryKind(it)];
}

function locatorFor(it: DirectoryItem): string {
  if (it.type === "event") {
    return it.location ? `${it.dates} · ${it.location}` : it.dates;
  }
  return it.location ?? "";
}

function haystack(it: DirectoryItem): string {
  if (it.type === "event") {
    return [it.name, it.blurb, it.location, it.dates].join(" ").toLowerCase();
  }
  return [it.name, it.blurb, ...(it.aka ?? []), it.location ?? ""].join(" ").toLowerCase();
}

export function DirectoryBrowser({
  items,
  initialQuery = "",
}: {
  items: DirectoryItem[];
  initialQuery?: string;
}) {
  const router = useRouter();

  // ── Category slices + counts (static; the search box navigates, it doesn't
  //    filter this grid, so the counts reflect the full dataset) ──────────────
  const { actorItems, eventItems, organizers, companies, sponsors } = React.useMemo(() => {
    const acts = items.filter((i): i is DirectoryActorItem => i.type === "actor");
    const evs = items.filter((i): i is DirectoryEventItem => i.type === "event");
    return {
      actorItems: acts,
      eventItems: evs,
      organizers: acts.filter((a) => a.kinds.includes("organizer")),
      companies: acts.filter((a) => a.kinds.includes("company")),
      sponsors: acts.filter((a) => a.kinds.includes("sponsor")),
    };
  }, [items]);

  const tabs: { key: Category; label: string; count: number }[] = [
    { key: "all", label: "All", count: actorItems.length + eventItems.length },
    { key: "organizers", label: "Organizers", count: organizers.length },
    { key: "events", label: "Events", count: eventItems.length },
    { key: "companies", label: "Companies", count: companies.length },
    { key: "sponsors", label: "Sponsors", count: sponsors.length },
  ];

  const [active, setActive] = React.useState<Category>("all");

  const byCategory: Record<Exclude<Category, "all">, DirectoryItem[]> = {
    organizers,
    events: eventItems,
    companies,
    sponsors,
  };

  // ── Autocomplete state ─────────────────────────────────────────────────────
  const [query, setQuery] = React.useState(initialQuery);
  const [open, setOpen] = React.useState(() => initialQuery.trim().length > 0);
  const [highlight, setHighlight] = React.useState(-1);

  const rootRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const baseId = React.useId();
  const listboxId = `${baseId}-listbox`;
  const optionId = (i: number) => `${baseId}-opt-${i}`;

  const q = query.trim().toLowerCase();

  const matches = React.useMemo(() => {
    if (!q) return [];
    const rank = (it: DirectoryItem): number => {
      const name = it.name.toLowerCase();
      if (name.startsWith(q)) return 0;
      if (name.includes(q)) return 1;
      return 2;
    };
    return items
      .filter((it) => haystack(it).includes(q))
      .sort((a, b) => rank(a) - rank(b))
      .slice(0, MAX_SUGGESTIONS);
  }, [q, items]);

  const showDropdown = open && q.length > 0;

  // Close the dropdown on any click outside the combobox.
  React.useEffect(() => {
    function onDocMouseDown(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onDocMouseDown);
    return () => document.removeEventListener("mousedown", onDocMouseDown);
  }, []);

  // Keep the highlighted row visible if the list scrolls.
  React.useEffect(() => {
    if (highlight < 0) return;
    document.getElementById(`${baseId}-opt-${highlight}`)?.scrollIntoView({ block: "nearest" });
  }, [highlight, baseId]);

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setOpen(true);
      setHighlight((h) => Math.min(h + 1, matches.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlight((h) => Math.max(h - 1, 0));
    } else if (e.key === "Enter") {
      const target = highlight >= 0 ? matches[highlight] : matches[0];
      if (target) {
        e.preventDefault();
        setOpen(false);
        router.push(hrefFor(target));
      }
    } else if (e.key === "Escape") {
      setOpen(false);
      setHighlight(-1);
    }
  }

  return (
    <div>
      {/* ── Live autocomplete search ──────────────────────────────────────── */}
      <div ref={rootRef} className="relative mt-6">
        <Search
          aria-hidden="true"
          className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-faint"
        />
        <input
          ref={inputRef}
          type="text"
          role="combobox"
          aria-expanded={showDropdown}
          aria-controls={listboxId}
          aria-autocomplete="list"
          aria-activedescendant={showDropdown && highlight >= 0 ? optionId(highlight) : undefined}
          aria-label="Search organizers, sponsors, companies, and events"
          autoComplete="off"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setHighlight(-1);
            setOpen(true);
          }}
          onFocus={() => {
            if (query.trim()) setOpen(true);
          }}
          onKeyDown={onKeyDown}
          placeholder="Search organizers, sponsors, events…"
          className="h-11 w-full rounded-lg border border-border bg-surface pl-10 pr-10 text-[15px] text-foreground outline-none placeholder:text-faint focus:border-accent"
        />
        {query && (
          <button
            type="button"
            aria-label="Clear search"
            onClick={() => {
              setQuery("");
              setHighlight(-1);
              setOpen(false);
              inputRef.current?.focus();
            }}
            className="absolute right-2 top-1/2 inline-flex size-7 -translate-y-1/2 items-center justify-center rounded-md text-faint transition-colors hover:bg-surface-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <X aria-hidden="true" className="size-4" />
          </button>
        )}

        {showDropdown && (
          <div className="absolute z-20 mt-2 w-full overflow-hidden rounded-xl border border-border bg-surface shadow-md">
            {matches.length > 0 ? (
              <ul id={listboxId} role="listbox" className="max-h-[26rem] overflow-auto py-1">
                {matches.map((it, i) => {
                  const badge = badgeFor(it);
                  const locator = locatorFor(it);
                  return (
                    <li key={hrefFor(it)} id={optionId(i)} role="option" aria-selected={i === highlight}>
                      <Link
                        href={hrefFor(it)}
                        onMouseEnter={() => setHighlight(i)}
                        onClick={() => setOpen(false)}
                        className={cn(
                          "flex items-center gap-3 px-3 py-2.5",
                          i === highlight ? "bg-accent-subtle" : "hover:bg-surface-muted",
                        )}
                      >
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-sm font-medium text-foreground">
                            {it.name}
                          </span>
                          {locator && (
                            <span className="mt-0.5 block truncate text-xs text-faint">{locator}</span>
                          )}
                        </span>
                        <Badge tone={badge.tone} size="sm" className="shrink-0">
                          {badge.label}
                        </Badge>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <div className="flex items-center justify-between gap-3 px-4 py-3">
                <span className="text-sm text-muted">
                  No matches for &ldquo;{query.trim()}&rdquo;.
                </span>
                <Link
                  href="/review/new"
                  onClick={() => setOpen(false)}
                  className="shrink-0 text-sm font-semibold text-accent-strong hover:underline"
                >
                  Add the first review →
                </Link>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ── Category filter pills ─────────────────────────────────────────── */}
      <div role="group" aria-label="Filter directory by category" className="mt-5 flex flex-wrap gap-2">
        {tabs.map((t) => {
          const isActive = active === t.key;
          return (
            <button
              key={t.key}
              type="button"
              aria-pressed={isActive}
              onClick={() => setActive(t.key)}
              className={cn(
                "inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                isActive
                  ? "border-accent bg-accent text-accent-foreground"
                  : "border-border bg-surface text-muted hover:border-border-strong hover:text-foreground",
              )}
            >
              {t.label}
              <span
                className={cn(
                  "tabular-nums text-xs",
                  isActive ? "text-accent-foreground/75" : "text-faint",
                )}
              >
                {t.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* ── Content ───────────────────────────────────────────────────────── */}
      {active === "all" ? (
        <div>
          <CategoryBlock title="Organizers" items={organizers} onSeeAll={() => setActive("organizers")} />
          <CategoryBlock title="Events" items={eventItems} onSeeAll={() => setActive("events")} />
          <CategoryBlock title="Companies" items={companies} onSeeAll={() => setActive("companies")} />
          <CategoryBlock title="Sponsors" items={sponsors} onSeeAll={() => setActive("sponsors")} />
        </div>
      ) : (
        <section className="mt-6">
          {byCategory[active].length > 0 ? (
            <ItemGrid items={byCategory[active]} />
          ) : (
            <EmptyState />
          )}
        </section>
      )}
    </div>
  );
}

// One category's slice in the "All" overview: header + count + a capped grid,
// with a "See all →" that switches to that category's full view.
function CategoryBlock({
  title,
  items,
  onSeeAll,
}: {
  title: string;
  items: DirectoryItem[];
  onSeeAll: () => void;
}) {
  if (items.length === 0) return null;
  const shown = items.slice(0, OVERVIEW_CAP);
  const more = items.length - shown.length;
  return (
    <section className="mt-8">
      <div className="flex items-baseline justify-between gap-3">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">
          {title} <span className="text-sm font-normal text-faint">{items.length}</span>
        </h2>
        {more > 0 && (
          <button
            type="button"
            onClick={onSeeAll}
            className="shrink-0 rounded-md text-sm font-medium text-accent-strong hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            See all {items.length} →
          </button>
        )}
      </div>
      <ItemGrid items={shown} />
    </section>
  );
}

function ItemGrid({ items }: { items: DirectoryItem[] }) {
  return (
    <div className="mt-4 grid gap-3 sm:grid-cols-2">
      {items.map((it) =>
        it.type === "actor" ? (
          <ActorItemCard key={`a-${it.slug}`} item={it} />
        ) : (
          <EventItemCard key={`e-${it.slug}`} item={it} />
        ),
      )}
    </div>
  );
}

// Inline equivalent of <ActorCard> — same tokens/classes — because this is a
// client component and the card needs the serialized aggregate we passed down.
function ActorItemCard({ item }: { item: DirectoryActorItem }) {
  const websiteHost = item.website
    ? item.website.replace(/^https?:\/\//, "").replace(/\/$/, "")
    : null;

  return (
    <Link
      href={`/o/${item.slug}`}
      className={cn(
        "group block rounded-xl border border-border bg-surface shadow-sm transition-shadow transition-colors duration-150",
        "hover:border-border-strong hover:shadow-md",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background",
      )}
    >
      <div className="flex flex-col gap-3 p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex flex-col gap-1">
            <h3 className="text-lg font-semibold leading-snug tracking-tight text-foreground transition-colors group-hover:text-accent-strong">
              {item.name}
            </h3>
            {item.location && (
              <span className="inline-flex items-center gap-1.5 text-sm text-muted">
                <MapPin aria-hidden="true" className="size-3.5 text-faint" />
                {item.location}
              </span>
            )}
          </div>
          <div className="flex shrink-0 flex-col items-end gap-1">
            {item.example && (
              <Badge tone="outline" size="sm">
                Example
              </Badge>
            )}
            {item.claimed && (
              <Badge tone="success" size="sm">
                Claimed
              </Badge>
            )}
          </div>
        </div>

        {item.kinds.length > 0 && (
          <ul className="flex flex-wrap gap-1.5">
            {item.kinds.map((k) => (
              <li key={k}>
                <Badge tone={KIND_META[k].tone} size="sm">
                  {KIND_META[k].label}
                </Badge>
              </li>
            ))}
          </ul>
        )}

        {item.avgOverall !== null && (
          <div className="flex items-center gap-2">
            <StarRating value={item.avgOverall} size="sm" showValue />
            <span className="text-sm text-muted">
              ({item.reviewCount} {item.reviewCount === 1 ? "review" : "reviews"})
            </span>
          </div>
        )}

        <p className="line-clamp-2 text-sm leading-relaxed text-muted">{item.blurb}</p>

        {item.aka && item.aka.length > 0 && (
          <p className="inline-flex items-start gap-1.5 text-xs leading-relaxed text-faint">
            <History aria-hidden="true" className="mt-0.5 size-3.5 shrink-0" />
            <span>Also known as {item.aka.join(", ")}</span>
          </p>
        )}

        {websiteHost && (
          <span className="inline-flex items-center gap-1.5 text-xs text-faint">
            <Globe aria-hidden="true" className="size-3.5" />
            {websiteHost}
          </span>
        )}
      </div>
    </Link>
  );
}

// Matches the simple event card the directory already used.
function EventItemCard({ item }: { item: DirectoryEventItem }) {
  return (
    <Link
      href={`/e/${item.slug}`}
      className="rounded-xl border border-border bg-surface p-4 transition hover:border-border-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="font-semibold text-foreground">{item.name}</div>
        {item.example && (
          <Badge tone="outline" size="sm" className="shrink-0">
            Example
          </Badge>
        )}
      </div>
      <div className="mt-1 text-sm text-muted">
        {item.dates} · {item.location}
      </div>
    </Link>
  );
}

function EmptyState() {
  return (
    <div className="mt-4 rounded-xl border border-dashed border-border bg-surface p-8 text-center">
      <p className="text-muted">Nothing here yet.</p>
      <Link
        href="/review/new"
        className="mt-3 inline-block rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground hover:opacity-90"
      >
        Add the first review
      </Link>
    </div>
  );
}
