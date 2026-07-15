"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getT } from "@/lib/i18n/server";

const HANDLE_RE = /^[a-z0-9_]{3,24}$/;

export interface AuthState {
  error?: string;
  /** Set when signup succeeded but the project requires email confirmation. */
  confirmEmail?: boolean;
}

/** Only allow same-origin relative redirects, defaulting to the forum. */
function safeNext(raw: FormDataEntryValue | null): string {
  const n = typeof raw === "string" ? raw : "";
  return n.startsWith("/") && !n.startsWith("//") ? n : "/forum";
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

  redirect(safeNext(formData.get("next")));
}

export async function signUpAction(
  _prev: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const t = await getT();
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const handle = String(formData.get("handle") ?? "").trim().toLowerCase();
  if (!email.includes("@")) return { error: t.auth.errEmail };
  if (password.length < 8) return { error: t.auth.errPassword };
  if (!HANDLE_RE.test(handle)) return { error: t.auth.errHandle };

  const supabase = await createClient();

  // Pre-check availability so a taken handle gives a clean message instead of a
  // trigger-level unique violation. The DB constraint is still the backstop.
  const { data: taken } = await supabase
    .from("profiles")
    .select("id")
    .eq("handle", handle)
    .maybeSingle();
  if (taken) return { error: t.auth.errHandleTaken };

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { handle } }, // read by the handle_new_user() trigger
  });
  if (error) {
    if (/registered|already/i.test(error.message)) return { error: t.auth.errEmailInUse };
    if (/duplicate|unique|profiles/i.test(error.message)) return { error: t.auth.errHandleTaken };
    return { error: t.auth.errGeneric };
  }
  // No session means the project requires email confirmation first.
  if (!data.session) return { confirmEmail: true };

  redirect(safeNext(formData.get("next")));
}

export async function signOutAction(): Promise<void> {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}
