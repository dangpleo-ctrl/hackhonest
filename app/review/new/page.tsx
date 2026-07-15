import type { Metadata } from "next";
import { getT } from "@/lib/i18n/server";
import { actors, events } from "@/lib/data";
import { ReviewForm, type TargetOption } from "./review-form";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getT();
  return {
    title: t.reviewNew.metaTitle,
    description: t.reviewNew.metaDescription,
  };
}

export default async function NewReviewPage() {
  const t = await getT();
  const options: TargetOption[] = [
    ...events.map((e) => ({ value: `event:${e.slug}`, label: e.name, group: "Events" as const })),
    ...actors
      .filter((a) => a.kinds.includes("organizer"))
      .map((a) => ({ value: `organizer:${a.slug}`, label: a.name, group: "Organizers" as const })),
  ];
  return (
    <div className="mx-auto max-w-2xl px-5 py-12">
      <p className="text-sm font-medium text-accent-strong">{t.reviewNew.eyebrow}</p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground">{t.reviewNew.title}</h1>
      <p className="mt-4 text-[15px] leading-relaxed text-muted">
        {t.reviewNew.intro(t.brand.posture)}
      </p>
      <div className="mt-10">
        <ReviewForm options={options} />
      </div>
    </div>
  );
}
