import type { Metadata } from "next";
import Link from "next/link";
import { Plus, MessagesSquare } from "lucide-react";
import { getLocaleAndT, getT } from "@/lib/i18n/server";
import { getSessionUser } from "@/lib/auth";
import { getCategoryStats, getRecentThreads } from "@/lib/forum";
import { relativeTime } from "@/lib/relative-time";
import { ThreadList } from "@/components/forum/thread-list";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/components/ui/cn";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getT();
  return { title: t.forum.metaTitle, description: t.forum.metaDescription };
}

export default async function ForumPage() {
  const { locale, t } = await getLocaleAndT();
  const [user, categoryStats, recent] = await Promise.all([
    getSessionUser(),
    getCategoryStats(),
    getRecentThreads(20),
  ]);

  const startCta = user ? (
    <Link
      href="/forum/new"
      className={cn(buttonVariants({ variant: "primary", size: "md" }), "shrink-0")}
    >
      <Plus aria-hidden="true" />
      {t.forum.startThread}
    </Link>
  ) : (
    <Link
      href="/login?next=/forum/new"
      className={cn(buttonVariants({ variant: "secondary", size: "md" }), "shrink-0")}
    >
      {t.forum.loginToPost}
    </Link>
  );

  return (
    <div className="mx-auto w-full max-w-4xl px-5 py-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            {t.forum.title}
          </h1>
          <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-muted">
            {t.forum.subtitle}
          </p>
        </div>
        {startCta}
      </div>

      {/* Categories */}
      <section className="mt-8">
        <h2 className="text-xs font-semibold uppercase tracking-wide text-faint">
          {t.forum.categoriesHeading}
        </h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {categoryStats.map(({ category, threadCount, lastActivityAt }) => (
            <Link
              key={category.id}
              href={`/forum/c/${category.id}`}
              className="group block rounded-xl border border-border bg-surface p-5 shadow-sm transition duration-150 hover:-translate-y-0.5 hover:border-border-strong hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-semibold text-foreground transition-colors group-hover:text-accent-strong">
                  {category.name}
                </h3>
                <span className="inline-flex shrink-0 items-center gap-1 text-xs text-faint tabular-nums">
                  <MessagesSquare aria-hidden="true" className="size-3.5" />
                  {threadCount}
                </span>
              </div>
              {category.description && (
                <p className="mt-1.5 text-sm leading-relaxed text-muted">
                  {category.description}
                </p>
              )}
              {lastActivityAt && (
                <p className="mt-3 text-xs text-faint">
                  {t.forum.lastActivity}:{" "}
                  {relativeTime(lastActivityAt, locale, t.forum.justNow)}
                </p>
              )}
            </Link>
          ))}
        </div>
      </section>

      {/* Recent discussions */}
      <section className="mt-10">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">
          {t.forum.recentHeading}
        </h2>
        {recent.length === 0 ? (
          <div className="mt-4 rounded-xl border border-dashed border-border bg-surface p-8 text-center">
            <p className="text-muted">{t.forum.noThreadsYet}</p>
            {user ? (
              <Link
                href="/forum/new"
                className={cn(buttonVariants({ variant: "primary", size: "md" }), "mt-3")}
              >
                {t.forum.beFirst}
              </Link>
            ) : (
              <Link
                href="/login?next=/forum/new"
                className="mt-3 inline-block text-sm font-semibold text-accent-strong hover:underline"
              >
                {t.forum.loginToPost}
              </Link>
            )}
          </div>
        ) : (
          <div className="mt-4">
            <ThreadList threads={recent} locale={locale} t={t} />
          </div>
        )}
      </section>
    </div>
  );
}
