import type { Metadata } from "next";
import { brand } from "@/lib/brand";
import { actors, events } from "@/lib/data";
import { ReviewForm, type TargetOption } from "./review-form";

export const metadata: Metadata = {
  title: `Write a review — ${brand.name}`,
  description: "Add your verified, first-hand review of a hackathon organizer or event.",
};

export default function NewReviewPage() {
  const options: TargetOption[] = [
    ...events.map((e) => ({ value: `event:${e.slug}`, label: e.name, group: "Events" as const })),
    ...actors
      .filter((a) => a.kinds.includes("organizer"))
      .map((a) => ({ value: `organizer:${a.slug}`, label: a.name, group: "Organizers" as const })),
  ];
  return (
    <div className="mx-auto max-w-2xl px-5 py-12">
      <p className="text-sm font-medium text-accent-strong">Write a review</p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground">Share what actually happened</h1>
      <p className="mt-4 text-[15px] leading-relaxed text-muted">
        Only review events you took part in. You stay anonymous, and we verify participation before anything
        is published. {brand.posture}
      </p>
      <div className="mt-10">
        <ReviewForm options={options} />
      </div>
    </div>
  );
}
