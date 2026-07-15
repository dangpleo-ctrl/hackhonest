"use client";

import { signOutAction } from "@/lib/actions/auth";
import { useT } from "@/lib/i18n/locale-provider";
import { buttonVariants } from "@/components/ui/button";

/** A form that logs the user out via a server action (clears the auth cookie). */
export function SignOutButton() {
  const t = useT();
  return (
    <form action={signOutAction}>
      <button
        type="submit"
        className={buttonVariants({ variant: "secondary", size: "md" })}
      >
        {t.account.signOut}
      </button>
    </form>
  );
}
