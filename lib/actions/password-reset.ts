"use server";

import { createClient } from "@/lib/supabase/server";
import { getT } from "@/lib/i18n/server";
import { getOrigin } from "@/lib/site-url";

export interface ResetRequestState {
  error?: string;
  /** Set once the "if the account exists, we sent a link" message should show. */
  sent?: boolean;
}

export interface UpdatePasswordState {
  error?: string;
  ok?: boolean;
}

/**
 * Send a password-reset email. Always reports success (even for an unknown
 * email) so the form can't be used to probe which addresses have accounts.
 */
export async function requestPasswordResetAction(
  _prev: ResetRequestState,
  formData: FormData,
): Promise<ResetRequestState> {
  const t = await getT();
  const email = String(formData.get("email") ?? "").trim();
  if (!email.includes("@")) return { error: t.auth.errEmail };

  const supabase = await createClient();
  const origin = await getOrigin();
  // The recovery link lands on /auth/confirm, which establishes the session and
  // forwards to /auth/reset/update.
  await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/confirm?next=${encodeURIComponent("/auth/reset/update")}`,
  });
  // Do not branch on the result — same response for existing and unknown emails.
  return { sent: true };
}

/**
 * Set a new password for the currently-recovering user. Requires the session
 * established by the recovery link (handled by /auth/confirm).
 */
export async function updatePasswordAction(
  _prev: UpdatePasswordState,
  formData: FormData,
): Promise<UpdatePasswordState> {
  const t = await getT();
  const password = String(formData.get("password") ?? "");
  if (password.length < 8) return { error: t.auth.errPassword };

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: t.auth.errResetLinkInvalid };

  const { error } = await supabase.auth.updateUser({ password });
  if (error) return { error: t.auth.errGeneric };

  return { ok: true };
}
