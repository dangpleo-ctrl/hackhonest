"use client";

import { useActionState } from "react";
import { signUpAction, type AuthState } from "@/lib/actions/auth";
import { useT } from "@/lib/i18n/locale-provider";
import { Input } from "@/components/ui/input";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/components/ui/cn";
import { Turnstile } from "@/components/turnstile";

const INITIAL: AuthState = {};

export function SignupForm({ next }: { next: string }) {
  const t = useT();
  const [state, formAction, isPending] = useActionState(signUpAction, INITIAL);

  if (state.confirmEmail) {
    return (
      <div className="mt-8 rounded-xl border border-success-border bg-success-subtle p-6">
        <h2 className="text-lg font-semibold text-success-strong">
          {t.auth.confirmEmailHeading}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          {t.auth.confirmEmailBody}
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="mt-8 flex flex-col gap-5">
      <input type="hidden" name="next" value={next} />

      <div className="flex flex-col gap-1.5">
        <label htmlFor="handle" className="text-sm font-medium text-foreground">
          {t.auth.handleLabel}
        </label>
        <Input
          id="handle"
          name="handle"
          type="text"
          autoComplete="username"
          required
          inputMode="text"
          pattern="[a-z0-9_]{3,24}"
          placeholder={t.auth.handlePlaceholder}
          invalid={!!state.error}
        />
        <p className="text-xs leading-relaxed text-faint">{t.auth.handleHelp}</p>
      </div>

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
        <p className="text-xs leading-relaxed text-faint">{t.auth.emailHelp}</p>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="password" className="text-sm font-medium text-foreground">
          {t.auth.passwordLabel}
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

      <Turnstile action="signup" />

      <button
        type="submit"
        disabled={isPending}
        className={cn(buttonVariants({ variant: "primary", size: "lg" }), "w-full")}
      >
        {isPending ? t.auth.signupSubmitting : t.auth.signupSubmit}
      </button>

      <p className="text-xs leading-relaxed text-faint">{t.auth.privacyNote}</p>
    </form>
  );
}
