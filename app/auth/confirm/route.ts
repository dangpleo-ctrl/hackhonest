import { type NextRequest, NextResponse } from "next/server";
import type { EmailOtpType } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/server";
import { safeInternalPath } from "@/lib/safe-redirect";

/**
 * Email confirmation + password-recovery landing route.
 *
 * Supabase can send either a PKCE link (`?code=...`) or a token-hash OTP link
 * (`?token_hash=...&type=...`) depending on the project's email templates, so we
 * accept both. On success we establish the session (the Supabase server client
 * writes the auth cookies) and redirect:
 *   - recovery  -> /auth/reset/update (set a new password)
 *   - signup/email confirmation -> the `next` param, or /forum
 * On failure we send the user to a friendly error page.
 */
export async function GET(request: NextRequest): Promise<Response> {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const tokenHash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  const next = safeInternalPath(searchParams.get("next"));

  const supabase = await createClient();
  let ok = false;

  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    ok = !error;
  } else if (tokenHash && type) {
    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash: tokenHash,
    });
    ok = !error;
  }

  if (ok) {
    const dest = next || (type === "recovery" ? "/auth/reset/update" : "/forum");
    return NextResponse.redirect(new URL(dest, origin));
  }

  return NextResponse.redirect(new URL("/auth/error?reason=confirm", origin));
}
