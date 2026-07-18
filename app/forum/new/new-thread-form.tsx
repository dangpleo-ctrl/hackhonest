"use client";

import { useActionState } from "react";
import { createThreadAction, type ThreadFormState } from "@/lib/actions/forum";
import { useT } from "@/lib/i18n/locale-provider";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/components/ui/cn";
import { Turnstile } from "@/components/turnstile";

interface Entry {
  slug: string;
  name: string;
}

const INITIAL: ThreadFormState = {};

export function NewThreadForm({
  categories,
  organizers,
  events,
  defaultCategory,
  handle,
}: {
  categories: { id: string; name: string }[];
  organizers: Entry[];
  events: Entry[];
  defaultCategory: string;
  handle: string;
}) {
  const t = useT();
  const [state, formAction, isPending] = useActionState(createThreadAction, INITIAL);

  return (
    <form action={formAction} className="mt-6 flex flex-col gap-5">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="category" className="text-sm font-medium text-foreground">
          {t.forum.categoryLabel}
        </label>
        <Select
          id="category"
          name="category"
          defaultValue={defaultCategory}
          required
          invalid={!!state.error}
        >
          <option value="" disabled>
            {t.forum.categoryPlaceholder}
          </option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </Select>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="title" className="text-sm font-medium text-foreground">
          {t.forum.titleLabel}
        </label>
        <Input
          id="title"
          name="title"
          required
          minLength={6}
          maxLength={160}
          placeholder={t.forum.titlePlaceholder}
          invalid={!!state.error}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="actorSlug" className="text-sm font-medium text-foreground">
          {t.forum.actorLabel}
        </label>
        <Select id="actorSlug" name="actorSlug" defaultValue="">
          <option value="">{t.forum.actorNone}</option>
          {organizers.length > 0 && (
            <optgroup label={t.reviewForm.optgroupOrganizers}>
              {organizers.map((o) => (
                <option key={o.slug} value={o.slug}>
                  {o.name}
                </option>
              ))}
            </optgroup>
          )}
          {events.length > 0 && (
            <optgroup label={t.reviewForm.optgroupEvents}>
              {events.map((e) => (
                <option key={e.slug} value={e.slug}>
                  {e.name}
                </option>
              ))}
            </optgroup>
          )}
        </Select>
        <p className="text-xs leading-relaxed text-faint">{t.forum.actorHelp}</p>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="body" className="text-sm font-medium text-foreground">
          {t.forum.bodyLabel}
        </label>
        <p className="text-xs text-faint">{t.forum.signedInAs(handle)}</p>
        <Textarea
          id="body"
          name="body"
          rows={8}
          required
          minLength={20}
          maxLength={10000}
          placeholder={t.forum.bodyPlaceholder}
          invalid={!!state.error}
        />
        <p className="text-xs leading-relaxed text-faint">{t.forum.bodyHelp}</p>
      </div>

      {state.error && (
        <p role="alert" className="text-sm font-medium text-danger-strong">
          {state.error}
        </p>
      )}

      <Turnstile action="forum_thread" />

      <button
        type="submit"
        disabled={isPending}
        className={cn(buttonVariants({ variant: "primary", size: "lg" }))}
      >
        {isPending ? t.forum.creating : t.forum.createSubmit}
      </button>
    </form>
  );
}
