-- HackHonest — forum notifications
--
-- v1: when someone replies to a thread you started, you get a notification.
-- A bell in the nav shows the unread count; /notifications lists them.

create extension if not exists "pgcrypto";

create table if not exists public.notifications (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid not null references public.profiles (id) on delete cascade, -- recipient
  type         text not null,                                                   -- 'thread_reply'
  thread_id    uuid references public.forum_threads (id) on delete cascade,
  actor_handle text,                                                            -- who triggered it
  read         boolean not null default false,
  created_at   timestamptz not null default now()
);

create index if not exists notifications_user_idx
  on public.notifications (user_id, read, created_at desc);

alter table public.notifications enable row level security;

-- A user reads + marks-read ONLY their own notifications. There is no INSERT
-- policy — rows are created solely by the trigger below (security definer).
drop policy if exists "user reads own notifications" on public.notifications;
create policy "user reads own notifications" on public.notifications
  for select to authenticated using (auth.uid() = user_id);
drop policy if exists "user updates own notifications" on public.notifications;
create policy "user updates own notifications" on public.notifications
  for update to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- On a reply, notify the thread's author (never notify yourself).
create or replace function public.notify_thread_author_on_reply()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_author uuid;
  v_handle text;
begin
  select author_id into v_author from public.forum_threads where id = new.thread_id;
  if v_author is null or v_author = new.author_id then
    return new;
  end if;
  select handle into v_handle from public.profiles where id = new.author_id;
  insert into public.notifications (user_id, type, thread_id, actor_handle)
  values (v_author, 'thread_reply', new.thread_id, v_handle);
  return new;
end;
$$;

drop trigger if exists on_forum_post_notify on public.forum_posts;
create trigger on_forum_post_notify
  after insert on public.forum_posts
  for each row execute function public.notify_thread_author_on_reply();
