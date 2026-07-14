import type { Metadata } from "next";
import { brand } from "@/lib/brand";

export const metadata: Metadata = {
  title: `Trust & Safety — ${brand.name}`,
  description: "How verification, anonymity, moderation, and the right of reply work on HackHonest.",
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-10">
      <h2 className="text-xl font-semibold tracking-tight text-foreground">{title}</h2>
      <div className="mt-3 space-y-3 text-[15px] leading-relaxed text-muted">{children}</div>
    </section>
  );
}

export default function TrustPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-12">
      <p className="text-sm font-medium text-accent">Trust &amp; Safety</p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground">How this stays honest</h1>
      <p className="mt-4 text-lg leading-relaxed text-muted">{brand.posture}</p>

      <Section title="We host, we don't judge">
        <p>
          {brand.name} is a neutral host of what verified participants report. We never write reviews,
          and we never rate or accuse anyone ourselves. Every number you see is a plain count of what
          real attendees said, for example &ldquo;3 of 4 verified reviewers reported prizes were not paid
          as promised.&rdquo; The conclusion is yours to draw.
        </p>
      </Section>

      <Section title="Verified, first-hand only">
        <p>
          Reviews come from people who actually took part. We verify participation before publishing, using
          signals the reviewer can prove they control, a GitHub identity tied to the event&rsquo;s project
          repo, a confirmation email from the event&rsquo;s own domain, or documentary evidence such as an
          acceptance email or dashboard. We do not accept second-hand or hypothetical reviews.
        </p>
      </Section>

      <Section title="Verified, but anonymous">
        <p>
          Reviewers post under a pseudonym. The identity signal we use to verify you is stored separately
          from your review and is never shown publicly, so an organizer cannot retaliate against you for an
          honest account. We keep as little as possible.
        </p>
      </Section>

      <Section title="Facts over insults">
        <p>
          The review form is built to capture what happened, not name-calling. State the facts, then your
          view. Attach evidence for any hard claim (a promised prize, an undelivered credit). A documented,
          first-hand account is both more useful to the next builder and far more defensible than a rant.
        </p>
      </Section>

      <Section title="Right of reply, for organizers">
        <p>
          Any organizer can claim their page and post a public reply to any review. They get the last word,
          but they cannot delete a review they simply disagree with. We remove content only for clear policy
          violations (doxxing, off-topic, illegal, or a review from someone who did not attend), never
          because a business asked us to take down honest criticism.
        </p>
      </Section>

      <Section title="Report a problem">
        <p>
          Spotted a fake review, a review from a non-attendee, or content that should come down? Report it
          and we will look. Abuse of the report tool is itself a violation.
        </p>
      </Section>

      <p className="mt-12 rounded-xl border border-border bg-surface p-4 text-sm text-muted">
        This is a community project in {brand.region}. It is not legal advice, and a page here is not the
        organizer&rsquo;s official page.
      </p>
    </div>
  );
}
