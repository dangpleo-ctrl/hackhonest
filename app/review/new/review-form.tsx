"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { REVIEW_DIMENSIONS } from "@/lib/types";
import { useT } from "@/lib/i18n/locale-provider";
import { StarRating } from "@/components/star-rating";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Turnstile } from "@/components/turnstile";

export type TargetOption = { value: string; label: string; group: "Organizers" | "Events" };

type Status = "idle" | "submitting" | "success" | "error";

export function ReviewForm({ options }: { options: TargetOption[] }) {
  const t = useT();
  const dimCopy = t.reviewDimensions as Record<string, { label: string; help: string }>;
  const [target, setTarget] = useState("");
  const [overall, setOverall] = useState(0);
  const [dims, setDims] = useState<Record<string, number>>({});
  const [headline, setHeadline] = useState("");
  const [body, setBody] = useState("");
  const [proof, setProof] = useState("");
  const [author, setAuthor] = useState("");
  const [contact, setContact] = useState("");
  const [website, setWebsite] = useState(""); // honeypot — real people leave it empty
  const [captchaToken, setCaptchaToken] = useState("");
  const [captchaResetKey, setCaptchaResetKey] = useState(0);
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  const organizers = options.filter((o) => o.group === "Organizers");
  const events = options.filter((o) => o.group === "Events");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!target) return setError(t.reviewForm.errChooseTarget);
    if (overall < 1) return setError(t.reviewForm.errOverall);
    if (headline.trim().length < 6) return setError(t.reviewForm.errHeadline);
    if (body.trim().length < 40) return setError(t.reviewForm.errBody);
    setStatus("submitting");
    setMessage("");
    const [kind, slug] = target.split(":");
    const payload = {
      actorSlug: kind === "organizer" ? slug : undefined,
      eventSlug: kind === "event" ? slug : undefined,
      overall,
      dimensions: REVIEW_DIMENSIONS.map((d) => ({ key: d.key, rating: dims[d.key] ?? 0 })).filter((d) => d.rating > 0),
      headline: headline.trim(),
      body: body.trim(),
      attendedProof: proof.trim(),
      author: author.trim(),
      contact: contact.trim(),
      website,
      captchaToken,
    };
    try {
      const res = await fetch("/api/review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json()) as { ok: boolean; code?: string };
      if (res.ok && data.ok) {
        setStatus("success");
        setMessage("");
      } else {
        // The Turnstile token is single-use and was spent on this attempt —
        // re-challenge so a retry gets a fresh one.
        setCaptchaToken("");
        setCaptchaResetKey((k) => k + 1);
        if (data.code === "captcha") setError(t.reviewForm.errCaptcha);
        else if (data.code === "rate_limited") setError(t.reviewForm.errRateLimited);
        else setError(t.reviewForm.errGeneric);
      }
    } catch {
      setError(t.reviewForm.errNetwork);
    }
  }

  function setError(msg: string) {
    setStatus("error");
    setMessage(msg);
  }

  if (status === "success") {
    return (
      <div className="rounded-xl border border-success/30 bg-success/5 p-6">
        <h2 className="text-lg font-semibold text-foreground">{t.reviewForm.successHeading}</h2>
        <p className="mt-2 text-[15px] leading-relaxed text-muted">{t.reviewForm.successBody}</p>
        <p className="mt-4 text-sm text-faint">{t.reviewForm.successNote}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-8">
      {/* honeypot */}
      <input
        type="text"
        name="website"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
      />

      <Field label={t.reviewForm.targetLabel} required>
        <Select value={target} onChange={(e) => setTarget(e.target.value)} required>
          <option value="">{t.reviewForm.targetPlaceholder}</option>
          {events.length > 0 && (
            <optgroup label={t.reviewForm.optgroupEvents}>
              {events.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </optgroup>
          )}
          {organizers.length > 0 && (
            <optgroup label={t.reviewForm.optgroupOrganizers}>
              {organizers.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </optgroup>
          )}
        </Select>
      </Field>

      <Field label={t.reviewForm.overallLabel} required>
        <StarRating value={overall} onChange={setOverall} size="lg" />
      </Field>

      <Field label={t.reviewForm.dimensionsLabel} help={t.reviewForm.dimensionsHelp}>
        <div className="space-y-3">
          {REVIEW_DIMENSIONS.map((d) => (
            <div key={d.key} className="flex flex-col gap-1 border-b border-border pb-3 last:border-0 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="text-sm font-medium text-foreground">{dimCopy[d.key]?.label ?? d.label}</div>
                <div className="text-xs text-faint">{dimCopy[d.key]?.help ?? d.help}</div>
              </div>
              <StarRating value={dims[d.key] ?? 0} onChange={(v) => setDims((prev) => ({ ...prev, [d.key]: v }))} size="sm" />
            </div>
          ))}
        </div>
      </Field>

      <Field label={t.reviewForm.headlineLabel} required>
        <Input value={headline} onChange={(e) => setHeadline(e.target.value)} maxLength={160} placeholder={t.reviewForm.headlinePlaceholder} />
      </Field>

      <Field label={t.reviewForm.bodyLabel} required help={t.reviewForm.bodyHelp}>
        <Textarea value={body} onChange={(e) => setBody(e.target.value)} rows={8} maxLength={6000} placeholder={t.reviewForm.bodyPlaceholder} />
      </Field>

      <Field label={t.reviewForm.proofLabel} help={t.reviewForm.proofHelp}>
        <Textarea value={proof} onChange={(e) => setProof(e.target.value)} rows={3} maxLength={2000} placeholder={t.reviewForm.proofPlaceholder} />
      </Field>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label={t.reviewForm.authorLabel} help={t.reviewForm.authorHelp}>
          <Input value={author} onChange={(e) => setAuthor(e.target.value)} maxLength={60} placeholder={t.reviewForm.authorPlaceholder} />
        </Field>
        <Field label={t.reviewForm.contactLabel} help={t.reviewForm.contactHelp}>
          <Input value={contact} onChange={(e) => setContact(e.target.value)} maxLength={200} placeholder={t.reviewForm.contactPlaceholder} />
        </Field>
      </div>

      {status === "error" && (
        <p className="rounded-lg border border-danger/30 bg-danger/5 px-4 py-3 text-sm text-danger">{message}</p>
      )}

      <Turnstile action="review" onToken={setCaptchaToken} resetKey={captchaResetKey} />

      <div className="flex items-center gap-4">
        <Button type="submit" size="lg" disabled={status === "submitting"}>
          {status === "submitting" ? t.reviewForm.submitting : t.reviewForm.submit}
        </Button>
        <p className="text-xs text-faint">{t.reviewForm.submitNote}</p>
      </div>
    </form>
  );
}

function Field({ label, help, required, children }: { label: string; help?: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-foreground">
        {label} {required && <span className="text-danger">*</span>}
      </label>
      {help && <p className="mt-0.5 text-xs text-faint">{help}</p>}
      <div className="mt-2">{children}</div>
    </div>
  );
}
