"use client";

import * as React from "react";
import { Shield, ShieldCheck, UserPlus } from "lucide-react";
import { useT } from "@/lib/i18n/locale-provider";
import type { StaffMember, StaffRole } from "@/lib/admin";
import {
  addStaffAction,
  setStaffRoleAction,
  removeStaffAction,
  type AddStaffState,
} from "@/lib/actions/moderate";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/components/ui/cn";

function RoleBadge({ role }: { role: StaffRole }) {
  const t = useT();
  return role === "admin" ? (
    <Badge tone="accent" size="sm">
      <ShieldCheck aria-hidden="true" />
      {t.moderate.team.roleAdmin}
    </Badge>
  ) : (
    <Badge tone="neutral" size="sm">
      <Shield aria-hidden="true" />
      {t.moderate.team.roleModerator}
    </Badge>
  );
}

/**
 * Admin-only team panel: lists current staff (admins + moderators), lets an admin
 * change a role or remove someone, and appoints a new teammate by username. All
 * three actions are server actions that re-check isAdmin() and are gated again by
 * RLS on public.admins — a moderator can never reach this UI or its actions.
 */
export function TeamManager({
  staff,
  currentUserId,
}: {
  staff: StaffMember[];
  currentUserId: string | null;
}) {
  const t = useT();
  const [state, formAction] = React.useActionState<AddStaffState, FormData>(
    addStaffAction,
    {},
  );

  const roleLabel = (r: StaffRole) =>
    r === "admin" ? t.moderate.team.roleAdmin : t.moderate.team.roleModerator;

  return (
    <section className="rounded-xl border border-border bg-surface p-5">
      <h2 className="flex items-center gap-2 text-sm font-semibold text-foreground">
        <Shield aria-hidden="true" className="size-4 text-accent" />
        {t.moderate.team.heading}
      </h2>
      <p className="mt-1 text-sm text-muted">{t.moderate.team.subtitle}</p>

      {/* Current staff */}
      {staff.length === 0 ? (
        <p className="mt-4 text-sm text-faint">{t.moderate.team.empty}</p>
      ) : (
        <ul className="mt-4 flex flex-col divide-y divide-border">
          {staff.map((m) => {
            const isSelf = m.userId === currentUserId;
            const nextRole: StaffRole = m.role === "admin" ? "moderator" : "admin";
            const label = m.handle ? `@${m.handle}` : t.moderate.team.unknownUser;
            return (
              <li
                key={m.userId}
                className="flex flex-wrap items-center justify-between gap-3 py-3 first:pt-0 last:pb-0"
              >
                <div className="flex min-w-0 items-center gap-2">
                  <span className="truncate font-medium text-foreground">{label}</span>
                  <RoleBadge role={m.role} />
                  {isSelf && (
                    <span className="text-xs text-faint">({t.moderate.team.you})</span>
                  )}
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <form action={setStaffRoleAction}>
                    <input type="hidden" name="userId" value={m.userId} />
                    <input type="hidden" name="role" value={nextRole} />
                    <button
                      className={buttonVariants({ variant: "ghost", size: "sm" })}
                    >
                      {nextRole === "admin"
                        ? t.moderate.team.makeAdmin
                        : t.moderate.team.makeModerator}
                    </button>
                  </form>
                  <form
                    action={removeStaffAction}
                    onSubmit={(e) => {
                      if (!window.confirm(t.moderate.team.confirmRemove(label)))
                        e.preventDefault();
                    }}
                  >
                    <input type="hidden" name="userId" value={m.userId} />
                    <button
                      className={cn(
                        buttonVariants({ variant: "ghost", size: "sm" }),
                        "text-danger-strong hover:bg-danger-subtle",
                      )}
                    >
                      {t.moderate.team.remove}
                    </button>
                  </form>
                </div>
              </li>
            );
          })}
        </ul>
      )}

      {/* Appoint a new teammate */}
      <form
        action={formAction}
        className="mt-5 border-t border-border pt-5"
        key={state.ok ? "reset" : "form"}
      >
        <h3 className="flex items-center gap-2 text-sm font-medium text-foreground">
          <UserPlus aria-hidden="true" className="size-4 text-faint" />
          {t.moderate.team.addTitle}
        </h3>
        <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-end">
          <label className="flex flex-1 flex-col gap-1">
            <span className="text-xs font-medium text-muted">
              {t.moderate.team.usernameLabel}
            </span>
            <Input
              name="handle"
              autoComplete="off"
              placeholder={t.moderate.team.usernamePlaceholder}
              invalid={state.error === "not_found" || state.error === "no_handle"}
            />
          </label>
          <label className="flex flex-col gap-1 sm:w-44">
            <span className="text-xs font-medium text-muted">
              {t.moderate.team.roleLabel}
            </span>
            <Select name="role" defaultValue="moderator">
              <option value="moderator">{t.moderate.team.roleModerator}</option>
              <option value="admin">{t.moderate.team.roleAdmin}</option>
            </Select>
          </label>
          <button className={buttonVariants({ variant: "primary", size: "md" })}>
            {t.moderate.team.addButton}
          </button>
        </div>
        {state.ok && state.addedHandle && (
          <p className="mt-2 text-sm text-success-strong">
            {t.moderate.team.addedOk(
              `@${state.addedHandle}`,
              roleLabel(state.addedRole ?? "moderator"),
            )}
          </p>
        )}
        {state.error === "not_found" && (
          <p className="mt-2 text-sm text-danger-strong">
            {t.moderate.team.errNotFound}
          </p>
        )}
        {state.error === "no_handle" && (
          <p className="mt-2 text-sm text-danger-strong">
            {t.moderate.team.errNoHandle}
          </p>
        )}
        {state.error === "failed" && (
          <p className="mt-2 text-sm text-danger-strong">
            {t.moderate.team.errFailed}
          </p>
        )}
      </form>
    </section>
  );
}
