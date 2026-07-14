import type { Metadata } from "next";
import { brand } from "@/lib/brand";

export const metadata: Metadata = {
  title: `About — ${brand.name}`,
  description: "Why a community record of hackathon organizers exists, and who it's for.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-12">
      <p className="text-sm font-medium text-accent">About</p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground">Why this exists</h1>
      <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-muted">
        <p>
          AI made it possible for anyone to build fast, so hackathons exploded. With them came a wave of
          abuse: companies running &ldquo;hackathons&rdquo; whose tracks are their real, specced business
          problems, then taking the winning solutions into deployment instead of paying a dev team.
          Organizers over-promising credits, prizes, and perks that never arrive. Young, passionate
          developers giving away a weekend of real work on a promise.
        </p>
        <p>
          Today none of that leaves a searchable trace. A bad experience dies in a rage-tweet, an event
          Discord, or a group chat, and the next cohort walks in blind. {brand.name} is the fix: a durable,
          public record of which organizers, companies, and sponsors keep their word, built from the
          first-hand accounts of people who were actually there.
        </p>
        <p>
          It is balanced by design. Praise the good events so more people join them; document the bad ones
          so fewer people get burned. The platform never accuses anyone, it only shows what verified
          attendees reported, and lets you decide.
        </p>
        <p>
          This is a community project, starting in {brand.region}, where the need is sharpest right now. The
          platform is only the tool. The record belongs to the community that builds it.
        </p>
      </div>
    </div>
  );
}
