import type { Metadata } from "next";
import { brand } from "@/lib/brand";

export const metadata: Metadata = {
  title: `Terms & content policy — ${brand.name}`,
  description: "The rules for posting, and how content is handled.",
};

const rules: { h: string; p: string }[] = [
  { h: "You are the author", p: "You, the reviewer, are the sole author and owner of your review. The platform hosts it; it does not adopt it or write it for you." },
  { h: "First-hand and true", p: "Only post about events you personally took part in. Warrant that what you write is true to your own experience, and that you have the rights and consents for any evidence you upload." },
  { h: "Opinions and disclosed facts", p: "State the facts you rely on, then your view. A conclusion drawn from facts you've disclosed is your protected opinion. Don't state as fact things you can't back." },
  { h: "No fabrication", p: "No fake reviews, in either direction. No reviewing your own event, and no paying for or coercing reviews. This is a hard rule." },
  { h: "Protect other people", p: "Redact third parties' names, faces, emails, and phone numbers from any evidence. Don't post other people's private information." },
  { h: "Right of reply, not deletion", p: "Reviewed organizers can claim their page and reply publicly, but cannot delete honest criticism. Content is removed only for clear policy violations." },
  { h: "Report and takedown", p: "Report fakes, non-attendee reviews, doxxing, or illegal content and we'll review it. We honor valid legal requests and notify affected reviewers where we can." },
];

export default function TosPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-12">
      <p className="text-sm font-medium text-accent">Terms &amp; content policy</p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground">The rules, in plain language</h1>
      <p className="mt-4 text-lg leading-relaxed text-muted">
        {brand.name} is a neutral host of user reviews. These are the ground rules; a full legal version
        will accompany public launch.
      </p>
      <div className="mt-8 space-y-5">
        {rules.map((r) => (
          <div key={r.h} className="rounded-xl border border-border bg-surface p-5">
            <h2 className="font-semibold text-foreground">{r.h}</h2>
            <p className="mt-1 text-[15px] leading-relaxed text-muted">{r.p}</p>
          </div>
        ))}
      </div>
      <p className="mt-10 text-sm text-muted">
        This is a community project in {brand.region} and is not legal advice. A page here is not the
        organizer&rsquo;s official page.
      </p>
    </div>
  );
}
