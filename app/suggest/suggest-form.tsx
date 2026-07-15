"use client";

import * as React from "react";
import type { FormEvent } from "react";
import Link from "next/link";
import { Sparkles, TriangleAlert, Info, ExternalLink, CircleCheck } from "lucide-react";
import { useT } from "@/lib/i18n/locale-provider";
import { ENTRY_TYPES, type DuplicateMatch, type ExtractedEntry, type AnalyzeResult } from "@/lib/suggest";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";

type Phase = "idle" | "analyzing" | "form" | "success";
type SubmitStatus = "idle" | "submitting" | "error";
type Notice = { tone: "info" | "warning"; text: string } | null;

/** Prepend https:// if the person omitted a scheme, then validate as http(s). */
function normalizeUrl(raw: string): string | null {
  const s = raw.trim();
  if (!s) return null;
  const candidate = /^https?:\/\//i.test(s) ? s : `https://${s}`;
  try {
    const u = new URL(candidate);
    return u.protocol === "http:" || u.protocol === "https:" ? u.toString() : null;
  } catch {
    return null;
  }
}

function originOf(url: string): string {
  try {
    return new URL(url).origin;
  } catch {
    return "";
  }
}

export function SuggestForm() {
  const t = useT();

  const [phase, setPhase] = React.useState<Phase>("idle");

  // Analyze step.
  const [url, setUrl] = React.useState("");
  const [urlError, setUrlError] = React.useState("");

  // Reviewed entry (editable).
  const [type, setType] = React.useState<(typeof ENTRY_TYPES)[number]>("organizer");
  const [name, setName] = React.useState("");
  const [website, setWebsite] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [dates, setDates] = React.useState("");
  const [blurb, setBlurb] = React.useState("");
  const [sponsorsText, setSponsorsText] = React.useState("");
  const [submittedBy, setSubmittedBy] = React.useState("");
  const [hp, setHp] = React.useState(""); // honeypot — real people leave it empty
  const [sourceUrl, setSourceUrl] = React.useState("");

  const [duplicates, setDuplicates] = React.useState<DuplicateMatch[]>([]);
  const [notice, setNotice] = React.useState<Notice>(null);

  const [submitStatus, setSubmitStatus] = React.useState<SubmitStatus>("idle");
  const [submitError, setSubmitError] = React.useState("");

  function applyExtracted(e: ExtractedEntry) {
    setType(e.type);
    setName(e.name);
    setWebsite(e.website);
    setLocation(e.location);
    setDates(e.dates);
    setBlurb(e.blurb);
    setSponsorsText(e.sponsors.join(", "));
  }

  async function onAnalyze() {
    setUrlError("");
    const normalized = normalizeUrl(url);
    if (!url.trim()) {
      setUrlError(t.suggest.errUrlRequired);
      return;
    }
    if (!normalized) {
      setUrlError(t.suggest.errUrlInvalid);
      return;
    }

    setPhase("analyzing");
    setSourceUrl(normalized);
    try {
      const res = await fetch("/api/analyze-link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: normalized }),
      });
      const data = (await res.json()) as AnalyzeResult;

      if (data.extracted) {
        applyExtracted(data.extracted);
        setDuplicates(data.duplicates ?? []);
        setNotice({ tone: "info", text: t.suggest.prefilledNote });
      } else if (data.aiDisabled) {
        setWebsite(originOf(normalized));
        setDuplicates([]);
        setNotice({ tone: "info", text: t.suggest.aiDisabledNote });
      } else {
        // Soft failure (bad url / fetch / AI error) — the manual form still works.
        setWebsite(originOf(normalized));
        setDuplicates([]);
        setNotice({ tone: "warning", text: t.suggest.analysisFailedNote });
      }
    } catch {
      setWebsite(originOf(normalized));
      setDuplicates([]);
      setNotice({ tone: "warning", text: t.suggest.analysisFailedNote });
    }
    setPhase("form");
  }

  function onFillManually() {
    setNotice(null);
    setDuplicates([]);
    setSourceUrl("");
    setPhase("form");
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitError("");
    if (name.trim().length < 2) {
      setSubmitStatus("error");
      setSubmitError(t.suggestForm.errName);
      return;
    }
    if (website.trim() && !normalizeUrl(website)) {
      setSubmitStatus("error");
      setSubmitError(t.suggestForm.errWebsite);
      return;
    }

    setSubmitStatus("submitting");
    const payload = {
      type,
      name: name.trim(),
      website: website.trim() ? (normalizeUrl(website) ?? website.trim()) : undefined,
      location: location.trim() || undefined,
      dates: type === "event" ? dates.trim() || undefined : undefined,
      blurb: blurb.trim() || undefined,
      sponsors: sponsorsText
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      sourceUrl: sourceUrl || undefined,
      submittedBy: submittedBy.trim() || undefined,
      hp,
    };
    try {
      const res = await fetch("/api/suggest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json()) as { ok: boolean };
      if (res.ok && data.ok) {
        setPhase("success");
      } else {
        setSubmitStatus("error");
        setSubmitError(t.suggestForm.errGeneric);
      }
    } catch {
      setSubmitStatus("error");
      setSubmitError(t.suggestForm.errNetwork);
    }
  }

  function resetAll() {
    setPhase("idle");
    setUrl("");
    setUrlError("");
    setType("organizer");
    setName("");
    setWebsite("");
    setLocation("");
    setDates("");
    setBlurb("");
    setSponsorsText("");
    setSubmittedBy("");
    setHp("");
    setSourceUrl("");
    setDuplicates([]);
    setNotice(null);
    setSubmitStatus("idle");
    setSubmitError("");
  }

  // ── Success ────────────────────────────────────────────────────────────────
  if (phase === "success") {
    return (
      <div className="rounded-xl border border-success/30 bg-success/5 p-6">
        <h2 className="inline-flex items-center gap-2 text-lg font-semibold text-foreground">
          <CircleCheck aria-hidden="true" className="size-5 text-success" />
          {t.suggestForm.successHeading}
        </h2>
        <p className="mt-2 text-[15px] leading-relaxed text-muted">{t.suggestForm.successBody}</p>
        <p className="mt-4 text-sm text-faint">{t.suggestForm.successNote}</p>
        <Button variant="secondary" size="md" className="mt-5" onClick={resetAll}>
          {t.suggestForm.startOver}
        </Button>
      </div>
    );
  }

  const typeLabels: Record<(typeof ENTRY_TYPES)[number], string> = {
    organizer: t.suggestForm.typeOrganizer,
    event: t.suggestForm.typeEvent,
    company: t.suggestForm.typeCompany,
    sponsor: t.suggestForm.typeSponsor,
  };

  return (
    <div className="space-y-8">
      {/* ── Step 1: analyze a link ─────────────────────────────────────────── */}
      <div>
        <label htmlFor="suggest-url" className="block text-sm font-semibold text-foreground">
          {t.suggest.urlLabel}
        </label>
        <p className="mt-0.5 text-xs text-faint">{t.suggest.urlHelp}</p>
        <div className="mt-2 flex flex-col gap-2 sm:flex-row">
          <Input
            id="suggest-url"
            type="url"
            inputMode="url"
            value={url}
            onChange={(ev) => setUrl(ev.target.value)}
            placeholder={t.suggest.urlPlaceholder}
            invalid={!!urlError}
            disabled={phase === "analyzing"}
            className="sm:flex-1"
            onKeyDown={(ev) => {
              if (ev.key === "Enter") {
                ev.preventDefault();
                void onAnalyze();
              }
            }}
          />
          <Button
            type="button"
            size="md"
            onClick={() => void onAnalyze()}
            disabled={phase === "analyzing"}
            className="shrink-0"
          >
            <Sparkles aria-hidden="true" />
            {phase === "analyzing" ? t.suggest.analyzing : t.suggest.analyze}
          </Button>
        </div>
        {urlError && <p className="mt-2 text-sm text-danger">{urlError}</p>}
        {phase === "idle" && (
          <button
            type="button"
            onClick={onFillManually}
            className="mt-3 text-sm font-medium text-accent-strong hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            {t.suggest.fillManually}
          </button>
        )}
      </div>

      {/* ── Step 2: review + confirm ───────────────────────────────────────── */}
      {phase === "form" && (
        <form onSubmit={onSubmit} className="space-y-6 border-t border-border pt-8">
          {/* honeypot */}
          <input
            type="text"
            name="hp"
            value={hp}
            onChange={(ev) => setHp(ev.target.value)}
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="absolute left-[-9999px] h-0 w-0 opacity-0"
          />

          {notice && (
            <p
              className={
                notice.tone === "warning"
                  ? "flex items-start gap-2 rounded-lg border border-warning-border bg-warning-subtle px-4 py-3 text-sm text-warning-strong"
                  : "flex items-start gap-2 rounded-lg border border-accent-border bg-accent-subtle px-4 py-3 text-sm text-accent-strong"
              }
            >
              {notice.tone === "warning" ? (
                <TriangleAlert aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
              ) : (
                <Info aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
              )}
              <span>{notice.text}</span>
            </p>
          )}

          {/* Duplicate warnings */}
          {duplicates.length > 0 && (
            <div className="rounded-xl border border-warning-border bg-warning-subtle p-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-warning-strong">
                <TriangleAlert aria-hidden="true" className="size-4" />
                {t.suggestForm.duplicatesTitle}
              </div>
              <p className="mt-1 text-sm text-muted">{t.suggestForm.duplicatesHelp}</p>
              <ul className="mt-3 space-y-2">
                {duplicates.map((d) => (
                  <li key={`${d.kind}-${d.slug}`} className="text-sm leading-relaxed">
                    <span className="text-muted">{t.suggestForm.duplicatePrefix} </span>
                    <Link
                      href={d.href}
                      target="_blank"
                      className="inline-flex items-center gap-1 font-semibold text-accent-strong hover:underline"
                    >
                      {d.name}
                      <ExternalLink aria-hidden="true" className="size-3.5" />
                    </Link>
                    <span className="text-muted"> {t.suggestForm.duplicateSuffix}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <Field label={t.suggestForm.typeLabel} required>
            <Select value={type} onChange={(ev) => setType(ev.target.value as (typeof ENTRY_TYPES)[number])}>
              {ENTRY_TYPES.map((et) => (
                <option key={et} value={et}>
                  {typeLabels[et]}
                </option>
              ))}
            </Select>
          </Field>

          <Field label={t.suggestForm.nameLabel} required>
            <Input value={name} onChange={(ev) => setName(ev.target.value)} maxLength={160} placeholder={t.suggestForm.namePlaceholder} />
          </Field>

          <div className="grid gap-6 sm:grid-cols-2">
            <Field label={t.suggestForm.websiteLabel}>
              <Input value={website} onChange={(ev) => setWebsite(ev.target.value)} maxLength={300} placeholder={t.suggestForm.websitePlaceholder} />
            </Field>
            <Field label={t.suggestForm.locationLabel}>
              <Input value={location} onChange={(ev) => setLocation(ev.target.value)} maxLength={160} placeholder={t.suggestForm.locationPlaceholder} />
            </Field>
          </div>

          {type === "event" && (
            <Field label={t.suggestForm.datesLabel} help={t.suggestForm.datesHelp}>
              <Input value={dates} onChange={(ev) => setDates(ev.target.value)} maxLength={120} placeholder={t.suggestForm.datesPlaceholder} />
            </Field>
          )}

          <Field label={t.suggestForm.blurbLabel} help={t.suggestForm.blurbHelp}>
            <Textarea value={blurb} onChange={(ev) => setBlurb(ev.target.value)} rows={4} maxLength={2000} placeholder={t.suggestForm.blurbPlaceholder} />
          </Field>

          <Field label={t.suggestForm.sponsorsLabel} help={t.suggestForm.sponsorsHelp}>
            <Input value={sponsorsText} onChange={(ev) => setSponsorsText(ev.target.value)} maxLength={600} placeholder={t.suggestForm.sponsorsPlaceholder} />
          </Field>

          <Field label={t.suggestForm.submittedByLabel} help={t.suggestForm.submittedByHelp}>
            <Input value={submittedBy} onChange={(ev) => setSubmittedBy(ev.target.value)} maxLength={120} placeholder={t.suggestForm.submittedByPlaceholder} />
          </Field>

          {sourceUrl && (
            <p className="truncate text-xs text-faint">
              <Info aria-hidden="true" className="mr-1 inline size-3.5 align-[-2px]" />
              {sourceUrl}
            </p>
          )}

          {submitStatus === "error" && (
            <p className="rounded-lg border border-danger/30 bg-danger/5 px-4 py-3 text-sm text-danger">{submitError}</p>
          )}

          <div className="flex items-center gap-4">
            <Button type="submit" size="lg" disabled={submitStatus === "submitting"}>
              {submitStatus === "submitting" ? t.suggestForm.submitting : t.suggestForm.submit}
            </Button>
            <p className="text-xs text-faint">{t.suggestForm.submitNote}</p>
          </div>
        </form>
      )}
    </div>
  );
}

function Field({
  label,
  help,
  required,
  children,
}: {
  label: string;
  help?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
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
