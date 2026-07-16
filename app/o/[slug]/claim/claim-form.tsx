"use client";

import { useActionState } from "react";
import { submitClaimAction, type ClaimFormState } from "@/lib/actions/claims";
import { useT } from "@/lib/i18n/locale-provider";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/components/ui/cn";

const INITIAL: ClaimFormState = {};

export function ClaimForm({
  actorSlug,
  email,
  domainMatch,
  siteDomain,
}: {
  actorSlug: string;
  email: string;
  domainMatch: boolean;
  siteDomain: string | null;
}) {
  const t = useT();
  const [state, formAction, isPending] = useActionState(submitClaimAction, INITIAL);

  if (state.ok) {
    return (
      <div className="mt-6 rounded-xl border border-success-border bg-success-subtle p-6">
        <h2 className="text-lg font-semibold text-success-strong">
          {t.claim.successHeading}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-muted">{t.claim.successBody}</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="mt-6 flex flex-col gap-4">
      <input type="hidden" name="actorSlug" value={actorSlug} />
      {email && <p className="text-sm text-muted">{t.claim.emailNote(email)}</p>}
      {siteDomain &&
        (domainMatch ? (
          <p className="text-sm font-medium text-success-strong">
            {t.claim.domainMatch(siteDomain)}
          </p>
        ) : (
          <p className="text-sm text-faint">{t.claim.domainNoMatch}</p>
        ))}
      {state.error && (
        <p role="alert" className="text-sm font-medium text-danger-strong">
          {state.error}
        </p>
      )}
      <button
        type="submit"
        disabled={isPending}
        className={cn(buttonVariants({ variant: "primary", size: "lg" }))}
      >
        {isPending ? t.claim.submitting : t.claim.submit}
      </button>
    </form>
  );
}
