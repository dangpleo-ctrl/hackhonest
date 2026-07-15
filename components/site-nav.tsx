"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, X, ShieldCheck, PenLine } from "lucide-react";
import { brand } from "@/lib/brand";
import { LOCALES } from "@/lib/i18n";
import { useT, useLocale, useSetLocale } from "@/lib/i18n/locale-provider";
import { buttonVariants } from "./ui/button";
import { cn } from "./ui/cn";

const WRITE_REVIEW_HREF = "/review/new";

/** Compact English ⇄ Tiếng Việt switch. Keyboard-operable; each option is a button. */
function LanguageToggle({ className }: { className?: string }) {
  const t = useT();
  const locale = useLocale();
  const setLocale = useSetLocale();
  const switchLabel: Record<(typeof LOCALES)[number], string> = {
    en: t.nav.switchToEnglish,
    vi: t.nav.switchToVietnamese,
  };
  return (
    <div
      role="group"
      aria-label={t.nav.languageGroup}
      className={cn(
        "inline-flex items-center rounded-full border border-border bg-surface p-0.5 text-xs font-semibold",
        className,
      )}
    >
      {LOCALES.map((loc) => {
        const active = locale === loc;
        return (
          <button
            key={loc}
            type="button"
            aria-pressed={active}
            aria-label={switchLabel[loc]}
            onClick={() => setLocale(loc)}
            className={cn(
              "rounded-full px-2.5 py-1 uppercase tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
              active
                ? "bg-accent text-accent-foreground"
                : "text-muted hover:text-foreground",
            )}
          >
            {loc}
          </button>
        );
      })}
    </div>
  );
}

/** Sticky top navigation with a mobile drawer. */
export function SiteNav() {
  const t = useT();
  const [open, setOpen] = React.useState(false);

  const navLinks = [
    { label: t.nav.directory, href: "/directory" },
    { label: t.nav.howItWorks, href: "/how-it-works" },
    { label: t.nav.trust, href: "/trust" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-surface/90 backdrop-blur supports-[backdrop-filter]:bg-surface/75">
      <nav
        aria-label={t.nav.ariaPrimary}
        className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-4 sm:px-6"
      >
        {/* Brand */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-md text-lg font-bold tracking-tight text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
          onClick={() => setOpen(false)}
        >
          <ShieldCheck aria-hidden="true" className="size-6 text-accent" />
          <span>{brand.name}</span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="inline-flex h-9 items-center rounded-md px-3 text-sm font-medium text-muted transition-colors hover:bg-surface-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop language toggle + CTA */}
        <div className="hidden items-center gap-3 md:flex">
          <LanguageToggle />
          <Link
            href={WRITE_REVIEW_HREF}
            className={buttonVariants({ variant: "primary", size: "md" })}
          >
            <PenLine aria-hidden="true" />
            {t.nav.writeReview}
          </Link>
        </div>

        {/* Mobile: language toggle stays visible next to the menu button */}
        <div className="flex items-center gap-2 md:hidden">
          <LanguageToggle />
          <button
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-md text-foreground transition-colors hover:bg-surface-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? (
              <X aria-hidden="true" className="size-5" />
            ) : (
              <Menu aria-hidden="true" className="size-5" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div
        id="mobile-menu"
        hidden={!open}
        className="border-t border-border bg-surface md:hidden"
      >
        <ul className="mx-auto flex w-full max-w-6xl flex-col gap-1 px-4 py-3 sm:px-6">
          {navLinks.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                onClick={() => setOpen(false)}
                className="block rounded-md px-3 py-2.5 text-base font-medium text-foreground transition-colors hover:bg-surface-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
              >
                {l.label}
              </Link>
            </li>
          ))}
          <li className="pt-2">
            <Link
              href={WRITE_REVIEW_HREF}
              onClick={() => setOpen(false)}
              className={buttonVariants({
                variant: "primary",
                size: "lg",
                className: "w-full",
              })}
            >
              <PenLine aria-hidden="true" />
              {t.nav.writeReview}
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
