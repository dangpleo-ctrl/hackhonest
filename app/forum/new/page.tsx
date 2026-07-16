import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getT } from "@/lib/i18n/server";
import { getSessionUser } from "@/lib/auth";
import { getCategories, linkableEntries } from "@/lib/forum";
import { NewThreadForm } from "./new-thread-form";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getT();
  return { title: t.forum.newMetaTitle };
}

export default async function NewThreadPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const user = await getSessionUser();
  if (!user) redirect("/login?next=/forum/new");

  const t = await getT();
  const [categories] = await Promise.all([getCategories()]);
  const { organizers, events } = linkableEntries();

  const requested = (await searchParams).category ?? "";
  const defaultCategory = categories.some((c) => c.id === requested) ? requested : "";

  return (
    <div className="mx-auto w-full max-w-2xl px-5 py-10">
      <Link
        href="/forum"
        className="text-sm text-muted transition-colors hover:text-foreground"
      >
        {t.forum.backToForum}
      </Link>

      <h1 className="mt-3 text-3xl font-bold tracking-tight text-foreground">
        {t.forum.newTitle}
      </h1>
      <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-muted">
        {t.forum.newSubtitle}
      </p>

      <NewThreadForm
        categories={categories}
        organizers={organizers}
        events={events}
        defaultCategory={defaultCategory}
        handle={user.handle}
      />
    </div>
  );
}
