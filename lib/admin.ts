import "server-only";
import { createClient } from "./supabase/server";
import { actors, events } from "./data";

/** Is the current user an admin? (an admin staff row — checked in the DB) */
export async function isAdmin(): Promise<boolean> {
  const supabase = await createClient();
  const { data } = await supabase.rpc("is_admin");
  return data === true;
}

/**
 * Is the current user at least a moderator? True for admins and moderators.
 * Moderators can work the pending queues but cannot manage the team or delete
 * anything — those limits are enforced in the DB (RLS), this is just the gate
 * for showing the moderation UI.
 */
export async function isModerator(): Promise<boolean> {
  const supabase = await createClient();
  const { data } = await supabase.rpc("is_moderator");
  return data === true;
}

export type StaffRole = "admin" | "moderator";

export interface StaffMember {
  userId: string;
  handle: string | null;
  role: StaffRole;
  createdAt: string;
}

/**
 * The current team (admins + moderators), newest first. Readable only by an
 * admin (RLS on public.admins); a moderator calling this gets an empty list.
 * Admins are exactly the rows in public.admins.
 */
export async function getStaff(): Promise<StaffMember[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("admins")
    .select("user_id, role, created_at, profile:profiles(handle)")
    .order("created_at", { ascending: false });
  return ((data ?? []) as Record<string, unknown>[]).map((r) => ({
    userId: r.user_id as string,
    handle: handleOf(r.profile as Embedded),
    role: (r.role as StaffRole) ?? "admin",
    createdAt: r.created_at as string,
  }));
}

function nameForSlug(slug: string | null | undefined): string | null {
  if (!slug) return null;
  return (
    actors.find((a) => a.slug === slug)?.name ??
    events.find((e) => e.slug === slug)?.name ??
    slug
  );
}

type Embedded = { handle: string | null } | { handle: string | null }[] | null;
function handleOf(a: Embedded): string | null {
  if (!a) return null;
  const x = Array.isArray(a) ? a[0] : a;
  return x?.handle ?? null;
}

export interface PendingReview {
  id: string;
  createdAt: string;
  targetName: string | null;
  overall: number;
  headline: string;
  body: string;
  author: string | null;
  attendedProof: string | null;
  contact: string | null;
}

export async function getPendingReviews(): Promise<PendingReview[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("review_submissions")
    .select("id, created_at, actor_slug, event_slug, overall, headline, body, author, attended_proof, contact")
    .eq("status", "pending")
    .order("created_at", { ascending: false });
  return ((data ?? []) as Record<string, unknown>[]).map((r) => ({
    id: r.id as string,
    createdAt: r.created_at as string,
    targetName: nameForSlug(r.actor_slug as string) ?? nameForSlug(r.event_slug as string),
    overall: r.overall as number,
    headline: r.headline as string,
    body: r.body as string,
    author: (r.author as string) ?? null,
    attendedProof: (r.attended_proof as string) ?? null,
    contact: (r.contact as string) ?? null,
  }));
}

export interface PendingSuggestion {
  id: string;
  createdAt: string;
  type: string;
  name: string;
  website: string | null;
  location: string | null;
  dates: string | null;
  blurb: string | null;
  sourceUrl: string | null;
  submittedBy: string | null;
}

export async function getPendingSuggestions(): Promise<PendingSuggestion[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("entry_suggestions")
    .select("id, created_at, type, name, website, location, dates, blurb, source_url, submitted_by")
    .eq("status", "pending")
    .order("created_at", { ascending: false });
  return ((data ?? []) as Record<string, unknown>[]).map((r) => ({
    id: r.id as string,
    createdAt: r.created_at as string,
    type: r.type as string,
    name: r.name as string,
    website: (r.website as string) ?? null,
    location: (r.location as string) ?? null,
    dates: (r.dates as string) ?? null,
    blurb: (r.blurb as string) ?? null,
    sourceUrl: (r.source_url as string) ?? null,
    submittedBy: (r.submitted_by as string) ?? null,
  }));
}

export interface PendingClaim {
  id: string;
  createdAt: string;
  actorName: string | null;
  handle: string | null;
  domainMatch: boolean;
}

export async function getPendingClaims(): Promise<PendingClaim[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("actor_claims")
    .select("id, created_at, actor_slug, domain_match, claimant:profiles(handle)")
    .eq("status", "pending")
    .order("created_at", { ascending: false });
  return ((data ?? []) as Record<string, unknown>[]).map((c) => ({
    id: c.id as string,
    createdAt: c.created_at as string,
    actorName: nameForSlug(c.actor_slug as string),
    handle: handleOf(c.claimant as Embedded),
    domainMatch: Boolean(c.domain_match),
  }));
}
