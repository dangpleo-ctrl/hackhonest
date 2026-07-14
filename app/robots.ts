import type { MetadataRoute } from "next";
import { SITE_URL } from "./sitemap";

// PRE-LAUNCH SAFE DEFAULT: noindex. This deploy is a working preview for review, and it
// carries critical, first-hand content about named organizers. Keep search engines out
// until the public-launch decision (and local-counsel read) is made. To go public, flip
// `disallow` back to `allow: "/"` — that one line is the launch switch.
const PUBLIC_LAUNCH = process.env.NEXT_PUBLIC_PUBLIC_LAUNCH === "1";

export default function robots(): MetadataRoute.Robots {
  return PUBLIC_LAUNCH
    ? { rules: { userAgent: "*", allow: "/" }, sitemap: `${SITE_URL}/sitemap.xml` }
    : { rules: { userAgent: "*", disallow: "/" } };
}
