"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { isAdmin, isModerator, type StaffRole } from "@/lib/admin";

// ── Queue moderation (admins + moderators) ────────────────────────────────────
// Set a queue row's status. No-op unless the caller is at least a moderator. RLS
// enforces the real limits: an admin may re-decide any row, a moderator may only
// move a PENDING row to a decided status. On failure the item stays in the queue.
async function setStatus(table: string, id: string, status: string): Promise<void> {
  if (!id || !(await isModerator())) return;
  const supabase = await createClient();
  await supabase.from(table).update({ status }).eq("id", id);
  revalidatePath("/moderate");
}

export async function moderateReviewAction(formData: FormData): Promise<void> {
  await setStatus(
    "review_submissions",
    String(formData.get("id") ?? ""),
    formData.get("action") === "approve" ? "published" : "rejected",
  );
}

export async function moderateSuggestionAction(formData: FormData): Promise<void> {
  await setStatus(
    "entry_suggestions",
    String(formData.get("id") ?? ""),
    formData.get("action") === "approve" ? "accepted" : "rejected",
  );
}

export async function moderateClaimAction(formData: FormData): Promise<void> {
  await setStatus(
    "actor_claims",
    String(formData.get("id") ?? ""),
    formData.get("action") === "approve" ? "verified" : "rejected",
  );
}

// ── Team management (admins only) ─────────────────────────────────────────────
// Appoint or remove staff. Every action re-checks isAdmin() server-side; RLS on
// public.admins is the real gate, so a moderator can never reach these even by
// forging a request.

function normalizeRole(v: FormDataEntryValue | null): StaffRole {
  return v === "admin" ? "admin" : "moderator";
}

export type AddStaffState = {
  ok?: boolean;
  error?: "not_admin" | "no_handle" | "not_found" | "failed";
  addedHandle?: string;
  addedRole?: StaffRole;
};

/**
 * Appoint the account with the given username as a moderator (or admin). Looks
 * the username up in profiles, then upserts the staff row. Returns a small state
 * object so the form can show inline success / "no such username" feedback.
 */
export async function addStaffAction(
  _prev: AddStaffState,
  formData: FormData,
): Promise<AddStaffState> {
  if (!(await isAdmin())) return { error: "not_admin" };

  const handle = String(formData.get("handle") ?? "")
    .trim()
    .replace(/^@/, "")
    .toLowerCase();
  const role = normalizeRole(formData.get("role"));
  if (!handle) return { error: "no_handle" };

  const supabase = await createClient();
  const { data: profile } = await supabase
    .from("profiles")
    .select("id")
    .eq("handle", handle)
    .maybeSingle();
  if (!profile?.id) return { error: "not_found" };

  const { error } = await supabase
    .from("admins")
    .upsert({ user_id: profile.id as string, role }, { onConflict: "user_id" });
  if (error) return { error: "failed" };

  revalidatePath("/moderate");
  return { ok: true, addedHandle: handle, addedRole: role };
}

/** Change an existing staff member's role (admin ⇄ moderator). Admin-only. */
export async function setStaffRoleAction(formData: FormData): Promise<void> {
  if (!(await isAdmin())) return;
  const userId = String(formData.get("userId") ?? "");
  if (!userId) return;
  const role = normalizeRole(formData.get("role"));
  const supabase = await createClient();
  await supabase.from("admins").update({ role }).eq("user_id", userId);
  revalidatePath("/moderate");
}

/** Remove a staff member (revokes their moderator/admin access). Admin-only. */
export async function removeStaffAction(formData: FormData): Promise<void> {
  if (!(await isAdmin())) return;
  const userId = String(formData.get("userId") ?? "");
  if (!userId) return;
  const supabase = await createClient();
  await supabase.from("admins").delete().eq("user_id", userId);
  revalidatePath("/moderate");
}
