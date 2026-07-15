import type { Metadata } from "next";
import Link from "next/link";
import { brand } from "@/lib/brand";
import { getT } from "@/lib/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getT();
  return {
    title: t.howItWorks.metaTitle,
    description: t.howItWorks.metaDescription,
  };
}

export default async function HowItWorksPage() {
  const t = await getT();
  const steps = t.howItWorks.steps;
  return (
    <div className="mx-auto max-w-3xl px-5 py-12">
      <p className="text-sm font-medium text-accent">{t.howItWorks.eyebrow}</p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground">
        {t.howItWorks.title}
      </h1>
      <p className="mt-4 text-lg leading-relaxed text-muted">
        {t.howItWorks.intro(brand.name)}
      </p>

      <ol className="mt-10 space-y-6">
        {steps.map((s, i) => (
          <li key={i} className="flex gap-4 rounded-xl border border-border bg-surface p-5">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-bold text-white">
              {i + 1}
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
          {t.howItWorks.ctaDirectory}
        </Link>
        <Link
          href="/review/new"
          className="rounded-lg border border-border px-5 py-2.5 text-sm font-semibold text-foreground hover:bg-surface"
        >
          {t.howItWorks.ctaReview}
        </Link>
      </div>
    </div>
  );
}
