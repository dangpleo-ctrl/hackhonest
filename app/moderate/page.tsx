import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Star, Check, X, ExternalLink } from "lucide-react";
import { getLocaleAndT, getT } from "@/lib/i18n/server";
import type { Messages } from "@/lib/i18n";
import {
  isAdmin,
  getPendingReviews,
  getPendingSuggestions,
  getPendingClaims,
} from "@/lib/admin";
import {
  moderateReviewAction,
  moderateSuggestionAction,
  moderateClaimAction,
} from "@/lib/actions/moderate";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getT();
  return { title: t.moderate.metaTitle, robots: { index: false, follow: false } };
}

/** Approve / reject buttons that post to a moderation server action. */
function Actions({
  action,
  id,
  t,
}: {
  action: (formData: FormData) => Promise<void>;
  id: string;
  t: Messages;
}) {
  return (
    <form action={action} className="flex shrink-0 flex-col gap-2 sm:flex-row">
      <input type="hidden" name="id" value={id} />
      <button
        name="action"
        value="approve"
        className={buttonVariants({ variant: "primary", size: "sm" })}
      >
        <Check aria-hidden="true" />
        {t.moderate.approve}
      </button>
      <button
        name="action"
        value="reject"
        className={buttonVariants({ variant: "outline", size: "sm" })}
      >
        <X aria-hidden="true" />
        {t.moderate.reject}
      </button>
    </form>
  );
}

export default async function ModeratePage() {
  if (!(await isAdmin())) notFound();

  const { t } = await getLocaleAndT();
  const [reviews, suggestions, claims] = await Promise.all([
    getPendingReviews(),
    getPendingSuggestions(),
    getPendingClaims(),
  ]);
  const total = reviews.length + suggestions.length + claims.length;

  return (
    <div className="mx-auto w-full max-w-3xl px-5 py-10">
      <h1 className="text-3xl font-bold tracking-tight text-foreground">
        {t.moderate.title}
      </h1>
      <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-muted">
        {t.moderate.subtitle}
      </p>

      {total === 0 ? (
        <div className="mt-8 rounded-xl border border-dashed border-border bg-surface p-8 text-center text-muted">
          {t.moderate.allClear}
        </div>
      ) : (
        <div className="mt-8 flex flex-col gap-10">
          {claims.length > 0 && (
            <section>
              <h2 className="text-xs font-semibold uppercase tracking-wide text-faint">
                {t.moderate.claimsHeading(claims.length)}
              </h2>
              <ul className="mt-3 flex flex-col gap-3">
                {claims.map((c) => (
                  <li key={c.id} className="rounded-xl border border-border bg-surface p-4">
                    <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
                      <div className="min-w-0">
                        <div className="font-medium text-foreground">
                          {t.moderate.claimHeadline(c.handle ?? "—", c.actorName ?? "—")}
                        </div>
                        <div className="mt-1 text-xs">
                          {c.domainMatch ? (
                            <span className="font-medium text-success-strong">
                              ✓ {t.moderate.domainMatches}
                            </span>
                          ) : (
                            <span className="text-faint">{t.moderate.domainNoMatch}</span>
                          )}
                        </div>
                      </div>
                      <Actions action={moderateClaimAction} id={c.id} t={t} />
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {reviews.length > 0 && (
            <section>
              <h2 className="text-xs font-semibold uppercase tracking-wide text-faint">
                {t.moderate.reviewsHeading(reviews.length)}
              </h2>
              <ul className="mt-3 flex flex-col gap-3">
                {reviews.map((r) => (
                  <li key={r.id} className="rounded-xl border border-border bg-surface p-4">
                    <div className="flex flex-col items-start justify-between gap-3 sm:flex-row">
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <Badge tone="neutral" size="sm">
                            <Star aria-hidden="true" className="fill-rating text-rating" />
                            {r.overall}/5
                          </Badge>
                          <span className="text-sm font-medium text-foreground">
                            {r.targetName
                              ? t.moderate.reviewFor(r.targetName)
                              : t.moderate.reviewForUnknown}
                          </span>
                        </div>
                        <div className="mt-1.5 font-semibold text-foreground">{r.headline}</div>
                        <p className="mt-1 line-clamp-3 text-sm text-muted">{r.body}</p>
                        <div className="mt-2 flex flex-col gap-1 text-xs text-faint">
                          <span>{t.moderate.byAuthor(r.author ?? t.moderate.anon)}</span>
                          {r.attendedProof && (
                            <span>
                              {t.moderate.proofLabel}: {r.attendedProof}
                            </span>
                          )}
                          {r.contact && (
                            <span>
                              {t.moderate.contactLabel}: {r.contact}
                            </span>
                          )}
                        </div>
                      </div>
                      <Actions action={moderateReviewAction} id={r.id} t={t} />
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {suggestions.length > 0 && (
            <section>
              <h2 className="text-xs font-semibold uppercase tracking-wide text-faint">
                {t.moderate.suggestionsHeading(suggestions.length)}
              </h2>
              <ul className="mt-3 flex flex-col gap-3">
                {suggestions.map((s) => (
                  <li key={s.id} className="rounded-xl border border-border bg-surface p-4">
                    <div className="flex flex-col items-start justify-between gap-3 sm:flex-row">
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <Badge tone="outline" size="sm">
                            {s.type}
                          </Badge>
                          <span className="font-medium text-foreground">{s.name}</span>
                        </div>
                        {s.blurb && <p className="mt-1 text-sm text-muted">{s.blurb}</p>}
                        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-faint">
                          {s.location && <span>{s.location}</span>}
                          {s.dates && <span>{s.dates}</span>}
                          {s.website && (
                            <a
                              href={s.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-accent-strong hover:underline"
                            >
                              {s.website.replace(/^https?:\/\//, "")}
                            </a>
                          )}
                          {s.sourceUrl && (
                            <a
                              href={s.sourceUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-accent-strong hover:underline"
                            >
                              <ExternalLink aria-hidden="true" className="size-3" />
                              {t.moderate.sourceLabel}
                            </a>
                          )}
                          {s.submittedBy && (
                            <span>
                              {t.moderate.submittedByLabel}: {s.submittedBy}
                            </span>
                          )}
                        </div>
                      </div>
                      <Actions action={moderateSuggestionAction} id={s.id} t={t} />
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      )}
    </div>
  );
}
