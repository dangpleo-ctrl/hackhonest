import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { AtSign, MessagesSquare, MessageSquare, ShieldCheck } from "lucide-react";
import { getLocaleAndT, getT } from "@/lib/i18n/server";
import { getSessionUser, getSessionEmail } from "@/lib/auth";
import { getThreadsByAuthor, getAuthorStats } from "@/lib/forum";
import { isAdmin } from "@/lib/admin";
import { absoluteDate, relativeTime } from "@/lib/relative-time";
import { SignOutButton } from "@/components/sign-out-button";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/components/ui/cn";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getT();
  return { title: t.account.metaTitle };
}

export default async function AccountPage() {
  const user = await getSessionUser();
  if (!user) redirect("/login?next=/account");

  const { locale, t } = await getLocaleAndT();
  const [threads, email, stats, admin] = await Promise.all([
    getThreadsByAuthor(user.id),
    getSessionEmail(),
    getAuthorStats(user.id),
    isAdmin(),
  ]);

  return (
    <div className="mx-auto w-full max-w-3xl px-5 py-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            {t.account.title}
          </h1>
          <p className="mt-2 inline-flex items-center gap-1 text-[15px] text-muted">
            <AtSign aria-hidden="true" className="size-4 text-faint" />
            {user.handle}
          </p>
        </div>
        <SignOutButton />
      </div>

      {admin && (
        <Link
          href="/moderate"
          className={cn(
            buttonVariants({ variant: "secondary", size: "md" }),
            "mt-6 w-full justify-center sm:w-auto",
          )}
        >
          <ShieldCheck aria-hidden="true" />
          {t.account.moderation}
        </Link>
      )}

      <div className="mt-8 grid gap-4 rounded-xl border border-border bg-surface p-5 sm:grid-cols-2 sm:p-6">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wide text-faint">
            {t.account.publicHandle}
          </div>
          <div className="mt-1 font-medium text-foreground">{user.handle}</div>
        </div>
        <div>
          <div className="text-xs font-semibold uppercase tracking-wide text-faint">
            {t.account.privateEmail}
          </div>
          <div className="mt-1 break-all font-medium text-foreground">
            {email ?? "—"}
          </div>
        </div>
        {user.createdAt && (
          <div className="text-sm text-faint sm:col-span-2">
            {t.account.memberSince(absoluteDate(user.createdAt, locale))}
          </div>
        )}
      </div>

      <section className="mt-6">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-xs font-semibold uppercase tracking-wide text-faint">
            {t.account.reputation}
          </h2>
          <Link
            href={`/u/${user.handle}`}
            className="text-sm font-medium text-accent-strong hover:underline"
          >
            {t.account.viewProfile} →
          </Link>
        </div>
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

      <section className="mt-10">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">
          {t.account.myThreads}
        </h2>
        {threads.length === 0 ? (
          <div className="mt-4 rounded-xl border border-dashed border-border bg-surface p-8 text-center">
            <p className="text-muted">{t.account.noThreads}</p>
            <Link
              href="/forum/new"
              className={cn(buttonVariants({ variant: "primary", size: "md" }), "mt-3")}
            >
              {t.account.startOne}
            </Link>
          </div>
        ) : (
          <ul className="mt-4 flex flex-col gap-2">
            {threads.map((th) => (
              <li key={th.id}>
                <Link
                  href={`/forum/t/${th.id}`}
                  className="group block rounded-lg border border-border bg-surface p-4 transition-colors hover:border-border-strong hover:shadow-sm"
                >
                  <div className="font-medium text-foreground transition-colors group-hover:text-accent-strong">
                    {th.title}
                  </div>
                  <div className="mt-1 text-xs text-faint">
                    {relativeTime(th.lastActivityAt, locale, t.forum.justNow)} ·{" "}
                    {t.forum.replyCount(th.replyCount)}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
