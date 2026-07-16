import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { SUPABASE_URL, SUPABASE_ANON_KEY } from "./config";

/**
 * Refreshes the Supabase auth session on each request and forwards the rotated
 * cookies to both the request (for this render) and the response (for the
 * browser). Without it, an expired access token would silently sign the user
 * out mid-session.
 *
 * Short-circuits for anonymous visitors (no `sb-*` cookie) so the common case —
 * a logged-out reader browsing the public forum — never pays for an auth
 * round-trip. Also no-ops when Supabase isn't configured (fresh clone, no env).
 */
export async function updateSession(request: NextRequest): Promise<NextResponse> {
  let response = NextResponse.next({ request });
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) return response;

  const hasAuthCookie = request.cookies
    .getAll()
    .some((c) => c.name.startsWith("sb-"));
  if (!hasAuthCookie) return response;

  const supabase = createServerClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        for (const { name, value } of cookiesToSet) {
          request.cookies.set(name, value);
        }
        response = NextResponse.next({ request });
        for (const { name, value, options } of cookiesToSet) {
          response.cookies.set(name, value, options);
        }
      },
    },
  });

  // Per Supabase's SSR guidance: do not run code between createServerClient and
  // getUser() — a stray await here can desync the session refresh.
  await supabase.auth.getUser();
  return response;
}
