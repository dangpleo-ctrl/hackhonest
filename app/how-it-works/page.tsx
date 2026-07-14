import type { Metadata } from "next";
import Link from "next/link";
import { brand } from "@/lib/brand";

export const metadata: Metadata = {
  title: `How it works — ${brand.name}`,
  description: "Check an organizer before you commit a weekend, and add your own verified review.",
};

const steps = [
  {
    n: "1",
    title: "Search the organizer",
    body: "Look up the company, organizer, or sponsor behind an event. Reputation follows the actor across events, because the same people re-run hackathons under new names.",
  },
  {
    n: "2",
    title: "Read the record",
    body: "See a neutral summary of what verified attendees reported: were prizes paid, were the advertised credits real, was judging fair, did the reality match the marketing?",
  },
  {
    n: "3",
    title: "Add your own",
    body: "Took part? Write a verified, first-person review. State the facts, attach evidence for any hard claim. You stay anonymous; your identity signal is stored separately and never shown.",
  },
  {
    n: "4",
    title: "Organizers reply",
    body: "Organizers can claim their page and respond in public. Good actors get to show they made it right; the record stays for everyone.",
  },
];

export default function HowItWorksPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-12">
      <p className="text-sm font-medium text-accent">How it works</p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground">
        Know who you&rsquo;re building for
      </h1>
      <p className="mt-4 text-lg leading-relaxed text-muted">
        A weekend of work is real work. {brand.name} is the community&rsquo;s durable record of which
        hackathon organizers keep their word, so the signal doesn&rsquo;t wash away in a Discord by Tuesday.
      </p>

      <ol className="mt-10 space-y-6">
        {steps.map((s) => (
          <li key={s.n} className="flex gap-4 rounded-xl border border-border bg-surface p-5">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-bold text-white">
              {s.n}
            </span>
            <div>
              <h2 className="text-lg font-semibold text-foreground">{s.title}</h2>
              <p className="mt-1 text-[15px] leading-relaxed text-muted">{s.body}</p>
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-10 flex flex-wrap gap-3">
        <Link
          href="/directory"
          className="rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90"
        >
          Browse the directory
        </Link>
        <Link
          href="/review/new"
          className="rounded-lg border border-border px-5 py-2.5 text-sm font-semibold text-foreground hover:bg-surface"
        >
          Write a review
        </Link>
      </div>
    </div>
  );
}
