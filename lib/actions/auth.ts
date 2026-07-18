"use server";

import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { getT } from "@/lib/i18n/server";
import { safeInternalPath } from "@/lib/safe-redirect";
import { verifyTurnstile } from "@/lib/turnstile";
import { isDisposableEmail } from "@/lib/disposable-email-domains";
import { isRateLimited, clientIp } from "@/lib/rate-limit";
import { getOrigin } from "@/lib/site-url";

const HANDLE_RE = /^[a-z0-9_]{3,24}$/;
// Standard Cloudflare Turnstile field name (see components/turnstile.tsx). The
// server can't import that constant from the "use client" module, so it's inline.
const CAPTCHA_FIELD = "cf-turnstile-response";

export interface AuthState {
  error?: string;
  /** Set when signup succeeded but the project requires email confirmation. */
  confirmEmail?: boolean;
}

export async function signInAction(
  _prev: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const t = await getT();
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  if (!email.includes("@")) return { error: t.auth.errEmail };
  if (password.length < 8) return { error: t.auth.errPassword };

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return { error: t.auth.errInvalidCredentials };

  redirect(safeInternalPath(formData.get("next")) || "/forum");
}

export async function signUpAction(
  _prev: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const t = await getT();
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const handle = String(formData.get("handle") ?? "").trim().toLowerCase();
  const captchaToken = String(formData.get(CAPTCHA_FIELD) ?? "");
  if (!email.includes("@")) return { error: t.auth.errEmail };
  if (password.length < 8) return { error: t.auth.errPassword };
  if (!HANDLE_RE.test(handle)) return { error: t.auth.errHandle };

  // Reject throwaway inboxes before spending a verification round-trip.
  if (isDisposableEmail(email)) return { error: t.auth.errDisposableEmail };

  const ip = clientIp(await headers());

  // Anti-bot: reject when the Turnstile token doesn't verify. (Skipped, i.e.
  // passes, only when TURNSTILE_SECRET_KEY isn't configured — see verifyTurnstile.)
  const captcha = await verifyTurnstile(captchaToken, ip);
  if (!captcha.success) return { error: t.auth.errCaptcha };

  const supabase = await createClient();

  // Per-IP signup throttle (fails open if the store is unavailable).
  if (await isRateLimited(supabase, "signup", { ip, accountId: null })) {
    return { error: t.auth.errRateLimited };
  }

  // Pre-check availability so a taken handle gives a clean message instead of a
  // trigger-level unique violation. The DB constraint is still the backstop.
  const { data: taken } = await supabase
    .from("profiles")
    .select("id")
    .eq("handle", handle)
    .maybeSingle();
  if (taken) return { error: t.auth.errHandleTaken };

  const origin = await getOrigin();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { handle }, // read by the handle_new_user() trigger
      // Land email confirmations on our /auth/confirm route.
      emailRedirectTo: origin
        ? `${origin}/auth/confirm?next=${encodeURIComponent("/forum")}`
        : undefined,
      // Handed to Supabase too, but only used if the project's OWN CAPTCHA
      // setting is enabled — keep that OFF. We already verified this single-use
      // token above; enabling Supabase's check would double-spend it and break
      // signup.
      captchaToken: captchaToken || undefined,
    },
  });
  if (error) {
    if (/registered|already/i.test(error.message)) return { error: t.auth.errEmailInUse };
    // A handle-collision race surfaces as the trigger's unique violation, which
    // GoTrue reports as "Database error saving new user".
    if (/duplicate|unique|profiles|database error saving new user/i.test(error.message))
      return { error: t.auth.errHandleTaken };
    return { error: t.auth.errGeneric };
  }
  // No session means the project requires email confirmation first.
  if (!data.session) return { confirmEmail: true };

  redirect(safeInternalPath(formData.get("next")) || "/forum");
}

export async function signOutAction(): Promise<void> {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}
