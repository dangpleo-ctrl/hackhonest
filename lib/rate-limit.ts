import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";

export type RateAction = "signup" | "forum_thread" | "forum_reply" | "review";

interface Limit {
  windowSeconds: number;
  maxPerIp: number;
  maxPerAccount: number;
}

// Per-hour ceilings. Signup and review are anonymous (no account yet), so their
// per-account ceiling is effectively unused; the per-IP ceiling is what bites.
export const RATE_LIMITS: Record<RateAction, Limit> = {
  signup: { windowSeconds: 3600, maxPerIp: 5, maxPerAccount: 5 },
  forum_thread: { windowSeconds: 3600, maxPerIp: 12, maxPerAccount: 6 },
  forum_reply: { windowSeconds: 3600, maxPerIp: 40, maxPerAccount: 30 },
  review: { windowSeconds: 3600, maxPerIp: 6, maxPerAccount: 6 },
};

/**
 * Client IP from proxy headers. Vercel (and most proxies) set x-forwarded-for
 * to a comma-separated list, client first. Falls back to x-real-ip.
 */
export function clientIp(
  headers: { get(name: string): string | null } | null | undefined,
): string | null {
  if (!headers) return null;
  const xff = headers.get("x-forwarded-for");
  if (xff) {
    const first = xff.split(",")[0]?.trim();
    if (first) return first;
  }
  const real = headers.get("x-real-ip");
  return real ? real.trim() : null;
}

/**
 * Windowed rate-limit check backed by the `rate_events` table and the
 * `check_rate_limit` SECURITY DEFINER function (migration 0009). Returns true
 * when the action should be BLOCKED.
 *
 * FAILS OPEN (returns false) on any store error — a missing function, a
 * connectivity blip, or an unconfigured deploy must never lock out legitimate
 * users. Availability wins over perfect enforcement for this layer.
 */
export async function isRateLimited(
  supabase: Pick<SupabaseClient, "rpc">,
  action: RateAction,
  { ip, accountId }: { ip: string | null; accountId: string | null },
): Promise<boolean> {
  // Nothing to key on — can't attribute the action, so don't block it.
  if (!ip && !accountId) return false;

  const limit = RATE_LIMITS[action];
  try {
    const { data, error } = await supabase.rpc("check_rate_limit", {
      p_action: action,
      p_ip: ip,
      p_account: accountId,
      p_window_seconds: limit.windowSeconds,
      p_max_per_ip: limit.maxPerIp,
      p_max_per_account: limit.maxPerAccount,
    });
    if (error) {
      console.warn(
        `[rate-limit] store error for "${action}" — failing open:`,
        error.message,
      );
      return false;
    }
    return data === true;
  } catch (err) {
    console.warn(
      `[rate-limit] unexpected error for "${action}" — failing open:`,
      err,
    );
    return false;
  }
}
