import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getT } from "@/lib/i18n/server";
import { getSessionUser } from "@/lib/auth";
import { SignupForm } from "./signup-form";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getT();
  return { title: t.auth.signupMetaTitle };
}

function safeNext(next: string | undefined): string {
  return next && next.startsWith("/") && !next.startsWith("//") ? next : "";
}

export default async function SignupPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const next = safeNext((await searchParams).next);
  const user = await getSessionUser();
  if (user) redirect(next || "/forum");

  const t = await getT();
  const loginHref = next ? `/login?next=${encodeURIComponent(next)}` : "/login";

  return (
    <div className="mx-auto flex min-h-[70vh] w-full max-w-md flex-col justify-center px-5 py-12">
      <h1 className="text-2xl font-bold tracking-tight text-foreground">
        {t.auth.signupTitle}
      </h1>
      <p className="mt-2 text-[15px] leading-relaxed text-muted">
        {t.auth.signupSubtitle}
      </p>

      <SignupForm next={next} />

      <p className="mt-6 text-sm text-muted">
        {t.auth.haveAccountPrompt}{" "}
        <Link
          href={loginHref}
          className="font-semibold text-accent-strong hover:underline"
        >
          {t.auth.loginLink}
        </Link>
      </p>
    </div>
  );
}
