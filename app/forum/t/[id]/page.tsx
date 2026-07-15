import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getLocaleAndT, getT } from "@/lib/i18n/server";
import { getSessionUser } from "@/lib/auth";
import { getCategory, getPosts, getThread, resolveEntry } from "@/lib/forum";
import { relativeTime } from "@/lib/relative-time";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/components/ui/cn";
import { ReplyForm } from "./reply-form";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const [thread, t] = await Promise.all([getThread(id), getT()]);
  return { title: thread ? thread.title : t.forum.metaTitle };
}

export default async function ThreadPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { locale, t } = await getLocaleAndT();
  const [thread, user] = await Promise.all([getThread(id), getSessionUser()]);
  if (!thread) notFound();

  const [posts, category] = await Promise.all([
    getPosts(thread.id),
    getCategory(thread.categoryId),
  ]);
  const entry = resolveEntry(thread.actorSlug);

  return (
    <article className="mx-auto w-full max-w-3xl px-5 py-10">
      <Link
        href={category ? `/forum/c/${category.id}` : "/forum"}
        className="text-sm text-muted transition-colors hover:text-foreground"
      >
        {category ? t.forum.backToCategory(category.name) : t.forum.backToForum}
      </Link>

      <header className="mt-4">
        <div className="flex flex-wrap items-center gap-2">
          {category && <Badge tone="accent">{category.name}</Badge>}
          {thread.locked && <Badge tone="warning">{t.forum.locked}</Badge>}
          {entry && (
            <Link href={entry.href} className="rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">
              <Badge tone="outline" className="hover:border-border-strong">
                {t.forum.aboutActor(entry.name)}
              </Badge>
            </Link>
          )}
        </div>
        <h1 className="mt-3 text-2xl font-bold leading-tight tracking-tight text-foreground sm:text-3xl">
          {thread.title}
        </h1>
        <p className="mt-2 text-sm text-faint">
          {t.forum.startedBy(thread.authorHandle ?? "—")} ·{" "}
          {relativeTime(thread.createdAt, locale, t.forum.justNow)}
        </p>
      </header>

      {/* Opening post */}
      <div className="mt-6 rounded-xl border border-border bg-surface p-5 sm:p-6">
        <p className="whitespace-pre-wrap break-words text-[15px] leading-relaxed text-foreground">
          {thread.body}
        </p>
      </div>

      {/* Replies */}
      <section className="mt-10">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">
          {t.forum.repliesHeading}{" "}
          <span className="text-sm font-normal text-faint tabular-nums">
            {thread.replyCount}
          </span>
        </h2>

        {posts.length === 0 ? (
          <p className="mt-3 text-sm text-muted">{t.forum.noRepliesYet}</p>
        ) : (
          <ul className="mt-4 flex flex-col gap-3">
            {posts.map((p) => (
              <li key={p.id} className="rounded-xl border border-border bg-surface p-5">
                <div className="flex flex-wrap items-center gap-x-2 text-sm">
                  <span className="font-semibold text-foreground">
                    {p.authorHandle ?? "—"}
                  </span>
                  <span className="text-faint">
                    · {relativeTime(p.createdAt, locale, t.forum.justNow)}
                  </span>
                </div>
                <p className="mt-2 whitespace-pre-wrap break-words text-[15px] leading-relaxed text-foreground">
                  {p.body}
                </p>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Reply box / login prompt / locked notice */}
      <section className="mt-8">
        {thread.locked ? (
          <div className="rounded-xl border border-warning-border bg-warning-subtle p-4 text-sm text-warning-strong">
            {t.forum.lockedNote}
          </div>
        ) : user ? (
          <ReplyForm threadId={thread.id} handle={user.handle} />
        ) : (
          <div className="rounded-xl border border-border bg-surface p-5">
            <p className="text-sm text-muted">{t.forum.loginToReplyNote}</p>
            <Link
              href={`/login?next=${encodeURIComponent(`/forum/t/${thread.id}`)}`}
              className={cn(buttonVariants({ variant: "primary", size: "md" }), "mt-3")}
            >
              {t.forum.loginToReply}
            </Link>
          </div>
        )}
      </section>
    </article>
  );
}
