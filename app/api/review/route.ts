import { NextResponse } from "next/server";
import { REVIEW_DIMENSIONS } from "@/lib/types";

// Review submission endpoint. v1 persistence is a MODERATION QUEUE with zero extra infra:
// if a GitHub token is configured, each submission becomes a labelled issue in the repo
// (human moderation before anything is published — the neutral-host + legal posture).
// Without a token it still validates and accepts (logged), so the flow works end-to-end
// on a fresh deploy; wire GITHUB_TOKEN + GITHUB_REPO to turn on the durable queue.

interface Submission {
  actorSlug?: string;
  eventSlug?: string;
  overall: number;
  dimensions: { key: string; rating: number }[];
  headline: string;
  body: string;
  attendedProof?: string; // how they can prove attendance (evidence description / link)
  author?: string; // optional pseudonym
  contact?: string; // private, for verification only — never published
  website?: string; // honeypot (must be empty)
}

function validate(input: unknown): { ok: true; value: Submission } | { ok: false; error: string } {
  if (typeof input !== "object" || input === null) return { ok: false, error: "Invalid payload." };
  const s = input as Record<string, unknown>;
  if (typeof s.website === "string" && s.website.trim() !== "") return { ok: false, error: "Rejected." }; // honeypot
  const overall = Number(s.overall);
  if (!Number.isFinite(overall) || overall < 1 || overall > 5) return { ok: false, error: "Overall rating must be 1–5." };
  const headline = typeof s.headline === "string" ? s.headline.trim() : "";
  if (headline.length < 6 || headline.length > 160) return { ok: false, error: "Headline must be 6–160 characters." };
  const body = typeof s.body === "string" ? s.body.trim() : "";
  if (body.length < 40 || body.length > 6000) return { ok: false, error: "Please describe what happened (40–6000 characters)." };
  if (!s.actorSlug && !s.eventSlug) return { ok: false, error: "Pick an organizer or event to review." };
  const validKeys = new Set(REVIEW_DIMENSIONS.map((d) => d.key));
  const dimensions = Array.isArray(s.dimensions)
    ? s.dimensions
        .filter((d): d is { key: string; rating: number } => !!d && typeof (d as { key?: unknown }).key === "string")
        .filter((d) => validKeys.has(d.key) && Number.isFinite(Number(d.rating)))
        .map((d) => ({ key: d.key, rating: Math.max(1, Math.min(5, Math.round(Number(d.rating)))) }))
    : [];
  return {
    ok: true,
    value: {
      actorSlug: typeof s.actorSlug === "string" ? s.actorSlug : undefined,
      eventSlug: typeof s.eventSlug === "string" ? s.eventSlug : undefined,
      overall: Math.round(overall),
      dimensions,
      headline,
      body,
      attendedProof: typeof s.attendedProof === "string" ? s.attendedProof.slice(0, 2000) : undefined,
      author: typeof s.author === "string" ? s.author.slice(0, 60) : undefined,
      contact: typeof s.contact === "string" ? s.contact.slice(0, 200) : undefined,
    },
  };
}

async function persist(sub: Submission): Promise<{ queued: boolean }> {
  const token = process.env.GITHUB_TOKEN;
  const repo = process.env.GITHUB_REPO; // "owner/name"
  if (!token || !repo) {
    console.log("[review] received (no queue configured):", JSON.stringify({ ...sub, contact: sub.contact ? "[redacted]" : undefined }));
    return { queued: false };
  }
  const target = sub.actorSlug ? `organizer:${sub.actorSlug}` : `event:${sub.eventSlug}`;
  const title = `Pending review — ${target} — ${sub.headline}`.slice(0, 120);
  const dims = sub.dimensions.map((d) => `- ${d.key}: ${d.rating}/5`).join("\n");
  const bodyMd = [
    `**Target:** ${target}`,
    `**Overall:** ${sub.overall}/5`,
    `**Dimensions:**\n${dims || "(none)"}`,
    `**Headline:** ${sub.headline}`,
    "",
    `**Body:**\n${sub.body}`,
    "",
    `**Attendance proof (attendee's words):** ${sub.attendedProof ?? "(none provided)"}`,
    `**Author pseudonym:** ${sub.author ?? "(anonymous)"}`,
    `**Private contact (for verification only — do not publish):** ${sub.contact ?? "(none)"}`,
    "",
    "_Auto-filed by the submission form. Verify attendance, then publish (or reject) per the moderation policy._",
  ].join("\n");
  const res = await fetch(`https://api.github.com/repos/${repo}/issues`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, body: bodyMd, labels: ["pending-review"] }),
  });
  if (!res.ok) {
    console.error("[review] queue failed:", res.status, await res.text().catch(() => ""));
    return { queued: false };
  }
  return { queued: true };
}

export async function POST(req: Request): Promise<Response> {
  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON." }, { status: 400 });
  }
  const v = validate(json);
  if (!v.ok) return NextResponse.json({ ok: false, error: v.error }, { status: 400 });
  try {
    const { queued } = await persist(v.value);
    return NextResponse.json({
      ok: true,
      queued,
      message:
        "Thank you. Your review has been received and is pending verification. We check that reviewers actually attended before anything is published.",
    });
  } catch (err) {
    console.error("[review] error:", err);
    return NextResponse.json({ ok: false, error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
