import type { Metadata } from "next";
import { brand } from "@/lib/brand";
import { getT } from "@/lib/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getT();
  return {
    title: t.about.metaTitle,
    description: t.about.metaDescription,
  };
}

export default async function AboutPage() {
  const t = await getT();
  return (
    <div className="mx-auto max-w-3xl px-5 py-12">
      <p className="text-sm font-medium text-accent">{t.about.eyebrow}</p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground">{t.about.title}</h1>
      <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-muted">
        <p>{t.about.p1}</p>
        <p>{t.about.p2(brand.name)}</p>
        <p>{t.about.p3}</p>
        <p>{t.about.p4(t.brand.region)}</p>
      </div>
    </div>
  );
}
