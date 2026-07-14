import * as React from "react";
import Link from "next/link";
import { ShieldCheck, MapPin } from "lucide-react";
import { brand } from "@/lib/brand";

interface FooterLink {
  label: string;
  href: string;
}

const FOOTER_SECTIONS: { heading: string; links: FooterLink[] }[] = [
  {
    heading: "Explore",
    links: [
      { label: "Directory", href: "/directory" },
      { label: "Write a review", href: "/review/new" },
    ],
  },
  {
    heading: "Trust",
    links: [
      { label: "How it works", href: "/how-it-works" },
      { label: "Trust & safety", href: "/trust" },
    ],
  },
];

/** Site footer: neutral-host posture, region, links, and the "not official" disclaimer. */
export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-16 border-t border-border bg-surface">
      <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
        <div className="flex flex-col gap-10 md:flex-row md:justify-between">
          {/* Brand + posture */}
          <div className="max-w-md">
            <div className="mb-3 inline-flex items-center gap-2 text-lg font-bold tracking-tight text-foreground">
              <ShieldCheck aria-hidden="true" className="size-6 text-accent" />
              <span>{brand.name}</span>
            </div>
            <p className="text-sm leading-relaxed text-muted">{brand.posture}</p>
            <p className="mt-4 inline-flex items-center gap-1.5 text-sm text-faint">
              <MapPin aria-hidden="true" className="size-4" />
              {brand.region}
            </p>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-8 sm:gap-16">
            {FOOTER_SECTIONS.map((section) => (
              <nav key={section.heading} aria-label={section.heading}>
                <h2 className="mb-3 text-xs font-semibold uppercase tracking-wide text-faint">
                  {section.heading}
                </h2>
                <ul className="flex flex-col gap-2.5">
                  {section.links.map((l) => (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        className="text-sm text-muted transition-colors hover:text-accent-strong focus-visible:outline-none focus-visible:underline"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        {/* Disclaimer + copyright */}
        <div className="mt-10 flex flex-col gap-3 border-t border-border pt-6 text-xs leading-relaxed text-faint sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-2xl">
            This is not the organizer&apos;s official page. {brand.name} hosts
            independent, first-hand reviews from verified participants. Every
            number on this site is a count of what real attendees reported.
          </p>
          <p className="shrink-0">
            © {year} {brand.name}
          </p>
        </div>
      </div>
    </footer>
  );
}
