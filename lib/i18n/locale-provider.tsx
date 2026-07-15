"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  DEFAULT_LOCALE,
  LOCALE_COOKIE,
  LOCALE_COOKIE_MAX_AGE,
  getMessages,
  isLocale,
  type Locale,
  type Messages,
} from "./index";

interface LocaleContextValue {
  locale: Locale;
  t: Messages;
  setLocale: (next: Locale) => void;
}

const LocaleContext = React.createContext<LocaleContextValue | null>(null);

// ── Persisted-preference store (cookie + localStorage) ────────────────────────
// The cookie is the source of truth the server reads (so SSR is already in the
// right language). We mirror to localStorage as a fallback, and expose the store
// to React via useSyncExternalStore so a switch re-renders every consumer.

/** Read a persisted preference on the client: cookie first, then localStorage. */
function readClientLocale(): Locale | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(/(?:^|;\s*)hh_locale=([^;]+)/);
  if (match && isLocale(match[1])) return match[1];
  try {
    const stored = window.localStorage.getItem(LOCALE_COOKIE);
    if (stored && isLocale(stored)) return stored;
  } catch {
    /* localStorage can throw in private mode — best-effort only */
  }
  return null;
}

function persistLocale(locale: Locale): void {
  try {
    document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=${LOCALE_COOKIE_MAX_AGE}; samesite=lax`;
  } catch {
    /* best-effort */
  }
  try {
    window.localStorage.setItem(LOCALE_COOKIE, locale);
  } catch {
    /* best-effort */
  }
}

// Same-tab writes don't fire the `storage` event, so we notify subscribers
// ourselves; the `storage` listener covers cross-tab changes for free.
const listeners = new Set<() => void>();

function subscribe(onChange: () => void): () => void {
  listeners.add(onChange);
  if (typeof window !== "undefined") {
    window.addEventListener("storage", onChange);
  }
  return () => {
    listeners.delete(onChange);
    if (typeof window !== "undefined") {
      window.removeEventListener("storage", onChange);
    }
  };
}

/**
 * Holds the active locale, seeded server-side from the cookie (so SSR output is
 * already in the right language — no flash) and read from the persisted store on
 * the client. The toggle calls `setLocale`, which persists the choice, re-renders
 * every consumer, and refreshes server components so pages + metadata follow.
 */
export function LocaleProvider({
  initialLocale,
  children,
}: {
  initialLocale: Locale;
  children: React.ReactNode;
}) {
  const router = useRouter();

  const locale = React.useSyncExternalStore(
    subscribe,
    () => readClientLocale() ?? initialLocale, // client snapshot
    () => initialLocale, // server snapshot (no flash)
  );

  const setLocale = React.useCallback(
    (next: Locale) => {
      persistLocale(next);
      listeners.forEach((l) => l());
      // Re-render server components (pages + metadata) in the new language.
      router.refresh();
    },
    [router],
  );

  const value = React.useMemo<LocaleContextValue>(
    () => ({ locale, t: getMessages(locale), setLocale }),
    [locale, setLocale],
  );

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

function useLocaleContext(): LocaleContextValue {
  const ctx = React.useContext(LocaleContext);
  if (!ctx) {
    // Defensive: render default English rather than crash if used outside a provider.
    return {
      locale: DEFAULT_LOCALE,
      t: getMessages(DEFAULT_LOCALE),
      setLocale: () => {},
    };
  }
  return ctx;
}

/** The active message dictionary. */
export function useT(): Messages {
  return useLocaleContext().t;
}

/** The active locale code. */
export function useLocale(): Locale {
  return useLocaleContext().locale;
}

/** Setter that persists the choice and refreshes server-rendered content. */
export function useSetLocale(): (next: Locale) => void {
  return useLocaleContext().setLocale;
}
