/**
 * Sanitize a post-auth `next` redirect target to a SAME-ORIGIN path, else "".
 *
 * Must start with "/" but not "//" or "/\": browsers normalize a backslash to a
 * forward slash, so "/\evil.com" would resolve to the protocol-relative
 * "//evil.com" → an off-origin open redirect (a phishing primitive in the auth
 * flow). Callers apply their own default (e.g. `|| "/forum"`).
 */
export function safeInternalPath(raw: unknown): string {
  const n = typeof raw === "string" ? raw.trim() : "";
  return /^\/(?![/\\])/.test(n) ? n : "";
}
