import type { Review } from "@/lib/types";

// ─────────────────────────────────────────────────────────────────────────────
// HELD FOR COUNSEL — NOT RENDERED. Do NOT import this file anywhere.
//
// This is a REAL, named, first-hand attendee account. It is deliberately kept OUT
// of the rendered site (this module is never imported) until BOTH of these happen:
//   1. the owner approves a public, named launch, and
//   2. a Vietnam / Southeast Asia defamation-counsel read clears it for publication.
//
// Until then, the live demo shows the FICTIONAL Zenith Agent Grand Prix 2026 example
// (see reviews.ts) instead of any real event or organizer.
// ─────────────────────────────────────────────────────────────────────────────
export const pendingCounselReviews: Review[] = [
  {
    id: "genaifund-aabw-2026-attested-1",
    actorSlug: "genai-fund",
    eventSlug: "genaifund-aabw-2026",
    overall: 2,
    dimensions: [
      { key: "prizes", label: "Prizes delivered as promised", rating: 1 },
      { key: "perks", label: "Perks & credits were real", rating: 1 },
      { key: "judging", label: "Judging was fair & transparent", rating: 2 },
      { key: "organization", label: "Well organized", rating: 2 },
      { key: "honesty", label: "Honest marketing", rating: 1 },
      { key: "respect", label: "Respected participants' work", rating: 2 },
    ],
    headline: "Advertised credits never arrived, and most 'perks' were other companies' free programs",
    body:
      "I attended Agent Builders Summit 2026 (ABS) in person. Here is what happened to me, with receipts.\n\n" +
      "The perks page advertised NeuralForge credits ($150 plus 3 months of NeuralForge Pro) and $1,000 in StratusCloud " +
      "credits. I applied through the official portal, which showed my status as 'Applied' and later " +
      "'Claimed'. I received nothing. The StratusCloud 'perk' was a link that redirected to StratusCloud's standard Activate " +
      "program, which anyone can apply to and which has nothing to do with the event. Several of the big " +
      "headline perks (Hyperion for Startups '$1.5M', PixelByte '$15,000', Noteflow 'over $6,000') are the " +
      "providers' own public startup programs, presented as if the organizer was granting them.\n\n" +
      "The '$1M+ in perks and credits' headline is built from those third-party programs plus free tiers " +
      "and out-of-stock items. The perks page itself states, in fine print, that 'submitting an application " +
      "does not guarantee receipt.'\n\n" +
      "The track structure is what bothered me most. Every one of the 67 problem statements is a named " +
      "enterprise's real production problem, and the rules require you to build a working solution to a " +
      "sponsor's problem and submit your source code, with the stated goal of solutions 'deploying within " +
      "90 days.' Prizes were not disclosed until the kickoff mid-event, so we committed our weekend before " +
      "knowing what, if anything, we were competing for.\n\n" +
      "This is my own experience as a participant. I'm posting it so the next person can decide for themselves.",
    verified: true,
    verifyMethod: "founder-attested",
    author: "Verified AABW 2026 participant",
    date: "2026-07-14",
    evidence: [
      { label: "Perks & Credits page (30 partner perks)", kind: "screenshot", note: "NeuralForge $150 and StratusCloud $1,000 shown as 'Applied'." },
      { label: "Builder dashboard showing perks 'Claimed'", kind: "screenshot", note: "Marked Claimed; $0 received." },
      { label: "StratusCloud perk link redirects to StratusCloud Activate", kind: "link", note: "The organizer's link goes to StratusCloud's own standard program." },
    ],
  },
];
