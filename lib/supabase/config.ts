// Shared Supabase connection config.
//
// The anon key is a *publishable* key — every table is guarded by row-level
// security — so it is safe to use wherever it is read. We prefer the
// NEXT_PUBLIC_* names (so a browser client can be added later for realtime) and
// fall back to the server-only names the review/suggest routes already use.
// That fallback is deliberate: the forum runs in production on the Supabase env
// that is ALREADY configured, with no new Vercel variables required.
export const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? process.env.SUPABASE_URL ?? "";
export const SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? process.env.SUPABASE_ANON_KEY ?? "";

/** True when both URL + key are present, so callers can degrade gracefully. */
export const supabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);
