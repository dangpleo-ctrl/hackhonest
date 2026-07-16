import "server-only";
import { createClient } from "./supabase/server";
import { actors } from "./data";

type Embedded = { handle: string | null } | { handle: string | null }[] | null;
function handleOf(author: Embedded): string | null {
  if (!author) return null;
  const a = Array.isArray(author) ? author[0] : author;
  return a?.handle ?? null;
}

/** The verified owner's handle for an actor page, or null if unclaimed. */
export async function getActorOwnerHandle(actorSlug: string): Promise<string | null> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("actor_claims")
    .select("owner:profiles(handle)")
    .eq("actor_slug", actorSlug)
    .eq("status", "verified")
    .maybeSingle();
  return handleOf((data as { owner: Embedded } | null)?.owner ?? null);
}

export type ClaimStatus = "verified" | "pending" | "rejected" | null;

/** The current user's claim status for an actor (any status), or null. */
export async function getViewerClaimStatus(
  actorSlug: string,
  userId: string,
): Promise<ClaimStatus> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("actor_claims")
    .select("status")
    .eq("actor_slug", actorSlug)
    .eq("user_id", userId)
    .maybeSingle();
  return ((data as { status: ClaimStatus } | null)?.status ?? null) as ClaimStatus;
}

export interface DynamicReply {
  reviewId: string;
  handle: string | null;
  body: string;
  createdAt: string;
}

/** Organizer replies for an actor, keyed by the review they answer (first per review). */
export async function getRepliesForActor(
  actorSlug: string,
): Promise<Map<string, DynamicReply>> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("review_replies")
    .select("review_id, body, created_at, author:profiles(handle)")
    .eq("actor_slug", actorSlug)
    .order("created_at", { ascending: true });
  const map = new Map<string, DynamicReply>();
  for (const r of (data ?? []) as {
    review_id: string;
    body: string;
    created_at: string;
    author: Embedded;
  }[]) {
    if (!map.has(r.review_id)) {
      map.set(r.review_id, {
        reviewId: r.review_id,
        handle: handleOf(r.author),
        body: r.body,
        createdAt: r.created_at,
      });
    }
  }
  return map;
}

/** Registrable domain from a URL or email host, lowercased (drops scheme/www). */
export function domainOf(value: string | undefined | null): string | null {
  if (!value) return null;
  let host = value.trim().toLowerCase();
  host = host.replace(/^https?:\/\//, "").replace(/^mailto:/, "");
  host = host.split("@").pop() ?? host; // email local part → domain
  host = host.split("/")[0]; // url path → host
  host = host.replace(/^www\./, "");
  return host || null;
}

/** The actor's website domain (for the claim domain-match hint), or null. */
export function actorWebsiteDomain(actorSlug: string): string | null {
  const actor = actors.find((a) => a.slug === actorSlug);
  return domainOf(actor?.website);
}
