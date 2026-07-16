"use client";

import { useActionState } from "react";
import { signInAction, type AuthState } from "@/lib/actions/auth";
import { useT } from "@/lib/i18n/locale-provider";
import { Input } from "@/components/ui/input";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/components/ui/cn";

const INITIAL: AuthState = {};

export function LoginForm({ next }: { next: string }) {
  const t = useT();
  const [state, formAction, isPending] = useActionState(signInAction, INITIAL);

  return (
    <form action={formAction} className="mt-8 flex flex-col gap-5">
      <input type="hidden" name="next" value={next} />

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

      <div className="flex flex-col gap-1.5">
        <label htmlFor="password" className="text-sm font-medium text-foreground">
          {t.auth.passwordLabel}
        </label>
        <Input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
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
        {isPending ? t.auth.loginSubmitting : t.auth.loginSubmit}
      </button>
    </form>
  );
}
