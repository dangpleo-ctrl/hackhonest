import type { Metadata } from "next";
import { brand } from "@/lib/brand";
import { getT } from "@/lib/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getT();
  return {
    title: t.tos.metaTitle,
    description: t.tos.metaDescription,
  };
}

export default async function TosPage() {
  const t = await getT();
  const rules = t.tos.rules;
  return (
    <div className="mx-auto max-w-3xl px-5 py-12">
      <p className="text-sm font-medium text-accent">{t.tos.eyebrow}</p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground">{t.tos.title}</h1>
      <p className="mt-4 text-lg leading-relaxed text-muted">{t.tos.intro(brand.name)}</p>
      <div className="mt-8 space-y-5">
        {rules.map((r, i) => (
          <div key={i} className="rounded-xl border border-border bg-surface p-5">
            <h2 className="font-semibold text-foreground">{r.h}</h2>
            <p className="mt-1 text-[15px] leading-relaxed text-muted">{r.p}</p>
          </div>
        ))}
      </div>
      <p className="mt-10 text-sm text-muted">{t.tos.footnote(t.brand.region)}</p>
    </div>
  );
}
