import "server-only";

const SITEVERIFY_URL =
  "https://challenges.cloudflare.com/turnstile/v0/siteverify";

export interface TurnstileResult {
  /** True when the caller may proceed. */
  success: boolean;
  /**
   * True when no secret is configured, so verification was skipped and success
   * is a graceful-degradation pass (not a real check). Callers can log this.
   */
  skipped?: boolean;
  errorCodes?: string[];
}

/**
 * Verify a Cloudflare Turnstile token server-side.
 *
 * Posture:
 * - Secret configured + token valid  -> success: true
 * - Secret configured + token missing/invalid/network failure -> success: false
 *   (the caller MUST reject the action — this is the anti-bot enforcement point)
 * - Secret NOT configured -> success: true, skipped: true
 *   A deploy that hasn't wired TURNSTILE_SECRET_KEY yet keeps working instead of
 *   hard-blocking every signup/post. This mirrors the review route, which accepts
 *   when the store isn't configured. Set the secret in production to enforce.
 *
 * Turnstile tokens are single-use: each token may be redeemed at siteverify
 * exactly once. Do not verify the same token twice (e.g. here AND via Supabase's
 * own CAPTCHA setting) — the second redemption always fails.
 */
export async function verifyTurnstile(
  token: string | null | undefined,
  ip?: string | null,
): Promise<TurnstileResult> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    console.warn(
      "[turnstile] TURNSTILE_SECRET_KEY not set — skipping verification (set it in production to enforce the anti-bot check)",
    );
    return { success: true, skipped: true };
  }
  if (!token) return { success: false, errorCodes: ["missing-input-response"] };

  try {
    const body = new URLSearchParams();
    body.set("secret", secret);
    body.set("response", token);
    if (ip) body.set("remoteip", ip);

    const res = await fetch(SITEVERIFY_URL, {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body,
      cache: "no-store",
    });

    if (!res.ok) {
      // siteverify itself failed. A configured check fails CLOSED so a bad token
      // can't slip through during a Cloudflare hiccup.
      console.error("[turnstile] siteverify returned HTTP", res.status);
      return { success: false, errorCodes: [`http-${res.status}`] };
    }

    const data = (await res.json()) as {
      success?: boolean;
      "error-codes"?: string[];
    };
    return {
      success: data.success === true,
      errorCodes: data["error-codes"],
    };
  } catch (err) {
    console.error("[turnstile] siteverify request failed:", err);
    return { success: false, errorCodes: ["fetch-failed"] };
  }
}
