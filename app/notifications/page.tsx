import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { BellOff } from "lucide-react";
import { getLocaleAndT, getT } from "@/lib/i18n/server";
import { getSessionUser } from "@/lib/auth";
import { getNotifications } from "@/lib/notifications";
import { markAllReadAction } from "@/lib/actions/notifications";
import { relativeTime } from "@/lib/relative-time";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/components/ui/cn";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getT();
  return { title: t.notifications.metaTitle, robots: { index: false } };
}

export default async function NotificationsPage() {
  const user = await getSessionUser();
  if (!user) redirect("/login?next=/notifications");

  const { locale, t } = await getLocaleAndT();
  const items = await getNotifications(user.id);
  const hasUnread = items.some((n) => !n.read);

  return (
    <div className="mx-auto w-full max-w-2xl px-5 py-10">
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          {t.notifications.title}
        </h1>
        {hasUnread && (
          <form action={markAllReadAction}>
            <button
              type="submit"
              className={buttonVariants({ variant: "secondary", size: "sm" })}
            >
              {t.notifications.markAllRead}
            </button>
          </form>
        )}
      </div>

      {items.length === 0 ? (
        <div className="mt-8 flex flex-col items-center gap-3 rounded-xl border border-dashed border-border bg-surface p-10 text-center">
          <BellOff aria-hidden="true" className="size-8 text-faint" />
          <p className="text-muted">{t.notifications.empty}</p>
        </div>
      ) : (
        <ul className="mt-6 flex flex-col gap-2">
          {items.map((n) => {
            const actor = n.actorHandle ?? "—";
            const text = n.threadTitle
              ? t.notifications.threadReply(actor, n.threadTitle)
              : t.notifications.threadReplyNoTitle(actor);
            const href = n.threadId ? `/forum/t/${n.threadId}` : "/forum";
            return (
              <li key={n.id}>
                <Link
                  href={href}
                  className={cn(
                    "block rounded-lg border p-4 transition-colors",
                    n.read
                      ? "border-border bg-surface hover:border-border-strong"
                      : "border-accent-border bg-accent-subtle hover:border-accent",
                  )}
                >
                  <p className="text-sm text-foreground">{text}</p>
                  <p className="mt-1 text-xs text-faint">
                    {relativeTime(n.createdAt, locale, t.forum.justNow)}
                  </p>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
