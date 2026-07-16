import "server-only";
import { createClient } from "./supabase/server";
import { actors, events } from "./data";
import type {
  ForumCategory,
  ForumCategoryStat,
  ForumPost,
  ForumThread,
} from "./types";

// ── Linking a discussion to a directory entry ─────────────────────────────────
// A thread may optionally reference an organizer/company/sponsor (an actor) or
// an event by its slug. Actor and event slugs share no namespace, so a single
// `actor_slug` column resolves unambiguously against the static directory data.

export interface LinkedEntry {
  slug: string;
  name: string;
  href: string;
}

/** Everything the new-thread form can link to, grouped for its dropdown. */
export function linkableEntries(): {
  organizers: LinkedEntry[];
  events: LinkedEntry[];
} {
  return {
    organizers: actors.map((a) => ({ slug: a.slug, name: a.name, href: `/o/${a.slug}` })),
    events: events.map((e) => ({ slug: e.slug, name: e.name, href: `/e/${e.slug}` })),
  };
}

/** Resolve a stored slug to a display name + link, or null if it's unknown. */
export function resolveEntry(slug: string | null): LinkedEntry | null {
  if (!slug) return null;
  const actor = actors.find((a) => a.slug === slug);
  if (actor) return { slug, name: actor.name, href: `/o/${slug}` };
  const event = events.find((e) => e.slug === slug);
  if (event) return { slug, name: event.name, href: `/e/${slug}` };
  return null;
}

// ── Row mapping (snake_case DB → camelCase app) ───────────────────────────────

const THREAD_COLS =
  "id, category_id, title, body, actor_slug, created_at, last_activity_at, reply_count, locked, author:profiles(handle)";

type Embedded = { handle: string | null } | { handle: string | null }[] | null;

function handleOf(author: Embedded): string | null {
  if (!author) return null;
  const a = Array.isArray(author) ? author[0] : author;
  return a?.handle ?? null;
}

interface ThreadRow {
  id: string;
  category_id: string;
  title: string;
  body: string;
  actor_slug: string | null;
  created_at: string;
  last_activity_at: string;
  reply_count: number;
  locked: boolean;
  author: Embedded;
}

function mapThread(r: ThreadRow): ForumThread {
  return {
    id: r.id,
    categoryId: r.category_id,
    title: r.title,
    body: r.body,
    actorSlug: r.actor_slug,
    createdAt: r.created_at,
    lastActivityAt: r.last_activity_at,
    replyCount: r.reply_count,
    locked: r.locked,
    authorHandle: handleOf(r.author),
  };
}

// ── Queries ───────────────────────────────────────────────────────────────────
// All reads use the request's Supabase client (anon or the logged-in user). The
// forum tables are public-SELECT under RLS, so reads work logged out.

export async function getCategories(): Promise<ForumCategory[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("forum_categories")
    .select("id, name, description, position")
    .order("position", { ascending: true });
  return (data ?? []) as ForumCategory[];
}

export async function getCategory(id: string): Promise<ForumCategory | null> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("forum_categories")
    .select("id, name, description, position")
    .eq("id", id)
    .maybeSingle();
  return (data as ForumCategory | null) ?? null;
}

/** Categories with derived thread count + latest activity, for the index cards. */
export async function getCategoryStats(): Promise<ForumCategoryStat[]> {
  const supabase = await createClient();
  const [categories, threads] = await Promise.all([
    getCategories(),
    supabase.from("forum_threads").select("category_id, last_activity_at"),
  ]);
  const rows = (threads.data ?? []) as {
    category_id: string;
    last_activity_at: string;
  }[];
  return categories.map((category) => {
    const mine = rows.filter((r) => r.category_id === category.id);
    const lastActivityAt = mine.reduce<string | null>(
      (acc, r) => (acc === null || r.last_activity_at > acc ? r.last_activity_at : acc),
      null,
    );
    return { category, threadCount: mine.length, lastActivityAt };
  });
}

export async function getRecentThreads(limit = 20): Promise<ForumThread[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("forum_threads")
    .select(THREAD_COLS)
    .order("last_activity_at", { ascending: false })
    .limit(limit);
  return ((data ?? []) as ThreadRow[]).map(mapThread);
}

export async function getThreadsByCategory(
  categoryId: string,
  limit = 50,
): Promise<ForumThread[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("forum_threads")
    .select(THREAD_COLS)
    .eq("category_id", categoryId)
    .order("last_activity_at", { ascending: false })
    .limit(limit);
  return ((data ?? []) as ThreadRow[]).map(mapThread);
}

export async function getThreadsByAuthor(
  authorId: string,
  limit = 50,
): Promise<ForumThread[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("forum_threads")
    .select(THREAD_COLS)
    .eq("author_id", authorId)
    .order("created_at", { ascending: false })
    .limit(limit);
  return ((data ?? []) as ThreadRow[]).map(mapThread);
}

export async function getThread(id: string): Promise<ForumThread | null> {
  const supabase = await createClient();
  // An invalid UUID makes Postgres error (not throw); supabase-js returns
  // { data: null }, so a bad id resolves to null → the page 404s.
  const { data } = await supabase
    .from("forum_threads")
    .select(THREAD_COLS)
    .eq("id", id)
    .maybeSingle();
  return data ? mapThread(data as ThreadRow) : null;
}

export async function getPosts(threadId: string): Promise<ForumPost[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("forum_posts")
    .select("id, body, created_at, author:profiles(handle)")
    .eq("thread_id", threadId)
    .order("created_at", { ascending: true });
  return (
    (data ?? []) as {
      id: string;
      body: string;
      created_at: string;
      author: Embedded;
    }[]
  ).map((r) => ({
    id: r.id,
    body: r.body,
    createdAt: r.created_at,
    authorHandle: handleOf(r.author),
  }));
}

// ── Reputation / public profiles (activity-based) ─────────────────────────────
// "Reputation" here is factual contribution volume (discussions started, replies
// posted) — un-gameable and on-brand for an accountability platform, rather than
// a brigadable upvote score. Counts come from the existing tables (no migration).

export interface AuthorStats {
  threadCount: number;
  replyCount: number;
}

/** Contribution counts for a user — the activity-based reputation signal. */
export async function getAuthorStats(authorId: string): Promise<AuthorStats> {
  const supabase = await createClient();
  const [threads, posts] = await Promise.all([
    supabase
      .from("forum_threads")
      .select("id", { count: "exact", head: true })
      .eq("author_id", authorId),
    supabase
      .from("forum_posts")
      .select("id", { count: "exact", head: true })
      .eq("author_id", authorId),
  ]);
  return { threadCount: threads.count ?? 0, replyCount: posts.count ?? 0 };
}

export interface PublicProfile {
  id: string;
  handle: string;
  bio: string | null;
  createdAt: string;
}

/** A user's public profile by handle (case-insensitive), or null if unknown. */
export async function getProfileByHandle(handle: string): Promise<PublicProfile | null> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("profiles")
    .select("id, handle, bio, created_at")
    .eq("handle", handle.toLowerCase())
    .maybeSingle();
  return data
    ? { id: data.id, handle: data.handle, bio: data.bio, createdAt: data.created_at }
    : null;
}
