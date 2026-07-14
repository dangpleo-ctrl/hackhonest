import type { MetadataRoute } from "next";
import { actors, events } from "@/lib/data";

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://hackhonest.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticPaths = ["", "/directory", "/how-it-works", "/trust", "/about", "/tos", "/review/new"];
  return [
    ...staticPaths.map((p) => ({ url: `${SITE_URL}${p}`, lastModified: now })),
    ...actors.map((a) => ({ url: `${SITE_URL}/o/${a.slug}`, lastModified: now })),
    ...events.map((e) => ({ url: `${SITE_URL}/e/${e.slug}`, lastModified: now })),
  ];
}
