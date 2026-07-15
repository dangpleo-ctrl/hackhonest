import type { Metadata } from "next";
import { brand } from "@/lib/brand";
import { getT } from "@/lib/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getT();
  return {
    title: t.trust.metaTitle,
    description: t.trust.metaDescription,
  };
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-10">
      <h2 className="text-xl font-semibold tracking-tight text-foreground">{title}</h2>
      <div className="mt-3 space-y-3 text-[15px] leading-relaxed text-muted">{children}</div>
    </section>
  );
}

export default async function TrustPage() {
  const t = await getT();
  const s = t.trust.sections;
  return (
    <div className="mx-auto max-w-3xl px-5 py-12">
      <p className="text-sm font-medium text-accent">{t.trust.eyebrow}</p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground">{t.trust.title}</h1>
      <p className="mt-4 text-lg leading-relaxed text-muted">{t.brand.posture}</p>

      <Section title={s.host.title}>
        <p>{s.host.body(brand.name)}</p>
      </Section>

      <Section title={s.verified.title}>
        <p>{s.verified.body}</p>
      </Section>

      <Section title={s.anonymous.title}>
        <p>{s.anonymous.body}</p>
      </Section>

      <Section title={s.facts.title}>
        <p>{s.facts.body}</p>
      </Section>

      <Section title={s.reply.title}>
        <p>{s.reply.body}</p>
      </Section>

      <Section title={s.report.title}>
        <p>{s.report.body}</p>
      </Section>

      <p className="mt-12 rounded-xl border border-border bg-surface p-4 text-sm text-muted">
        {t.trust.footnote(t.brand.region)}
      </p>
    </div>
  );
}
