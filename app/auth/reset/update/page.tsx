import type { Metadata } from "next";
import { getT } from "@/lib/i18n/server";
import { UpdatePasswordForm } from "./update-password-form";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getT();
  return { title: t.auth.newPasswordMetaTitle };
}

// Reached from a password-recovery email link, after /auth/confirm has
// established the recovery session. Rendered for whoever holds that session; the
// server action re-checks the session before changing the password.
export default async function UpdatePasswordPage() {
  const t = await getT();
  return (
    <div className="mx-auto flex min-h-[70vh] w-full max-w-md flex-col justify-center px-5 py-12">
      <h1 className="text-2xl font-bold tracking-tight text-foreground">
        {t.auth.newPasswordTitle}
      </h1>
      <p className="mt-2 text-[15px] leading-relaxed text-muted">
        {t.auth.newPasswordSubtitle}
      </p>

      <UpdatePasswordForm />
    </div>
  );
}
