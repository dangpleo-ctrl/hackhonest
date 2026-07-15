import Link from "next/link";
import { MessageSquare, Lock, Link2 } from "lucide-react";
import type { ForumThread } from "@/lib/types";
import type { Locale, Messages } from "@/lib/i18n";
import { relativeTime } from "@/lib/relative-time";
import { resolveEntry } from "@/lib/forum";

/**
 * A list of discussion threads. Server component: it receives the message dict
 * and locale directly (no client boundary), so relative times render once on
 * the server with no hydration cost.
 */
export function ThreadList({
  threads,
  locale,
  t,
}: {
  threads: ForumThread[];
  locale: Locale;
  t: Messages;
}) {
  return (
    <ul className="flex flex-col gap-2">
      {threads.map((th) => {
        const entry = resolveEntry(th.actorSlug);
        return (
          <li key={th.id}>
            <Link
              href={`/forum/t/${th.id}`}
              className="group block rounded-xl border border-border bg-surface p-4 shadow-sm transition duration-150 hover:border-border-strong hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:p-5"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <h3 className="flex items-center gap-1.5 font-semibold leading-snug text-foreground transition-colors group-hover:text-accent-strong">
                    {th.locked && (
                      <Lock aria-hidden="true" className="size-3.5 shrink-0 text-faint" />
                    )}
                    <span className="truncate">{th.title}</span>
                  </h3>
                  <p className="mt-1 flex flex-wrap items-center gap-x-1.5 text-xs text-faint">
                    <span>{t.forum.startedBy(th.authorHandle ?? "—")}</span>
                    <span aria-hidden="true">·</span>
                    <span>{relativeTime(th.lastActivityAt, locale, t.forum.justNow)}</span>
                    {entry && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span className="inline-flex items-center gap-1 text-muted">
                          <Link2 aria-hidden="true" className="size-3" />
                          {entry.name}
                        </span>
                      </>
                    )}
                  </p>
                </div>
                <span className="inline-flex shrink-0 items-center gap-1 text-xs text-faint tabular-nums">
                  <MessageSquare aria-hidden="true" className="size-3.5" />
                  {th.replyCount}
                </span>
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
