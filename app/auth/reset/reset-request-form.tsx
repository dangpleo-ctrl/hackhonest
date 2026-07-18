"use client";

import { useActionState } from "react";
import {
  requestPasswordResetAction,
  type ResetRequestState,
} from "@/lib/actions/password-reset";
import { useT } from "@/lib/i18n/locale-provider";
import { Input } from "@/components/ui/input";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/components/ui/cn";

const INITIAL: ResetRequestState = {};

export function ResetRequestForm() {
  const t = useT();
  const [state, formAction, isPending] = useActionState(
    requestPasswordResetAction,
    INITIAL,
  );

  if (state.sent) {
    return (
      <div className="mt-8 rounded-xl border border-success-border bg-success-subtle p-6">
        <h2 className="text-lg font-semibold text-success-strong">
          {t.auth.resetSentHeading}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          {t.auth.resetSentBody}
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="mt-8 flex flex-col gap-5">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="email" className="text-sm font-medium text-foreground">
          {t.auth.emailLabel}
        </label>
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder={t.auth.emailPlaceholder}
          invalid={!!state.error}
        />
      </div>

      {state.error && (
        <p role="alert" className="text-sm font-medium text-danger-strong">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className={cn(buttonVariants({ variant: "primary", size: "lg" }), "w-full")}
      >
        {isPending ? t.auth.resetSubmitting : t.auth.resetSubmit}
      </button>
    </form>
  );
}
