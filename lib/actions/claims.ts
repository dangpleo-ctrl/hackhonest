"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { getSessionUser, getSessionEmail } from "@/lib/auth";
import { getT } from "@/lib/i18n/server";
import { domainOf, actorWebsiteDomain } from "@/lib/claims";
import { getActor } from "@/lib/data";

export interface ClaimFormState {
  error?: string;
  ok?: boolean;
}

export async function submitClaimAction(
  _prev: ClaimFormState,
  formData: FormData,
): Promise<ClaimFormState> {
  const t = await getT();
  const user = await getSessionUser();
  if (!user) return { error: t.claim.errAuth };

  const actorSlug = String(formData.get("actorSlug") ?? "").trim();
  if (!actorSlug || !getActor(actorSlug)) return { error: t.claim.errActor };

  // domain_match is a hint for the human approver: does the claimant's VERIFIED
  // account email domain match the organizer's listed website domain?
  const email = await getSessionEmail();
  const siteDomain = actorWebsiteDomain(actorSlug);
  const domainMatch = Boolean(email && siteDomain && domainOf(email) === siteDomain);

  const supabase = await createClient();
  const { error } = await supabase.from("actor_claims").insert({
    actor_slug: actorSlug,
    user_id: user.id,
    status: "pending",
    domain_match: domainMatch,
  });
  if (error) {
    if (/duplicate|unique/i.test(error.message)) return { error: t.claim.errAlready };
    return { error: t.claim.errGeneric };
  }
  revalidatePath(`/o/${actorSlug}`);
  return { ok: true };
}

export interface ReplyFormState {
  error?: string;
  ok?: boolean;
}

export async function createReplyAction(
  _prev: ReplyFormState,
  formData: FormData,
): Promise<ReplyFormState> {
  const t = await getT();
  const user = await getSessionUser();
  if (!user) return { error: t.claim.errAuth };

  const actorSlug = String(formData.get("actorSlug") ?? "").trim();
  const reviewId = String(formData.get("reviewId") ?? "").trim();
  const body = String(formData.get("body") ?? "").trim();
  if (!actorSlug || !reviewId) return { error: t.claim.errGeneric };
  if (body.length < 2 || body.length > 5000) return { error: t.claim.errReplyBody };

  const supabase = await createClient();
  // RLS refuses this unless the user holds a VERIFIED claim on the actor.
  const { error } = await supabase.from("review_replies").insert({
    review_id: reviewId,
    actor_slug: actorSlug,
    author_id: user.id,
    body,
  });
  if (error) return { error: t.claim.errReplyDenied };
  revalidatePath(`/o/${actorSlug}`);
  return { ok: true };
}
