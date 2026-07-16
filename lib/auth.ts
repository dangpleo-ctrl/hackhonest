import "server-only";
import { createClient } from "./supabase/server";

export interface SessionUser {
  id: string;
  /** Public pseudonym shown on posts. Never the email. */
  handle: string;
  /** Profile creation timestamp (ISO), or null if the profile row is missing. */
  createdAt: string | null;
}

/**
 * The currently signed-in user and their public handle, or null when logged
 * out. Uses getUser() — which validates the token against the auth server —
 * rather than getSession(), so the result is safe to gate rendering on.
 */
export async function getSessionUser(): Promise<SessionUser | null> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: profile } = await supabase
    .from("profiles")
    .select("handle, created_at")
    .eq("id", user.id)
    .maybeSingle();

  return {
    id: user.id,
    handle: profile?.handle ?? "user",
    createdAt: profile?.created_at ?? null,
  };
}

/**
 * The signed-in user's PRIVATE email — for the owner's own account view only.
 * Deliberately kept OFF SessionUser so it can never be accidentally passed to a
 * client component (and serialized into the page) alongside the public handle.
 */
export async function getSessionEmail(): Promise<string | null> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user?.email ?? null;
}
