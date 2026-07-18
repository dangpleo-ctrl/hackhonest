import type { MetadataRoute } from "next";
import { SITE_URL } from "./sitemap";

// Default to noindex until launch. Set NEXT_PUBLIC_PUBLIC_LAUNCH=1 (or change
// `disallow` to `allow: "/"`) to let search engines in.
const PUBLIC_LAUNCH = process.env.NEXT_PUBLIC_PUBLIC_LAUNCH === "1";

export default function robots(): MetadataRoute.Robots {
  return PUBLIC_LAUNCH
    ? { rules: { userAgent: "*", allow: "/" }, sitemap: `${SITE_URL}/sitemap.xml` }
    : { rules: { userAgent: "*", disallow: "/" } };
}
