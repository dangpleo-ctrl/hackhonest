import type { Metadata } from "next";
import Link from "next/link";
import { getT } from "@/lib/i18n/server";
import { buttonVariants } from "@/components/ui/button";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getT();
  return { title: t.auth.confirmErrorTitle };
}

export default async function AuthErrorPage() {
  const t = await getT();
  return (
    <div className="mx-auto flex min-h-[70vh] w-full max-w-md flex-col justify-center px-5 py-12">
      <h1 className="text-2xl font-bold tracking-tight text-foreground">
        {t.auth.confirmErrorTitle}
      </h1>
      <p className="mt-3 text-[15px] leading-relaxed text-muted">
        {t.auth.confirmErrorBody}
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/login" className={buttonVariants({ variant: "primary" })}>
          {t.auth.loginLink}
        </Link>
        <Link href="/auth/reset" className={buttonVariants({ variant: "ghost" })}>
          {t.auth.forgotPasswordLink}
        </Link>
      </div>
    </div>
  );
}
