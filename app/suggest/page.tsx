import type { Metadata } from "next";
import { getT } from "@/lib/i18n/server";
import { SuggestForm } from "./suggest-form";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getT();
  return {
    title: t.suggest.metaTitle,
    description: t.suggest.metaDescription,
  };
}

export default async function SuggestPage() {
  const t = await getT();
  return (
    <div className="mx-auto max-w-2xl px-5 py-12">
      <p className="text-sm font-medium text-accent-strong">{t.suggest.eyebrow}</p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground">{t.suggest.title}</h1>
      <p className="mt-4 text-[15px] leading-relaxed text-muted">{t.suggest.intro}</p>
      <div className="mt-10">
        <SuggestForm />
      </div>
    </div>
  );
}
