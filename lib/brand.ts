// Brand config — the single place to rename the product. Change `name` and the whole
// app follows. Working name "HackHonest"; Leo can swap it in one line.
export const brand = {
  name: "HackHonest",
  tagline: "The community record of hackathon organizers.",
  // One-line pitch, used in hero + meta description.
  pitch:
    "Verified, first-hand reviews of the companies, organizers, and sponsors behind hackathons — so you can see who pays prizes, judges fairly, and keeps their promises before you burn a weekend.",
  // Neutral-host posture, shown on the site and baked into copy. We host user statements;
  // we never issue our own verdict about anyone.
  posture:
    "We host what verified participants report. We never rate or accuse anyone ourselves — every number on this site is a count of what real attendees said.",
  region: "Vietnam & Southeast Asia",
  locale: "en", // vi coming later
  // Contact / report channels (placeholders; wire when Leo picks them).
  reportEmail: "reports@hackhonest.example",
  // Design tokens live in tailwind + globals.css; brand accent here for JS use.
  accent: "#1d4ed8",
} as const;

export type Brand = typeof brand;
