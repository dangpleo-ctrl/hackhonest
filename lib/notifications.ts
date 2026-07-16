import "server-only";
import { createClient } from "./supabase/server";

/** Count of the current user's unread notifications (for the nav bell). */
export async function getUnreadCount(userId: string): Promise<number> {
  const supabase = await createClient();
  const { count } = await supabase
    .from("notifications")
    .select("id", { count: "exact", head: true })
    .eq("user_id", userId)
    .eq("read", false);
  return count ?? 0;
}

export interface Notification {
  id: string;
  type: string;
  threadId: string | null;
  threadTitle: string | null;
  actorHandle: string | null;
  read: boolean;
  createdAt: string;
}

type Embedded = { title: string | null } | { title: string | null }[] | null;
function titleOf(t: Embedded): string | null {
  if (!t) return null;
  const x = Array.isArray(t) ? t[0] : t;
  return x?.title ?? null;
}

export async function getNotifications(userId: string, limit = 40): Promise<Notification[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("notifications")
    .select("id, type, thread_id, actor_handle, read, created_at, thread:forum_threads(title)")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(limit);
  return ((data ?? []) as Record<string, unknown>[]).map((n) => ({
    id: n.id as string,
    type: n.type as string,
    threadId: (n.thread_id as string) ?? null,
    threadTitle: titleOf(n.thread as Embedded),
    actorHandle: (n.actor_handle as string) ?? null,
    read: Boolean(n.read),
    createdAt: n.created_at as string,
  }));
}
