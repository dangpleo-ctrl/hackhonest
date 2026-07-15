import "server-only";
import { cookies } from "next/headers";
import {
  getMessages,
  normalizeLocale,
  LOCALE_COOKIE,
  type Locale,
  type Messages,
} from "./index";

// Reading the cookie opts a route into dynamic rendering — acceptable here (the
// site is small and event-scoped), and it lets the server render the correct
// language in the initial HTML so there is no flash on the client.

/** Current locale from the `hh_locale` cookie (defaults to English). */
export async function getLocale(): Promise<Locale> {
  const store = await cookies();
  return normalizeLocale(store.get(LOCALE_COOKIE)?.value);
}

/** Active message dictionary for the current request. */
export async function getT(): Promise<Messages> {
  return getMessages(await getLocale());
}

/** Both at once, for pages that need the locale (e.g. `<html lang>`) and the dict. */
export async function getLocaleAndT(): Promise<{ locale: Locale; t: Messages }> {
  const locale = await getLocale();
  return { locale, t: getMessages(locale) };
}
