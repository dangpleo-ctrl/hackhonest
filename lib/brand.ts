// Brand config — the single place to rename the product. Change `name` and the whole
// app follows. Working name "HackHonest"; Leo can swap it in one line.
//
// NOTE: all DISPLAY copy (tagline, pitch, posture, region) is now localized — edit it
// per-language in `lib/i18n/en.ts` and `lib/i18n/vi.ts` (under `brand`), not here. The
// active locale is cookie-driven (`hh_locale`); see `lib/i18n/`. The English strings
// below are kept only as a fallback reference; `name` and `accent` are still consumed.
export const brand = {
  name: "HackHonest",
  tagline: "The community record of hackathon organizers.",
  pitch:
    "Verified, first-hand reviews of the companies, organizers, and sponsors behind hackathons — so you can see who pays prizes, judges fairly, and keeps their promises before you burn a weekend.",
  posture:
    "We host what verified participants report. We never rate or accuse anyone ourselves — every number on this site is a count of what real attendees said.",
  region: "Vietnam & Southeast Asia",
  // Contact / report channels (placeholders; wire when Leo picks them).
  reportEmail: "reports@hackhonest.example",
  // Design tokens live in tailwind + globals.css; brand accent here for JS use.
  accent: "#1d4ed8",
} as const;

export type Brand = typeof brand;
