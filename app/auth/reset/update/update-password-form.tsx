"use client";

import Link from "next/link";
import { useActionState } from "react";
import {
  updatePasswordAction,
  type UpdatePasswordState,
} from "@/lib/actions/password-reset";
import { useT } from "@/lib/i18n/locale-provider";
import { Input } from "@/components/ui/input";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/components/ui/cn";

const INITIAL: UpdatePasswordState = {};

export function UpdatePasswordForm() {
  const t = useT();
  const [state, formAction, isPending] = useActionState(
    updatePasswordAction,
    INITIAL,
  );

  if (state.ok) {
    return (
      <div className="mt-8 rounded-xl border border-success-border bg-success-subtle p-6">
        <h2 className="text-lg font-semibold text-success-strong">
          {t.auth.newPasswordSuccessHeading}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          {t.auth.newPasswordSuccessBody}
        </p>
        <Link
          href="/login"
          className={cn(buttonVariants({ variant: "primary" }), "mt-4")}
        >
          {t.auth.loginLink}
        </Link>
      </div>
    );
  }

  return (
    <form action={formAction} className="mt-8 flex flex-col gap-5">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="password" className="text-sm font-medium text-foreground">
          {t.auth.newPasswordLabel}
        </label>
        <Input
          id="password"
          name="password"
          type="password"
          autoComplete="new-password"
          required
          minLength={8}
          placeholder={t.auth.passwordPlaceholder}
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
        {isPending ? t.auth.newPasswordSubmitting : t.auth.newPasswordSubmit}
      </button>
    </form>
  );
}
