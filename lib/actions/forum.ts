"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { getSessionUser } from "@/lib/auth";
import { getT } from "@/lib/i18n/server";
import { resolveEntry } from "@/lib/forum";

export interface ThreadFormState {
  error?: string;
}

export interface PostFormState {
  error?: string;
  ok?: boolean;
}

export async function createThreadAction(
  _prev: ThreadFormState,
  formData: FormData,
): Promise<ThreadFormState> {
  const t = await getT();
  const user = await getSessionUser();
  if (!user) return { error: t.forum.errAuth };

  const categoryId = String(formData.get("category") ?? "").trim();
  const title = String(formData.get("title") ?? "").trim();
  const body = String(formData.get("body") ?? "").trim();
  const actorSlugRaw = String(formData.get("actorSlug") ?? "").trim();

  if (!categoryId) return { error: t.forum.errCategory };
  if (title.length < 6 || title.length > 160) return { error: t.forum.errTitle };
  if (body.length < 20 || body.length > 10_000) return { error: t.forum.errBody };

  // Keep only a slug that resolves to a real directory entry.
  const actorSlug = resolveEntry(actorSlugRaw || null)?.slug ?? null;

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("forum_threads")
    .insert({
      category_id: categoryId,
      author_id: user.id,
      title,
      body,
      actor_slug: actorSlug,
    })
    .select("id")
    .single();
  if (error || !data) return { error: t.forum.errGeneric };

  revalidatePath("/forum");
  revalidatePath(`/forum/c/${categoryId}`);
  redirect(`/forum/t/${data.id}`);
}

export async function createPostAction(
  _prev: PostFormState,
  formData: FormData,
): Promise<PostFormState> {
  const t = await getT();
  const user = await getSessionUser();
  if (!user) return { error: t.forum.errAuth };

  const threadId = String(formData.get("threadId") ?? "").trim();
  const body = String(formData.get("body") ?? "").trim();
  if (!threadId) return { error: t.forum.errGeneric };
  if (body.length < 2 || body.length > 10_000) return { error: t.forum.errBody };

  const supabase = await createClient();
  // RLS refuses a reply on a locked thread and enforces author = auth.uid().
  const { error } = await supabase
    .from("forum_posts")
    .insert({ thread_id: threadId, author_id: user.id, body });
  if (error) return { error: t.forum.errGeneric };

  revalidatePath(`/forum/t/${threadId}`);
  return { ok: true };
}
