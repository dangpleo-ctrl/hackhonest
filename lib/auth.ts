import "server-only";
import { createClient } from "./supabase/server";

export interface SessionUser {
  id: string;
  email: string | null;
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
    email: user.email ?? null,
    handle: profile?.handle ?? "user",
    createdAt: profile?.created_at ?? null,
  };
}
