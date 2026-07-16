"use client";

import { useActionState, useEffect, useRef } from "react";
import { createPostAction, type PostFormState } from "@/lib/actions/forum";
import { useT } from "@/lib/i18n/locale-provider";
import { Textarea } from "@/components/ui/textarea";
import { buttonVariants } from "@/components/ui/button";

const INITIAL: PostFormState = {};

export function ReplyForm({
  threadId,
  handle,
}: {
  threadId: string;
  handle: string;
}) {
  const t = useT();
  const [state, formAction, isPending] = useActionState(createPostAction, INITIAL);
  const formRef = useRef<HTMLFormElement>(null);

  // Clear the box after a reply lands; the revalidated post list shows it above.
  useEffect(() => {
    if (state.ok) formRef.current?.reset();
  }, [state.ok]);

  return (
    <form
      ref={formRef}
      action={formAction}
      className="rounded-xl border border-border bg-surface p-5"
    >
      <input type="hidden" name="threadId" value={threadId} />
      <label htmlFor="reply-body" className="text-sm font-medium text-foreground">
        {t.forum.replyHeading}
      </label>
      <p className="mt-0.5 text-xs text-faint">{t.forum.signedInAs(handle)}</p>
      <Textarea
        id="reply-body"
        name="body"
        rows={4}
        required
        minLength={2}
        maxLength={10000}
        placeholder={t.forum.replyPlaceholder}
        className="mt-2"
        invalid={!!state.error}
      />
      {state.error && (
        <p role="alert" className="mt-2 text-sm font-medium text-danger-strong">
          {state.error}
        </p>
      )}
      <div className="mt-3">
        <button
          type="submit"
          disabled={isPending}
          className={buttonVariants({ variant: "primary", size: "md" })}
        >
          {isPending ? t.forum.replySubmitting : t.forum.replySubmit}
        </button>
      </div>
    </form>
  );
}
