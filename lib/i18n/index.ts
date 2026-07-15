// Lightweight i18n core — no framework, no route restructure. The locale lives in
// a cookie (`hh_locale`) so server components can read it at request time (correct
// language in the initial HTML, no flash) and the client can persist + switch it.
//
// - Server components / metadata: `import { getLocale, getT } from "@/lib/i18n/server"`.
// - Client components: `import { useT, useLocale, useSetLocale } from "@/lib/i18n/locale-provider"`.
// - Shared shape + helpers (safe in either environment): this file.

import { en } from "./en";
import { vi } from "./vi";

export type Locale = "en" | "vi";

/** The message shape. `en` is canonical; `vi` must satisfy it (build-time parity). */
export type Messages = typeof en;

export const LOCALES: Locale[] = ["en", "vi"];
export const DEFAULT_LOCALE: Locale = "en";

/** Cookie the toggle writes and server components read. */
export const LOCALE_COOKIE = "hh_locale";
/** One year, in seconds — the persisted preference should outlast a browsing session. */
export const LOCALE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

export const dictionaries: Record<Locale, Messages> = { en, vi };

export function isLocale(value: unknown): value is Locale {
  return value === "en" || value === "vi";
}

/** Normalize any raw cookie/string value to a supported locale, defaulting to English. */
export function normalizeLocale(value: string | undefined | null): Locale {
  return isLocale(value) ? value : DEFAULT_LOCALE;
}

/** The active message dictionary for a locale. */
export function getMessages(locale: Locale): Messages {
  return dictionaries[locale];
}

/** Native display name for each locale (used by the toggle). */
export const LOCALE_NAME: Record<Locale, string> = {
  en: en.languageName,
  vi: vi.languageName,
};

export { en, vi };
