import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

/**
 * Keeps the Supabase auth session fresh on every navigation. (Next 16 renamed
 * the old `middleware` convention to `proxy`; same request/response contract.)
 */
export async function proxy(request: NextRequest) {
  return updateSession(request);
}

export const config = {
  // Run on pages + API routes, but skip Next internals and static assets.
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
