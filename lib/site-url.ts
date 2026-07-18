import "server-only";
import { headers } from "next/headers";

/**
 * The absolute origin of the current request (e.g. https://hackhonest.com or
 * http://localhost:3400), used to build the redirect target in confirmation and
 * password-reset emails. Prefers an explicit NEXT_PUBLIC_SITE_URL when set,
 * otherwise derives it from the forwarding headers Vercel provides.
 */
export async function getOrigin(): Promise<string> {
  const configured = process.env.NEXT_PUBLIC_SITE_URL;
  if (configured) return configured.replace(/\/+$/, "");

  const h = await headers();
  const host = h.get("x-forwarded-host") ?? h.get("host");
  if (!host) return "";
  const proto =
    h.get("x-forwarded-proto") ??
    (host.startsWith("localhost") || host.startsWith("127.0.0.1")
      ? "http"
      : "https");
  return `${proto}://${host}`;
}
