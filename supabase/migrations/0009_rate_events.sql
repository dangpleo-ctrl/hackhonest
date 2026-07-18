-- HackHonest — anti-spam rate-limiting store
--
-- One append-only table (`rate_events`) records a row per ACCEPTED signup /
-- forum thread / forum reply / review, keyed by client IP and (when signed in)
-- account. A SECURITY DEFINER function (`check_rate_limit`) does the windowed
-- count and the insert together, so the app never touches the raw table — IP
-- addresses stay server-side only. The table has RLS enabled with NO policies,
-- so the anon/authenticated key cannot read or write it directly; only the
-- function (which runs as its owner) can.
--
-- The application FAILS OPEN when this function is missing or errors, so
-- deploying the app before this migration is applied simply means "no rate
-- limiting yet" — never a broken signup or post.

create table if not exists public.rate_events (
  id          bigint generated always as identity primary key,
  action      text        not null,
  ip          text,
  account_id  uuid,
  created_at  timestamptz not null default now()
);

-- Composite indexes matching the two windowed COUNT predicates below.
create index if not exists rate_events_ip_idx
  on public.rate_events (action, ip, created_at desc);
create index if not exists rate_events_account_idx
  on public.rate_events (action, account_id, created_at desc);
-- Supports pruning old rows (e.g. a scheduled delete of created_at < now()-1d).
create index if not exists rate_events_created_idx
  on public.rate_events (created_at);

-- Lock the table: RLS on + no policies => no direct anon/authenticated access.
alter table public.rate_events enable row level security;
revoke all on public.rate_events from anon, authenticated;

-- Windowed check + record.
--   returns TRUE  => caller is OVER the limit (for IP or account). NO row is
--                    written, so a blocked caller can't keep pushing their own
--                    window forward by hammering the endpoint.
--   returns FALSE => within limits; the event is recorded.
create or replace function public.check_rate_limit(
  p_action          text,
  p_ip              text,
  p_account         uuid,
  p_window_seconds  integer,
  p_max_per_ip      integer,
  p_max_per_account integer
) returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  cutoff     timestamptz := now() - make_interval(secs => p_window_seconds);
  ip_count   integer := 0;
  acct_count integer := 0;
begin
  if p_ip is not null then
    select count(*) into ip_count
      from public.rate_events
     where action = p_action and ip = p_ip and created_at > cutoff;
    if ip_count >= p_max_per_ip then
      return true;
    end if;
  end if;

  if p_account is not null then
    select count(*) into acct_count
      from public.rate_events
     where action = p_action and account_id = p_account and created_at > cutoff;
    if acct_count >= p_max_per_account then
      return true;
    end if;
  end if;

  insert into public.rate_events (action, ip, account_id)
  values (p_action, p_ip, p_account);
  return false;
end;
$$;

revoke all on function
  public.check_rate_limit(text, text, uuid, integer, integer, integer)
  from public;
grant execute on function
  public.check_rate_limit(text, text, uuid, integer, integer, integer)
  to anon, authenticated;
