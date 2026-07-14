"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { REVIEW_DIMENSIONS } from "@/lib/types";
import { StarRating } from "@/components/star-rating";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";

export type TargetOption = { value: string; label: string; group: "Organizers" | "Events" };

type Status = "idle" | "submitting" | "success" | "error";

export function ReviewForm({ options }: { options: TargetOption[] }) {
  const [target, setTarget] = useState("");
  const [overall, setOverall] = useState(0);
  const [dims, setDims] = useState<Record<string, number>>({});
  const [headline, setHeadline] = useState("");
  const [body, setBody] = useState("");
  const [proof, setProof] = useState("");
  const [author, setAuthor] = useState("");
  const [contact, setContact] = useState("");
  const [website, setWebsite] = useState(""); // honeypot — real people leave it empty
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  const organizers = options.filter((o) => o.group === "Organizers");
  const events = options.filter((o) => o.group === "Events");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!target) return setError("Please choose what you're reviewing.");
    if (overall < 1) return setError("Please give an overall rating.");
    if (headline.trim().length < 6) return setError("Please write a short headline (at least 6 characters).");
    if (body.trim().length < 40) return setError("Please describe what happened (at least 40 characters).");
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
    };
    try {
      const res = await fetch("/api/review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json()) as { ok: boolean; message?: string; error?: string };
      if (res.ok && data.ok) {
        setStatus("success");
        setMessage(data.message ?? "Received. Thank you.");
      } else {
        setError(data.error ?? "Something went wrong. Please try again.");
      }
    } catch {
      setError("Network error. Please try again.");
    }
  }

  function setError(msg: string) {
    setStatus("error");
    setMessage(msg);
  }

  if (status === "success") {
    return (
      <div className="rounded-xl border border-success/30 bg-success/5 p-6">
        <h2 className="text-lg font-semibold text-foreground">Thank you</h2>
        <p className="mt-2 text-[15px] leading-relaxed text-muted">{message}</p>
        <p className="mt-4 text-sm text-faint">
          We verify that reviewers actually attended before anything is published. Your identity is stored
          separately from your review and is never shown.
        </p>
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

      <Field label="What are you reviewing?" required>
        <Select value={target} onChange={(e) => setTarget(e.target.value)} required>
          <option value="">Choose an organizer or event…</option>
          {events.length > 0 && (
            <optgroup label="Events">
              {events.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </optgroup>
          )}
          {organizers.length > 0 && (
            <optgroup label="Organizers">
              {organizers.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </optgroup>
          )}
        </Select>
      </Field>

      <Field label="Overall rating" required>
        <StarRating value={overall} onChange={setOverall} size="lg" />
      </Field>

      <Field label="Score what actually happened" help="Skip any that don't apply.">
        <div className="space-y-3">
          {REVIEW_DIMENSIONS.map((d) => (
            <div key={d.key} className="flex flex-col gap-1 border-b border-border pb-3 last:border-0 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="text-sm font-medium text-foreground">{d.label}</div>
                <div className="text-xs text-faint">{d.help}</div>
              </div>
              <StarRating value={dims[d.key] ?? 0} onChange={(v) => setDims((prev) => ({ ...prev, [d.key]: v }))} size="sm" />
            </div>
          ))}
        </div>
      </Field>

      <Field label="Headline" required>
        <Input value={headline} onChange={(e) => setHeadline(e.target.value)} maxLength={160} placeholder="One line: what should the next builder know?" />
      </Field>

      <Field label="What happened?" required help="State the facts first, then your view. Attach evidence for any hard claim (a promised prize, an undelivered credit).">
        <Textarea value={body} onChange={(e) => setBody(e.target.value)} rows={8} maxLength={6000} placeholder="I attended [event]. They promised… I received… Here is what I can show…" />
      </Field>

      <Field label="How can you prove you attended?" help="For our verification only — never published. e.g. a Devpost project link, a confirmation email, a Discord handle, or a photo.">
        <Textarea value={proof} onChange={(e) => setProof(e.target.value)} rows={3} maxLength={2000} placeholder="Link or description of your proof of participation" />
      </Field>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Display name (optional)" help="A pseudonym shown with your review. Leave blank to post as anonymous.">
          <Input value={author} onChange={(e) => setAuthor(e.target.value)} maxLength={60} placeholder="e.g. Verified participant" />
        </Field>
        <Field label="Private contact (optional)" help="Only for verification. Never shown, never shared.">
          <Input value={contact} onChange={(e) => setContact(e.target.value)} maxLength={200} placeholder="email or handle" />
        </Field>
      </div>

      {status === "error" && (
        <p className="rounded-lg border border-danger/30 bg-danger/5 px-4 py-3 text-sm text-danger">{message}</p>
      )}

      <div className="flex items-center gap-4">
        <Button type="submit" size="lg" disabled={status === "submitting"}>
          {status === "submitting" ? "Submitting…" : "Submit for verification"}
        </Button>
        <p className="text-xs text-faint">Reviews are checked before they&rsquo;re published.</p>
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
