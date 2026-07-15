import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Plus } from "lucide-react";
import { getLocaleAndT, getT } from "@/lib/i18n/server";
import { getSessionUser } from "@/lib/auth";
import { getCategory, getThreadsByCategory } from "@/lib/forum";
import { ThreadList } from "@/components/forum/thread-list";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/components/ui/cn";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const [cat, t] = await Promise.all([getCategory(category), getT()]);
  return { title: cat ? cat.name : t.forum.metaTitle };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const { locale, t } = await getLocaleAndT();
  const [cat, user] = await Promise.all([getCategory(category), getSessionUser()]);
  if (!cat) notFound();

  const threads = await getThreadsByCategory(category);
  const newHref = `/forum/new?category=${encodeURIComponent(cat.id)}`;

  return (
    <div className="mx-auto w-full max-w-4xl px-5 py-10">
      <Link
        href="/forum"
        className="text-sm text-muted transition-colors hover:text-foreground"
      >
        {t.forum.backToForum}
      </Link>

      <div className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            {cat.name}
          </h1>
          {cat.description && (
            <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-muted">
              {cat.description}
            </p>
          )}
        </div>
        {user ? (
          <Link
            href={newHref}
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
        )}
      </div>

      <section className="mt-8">
        {threads.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border bg-surface p-8 text-center">
            <p className="text-muted">{t.forum.noThreadsYet}</p>
            {user ? (
              <Link
                href={newHref}
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
          <ThreadList threads={threads} locale={locale} t={t} />
        )}
      </section>
    </div>
  );
}
