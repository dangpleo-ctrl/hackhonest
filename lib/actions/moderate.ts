"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { isAdmin } from "@/lib/admin";

// Set a queue row's status. No-op unless the caller is an admin (RLS enforces the
// same, so this is double-gated); on failure the item simply stays in the queue.
async function setStatus(table: string, id: string, status: string): Promise<void> {
  if (!id || !(await isAdmin())) return;
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
