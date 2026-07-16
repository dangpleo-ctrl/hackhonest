"use client";

import { useActionState, useEffect, useRef } from "react";
import { createReplyAction, type ReplyFormState } from "@/lib/actions/claims";
import { useT } from "@/lib/i18n/locale-provider";
import { Textarea } from "@/components/ui/textarea";
import { buttonVariants } from "@/components/ui/button";

const INITIAL: ReplyFormState = {};

/** Inline reply box shown under a review to a verified page owner. */
export function OrganizerReplyForm({
  actorSlug,
  reviewId,
}: {
  actorSlug: string;
  reviewId: string;
}) {
  const t = useT();
  const [state, formAction, isPending] = useActionState(createReplyAction, INITIAL);
  const formRef = useRef<HTMLFormElement>(null);
  useEffect(() => {
    if (state.ok) formRef.current?.reset();
  }, [state.ok]);

  return (
    <form
      ref={formRef}
      action={formAction}
      className="mt-3 rounded-lg border border-accent-border bg-accent-subtle/60 p-3"
    >
      <input type="hidden" name="actorSlug" value={actorSlug} />
      <input type="hidden" name="reviewId" value={reviewId} />
      <label
        htmlFor={`reply-${reviewId}`}
        className="text-xs font-semibold uppercase tracking-wide text-accent-strong"
      >
        {t.claim.replyHeading}
      </label>
      <Textarea
        id={`reply-${reviewId}`}
        name="body"
        rows={3}
        required
        minLength={2}
        maxLength={5000}
        placeholder={t.claim.replyPlaceholder}
        className="mt-1.5"
        invalid={!!state.error}
      />
      {state.error && (
        <p role="alert" className="mt-1.5 text-sm font-medium text-danger-strong">
          {state.error}
        </p>
      )}
      <div className="mt-2">
        <button
          type="submit"
          disabled={isPending}
          className={buttonVariants({ variant: "primary", size: "sm" })}
        >
          {isPending ? t.claim.replySubmitting : t.claim.replySubmit}
        </button>
      </div>
    </form>
  );
}
