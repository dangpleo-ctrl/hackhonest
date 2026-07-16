import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MessagesSquare, MessageSquare } from "lucide-react";
import { getLocaleAndT, getT } from "@/lib/i18n/server";
import {
  getProfileByHandle,
  getAuthorStats,
  getThreadsByAuthor,
} from "@/lib/forum";
import { absoluteDate } from "@/lib/relative-time";
import { ThreadList } from "@/components/forum/thread-list";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ handle: string }>;
}): Promise<Metadata> {
  const { handle } = await params;
  const [profile, t] = await Promise.all([getProfileByHandle(handle), getT()]);
  if (!profile) return { title: t.profile.notFound };
  return {
    title: t.profile.metaTitle(profile.handle),
    description: t.profile.metaDescription(profile.handle),
  };
}

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;
  const { locale, t } = await getLocaleAndT();
  const profile = await getProfileByHandle(handle);
  if (!profile) notFound();

  const [stats, threads] = await Promise.all([
    getAuthorStats(profile.id),
    getThreadsByAuthor(profile.id),
  ]);

  return (
    <div className="mx-auto w-full max-w-3xl px-5 py-10">
      <Link
        href="/forum"
        className="text-sm text-muted transition-colors hover:text-foreground"
      >
        {t.forum.backToForum}
      </Link>

      <header className="mt-4 flex items-center gap-4">
        <div
          aria-hidden="true"
          className="flex size-14 shrink-0 items-center justify-center rounded-full bg-accent-subtle text-xl font-bold text-accent-strong"
        >
          {profile.handle.slice(0, 2).toUpperCase()}
        </div>
        <div className="min-w-0">
          <h1 className="truncate text-2xl font-bold tracking-tight text-foreground">
            {profile.handle}
          </h1>
          <p className="mt-0.5 text-sm text-faint">
            {t.profile.memberSince(absoluteDate(profile.createdAt, locale))}
          </p>
        </div>
      </header>

      {profile.bio && (
        <p className="mt-4 text-[15px] leading-relaxed text-muted">{profile.bio}</p>
      )}

      <section className="mt-6">
        <h2 className="text-xs font-semibold uppercase tracking-wide text-faint">
          {t.profile.reputation}
        </h2>
        <div className="mt-2 flex flex-wrap gap-3">
          <span className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface px-3 py-2 text-sm font-medium text-foreground">
            <MessagesSquare aria-hidden="true" className="size-4 text-accent" />
            {t.profile.discussionsStarted(stats.threadCount)}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface px-3 py-2 text-sm font-medium text-foreground">
            <MessageSquare aria-hidden="true" className="size-4 text-accent" />
            {t.profile.repliesPosted(stats.replyCount)}
          </span>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">
          {t.profile.threadsHeading}
        </h2>
        {threads.length === 0 ? (
          <p className="mt-3 text-sm text-muted">{t.profile.noThreads}</p>
        ) : (
          <div className="mt-4">
            <ThreadList threads={threads} locale={locale} t={t} />
          </div>
        )}
      </section>
    </div>
  );
}
