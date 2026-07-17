"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, X, Check, PenLine, UserCircle2, Bell } from "lucide-react";
import { brand } from "@/lib/brand";
import { LOCALES } from "@/lib/i18n";
import { useT, useLocale, useSetLocale } from "@/lib/i18n/locale-provider";
import { buttonVariants } from "./ui/button";
import { cn } from "./ui/cn";

const WRITE_REVIEW_HREF = "/review/new";

/** The signed-in identity the nav needs — just the public handle, or null. */
export interface NavUser {
  handle: string;
}

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
export function SiteNav({
  user,
  unreadCount = 0,
  isStaff = false,
}: {
  user: NavUser | null;
  unreadCount?: number;
  /** True for admins + moderators — surfaces the Moderate link. */
  isStaff?: boolean;
}) {
  const t = useT();
  const [open, setOpen] = React.useState(false);

  const navLinks = [
    { label: t.nav.directory, href: "/directory" },
    { label: t.forum.navLink, href: "/forum" },
    { label: t.nav.addEntry, href: "/suggest" },
    { label: t.nav.howItWorks, href: "/how-it-works" },
    { label: t.nav.trust, href: "/trust" },
    ...(isStaff ? [{ label: t.nav.moderate, href: "/moderate" }] : []),
  ];

  // The account / log-in affordance, shared by desktop + drawer.
  const account = user ? (
    <Link
      href="/account"
      onClick={() => setOpen(false)}
      className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-sm font-medium text-muted transition-colors hover:bg-surface-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
    >
      <UserCircle2 aria-hidden="true" className="size-5 text-faint" />
      <span className="max-w-[9rem] truncate">{user.handle}</span>
    </Link>
  ) : (
    <Link
      href="/login"
      onClick={() => setOpen(false)}
      className="inline-flex h-9 items-center rounded-md px-3 text-sm font-medium text-muted transition-colors hover:bg-surface-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
    >
      {t.auth.loginTitle}
    </Link>
  );

  // Notification bell — signed-in only. Green count badge (on-brand: a reply is
  // good news), capped at "9+". Shared by desktop + mobile top bar.
  const bell = user ? (
    <Link
      href="/notifications"
      onClick={() => setOpen(false)}
      aria-label={
        unreadCount > 0
          ? `${t.notifications.navAria} (${unreadCount})`
          : t.notifications.navAria
      }
      className="relative inline-flex size-9 items-center justify-center rounded-md text-muted transition-colors hover:bg-surface-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
    >
      <Bell aria-hidden="true" className="size-5" />
      {unreadCount > 0 && (
        <span className="absolute -right-0.5 -top-0.5 inline-flex min-w-[1.125rem] items-center justify-center rounded-full bg-accent px-1 text-[0.625rem] font-bold leading-none text-accent-foreground ring-2 ring-surface">
          {unreadCount > 9 ? "9+" : unreadCount}
        </span>
      )}
    </Link>
  ) : null;

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-surface/90 backdrop-blur supports-[backdrop-filter]:bg-surface/75">
      <nav
        aria-label={t.nav.ariaPrimary}
        className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-3 px-4 sm:px-6"
      >
        {/* Brand */}
        <Link
          href="/"
          className="inline-flex items-center gap-2.5 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
          onClick={() => setOpen(false)}
        >
          <span
            aria-hidden="true"
            className="flex size-7 items-center justify-center rounded-md bg-accent text-accent-foreground shadow-sm"
          >
            <Check className="size-[1.15rem]" strokeWidth={3} />
          </span>
          <span className="text-lg font-bold tracking-tight text-foreground">{brand.name}</span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-0.5 lg:flex">
          {navLinks.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="inline-flex h-9 items-center rounded-md px-2.5 text-sm font-medium text-muted transition-colors hover:bg-surface-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop language toggle + account + CTA */}
        <div className="hidden items-center gap-2 lg:flex">
          <LanguageToggle />
          {bell}
          {account}
          <Link
            href={WRITE_REVIEW_HREF}
            className={buttonVariants({ variant: "primary", size: "md" })}
          >
            <PenLine aria-hidden="true" />
            {t.nav.writeReview}
          </Link>
        </div>

        {/* Mobile: language toggle stays visible next to the menu button */}
        <div className="flex items-center gap-2 lg:hidden">
          <LanguageToggle />
          {bell}
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
        className="border-t border-border bg-surface lg:hidden"
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
          <li className="mt-1 border-t border-border pt-2">{account}</li>
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
