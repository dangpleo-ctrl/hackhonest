import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getT } from "@/lib/i18n/server";
import { getSessionUser } from "@/lib/auth";
import { ResetRequestForm } from "./reset-request-form";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getT();
  return { title: t.auth.resetMetaTitle };
}

export default async function ResetPage() {
  // A signed-in user changes their password from account settings, not here.
  const user = await getSessionUser();
  if (user) redirect("/account");

  const t = await getT();
  return (
    <div className="mx-auto flex min-h-[70vh] w-full max-w-md flex-col justify-center px-5 py-12">
      <h1 className="text-2xl font-bold tracking-tight text-foreground">
        {t.auth.resetTitle}
      </h1>
      <p className="mt-2 text-[15px] leading-relaxed text-muted">
        {t.auth.resetSubtitle}
      </p>

      <ResetRequestForm />

      <p className="mt-6 text-sm text-muted">
        <Link
          href="/login"
          className="font-semibold text-accent-strong hover:underline"
        >
          {t.auth.resetBackToLogin}
        </Link>
      </p>
    </div>
  );
}
