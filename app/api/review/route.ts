import { NextResponse } from "next/server";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { REVIEW_DIMENSIONS } from "@/lib/types";
import { SUPABASE_URL, SUPABASE_ANON_KEY } from "@/lib/supabase/config";
import { verifyTurnstile } from "@/lib/turnstile";
import { isRateLimited, clientIp } from "@/lib/rate-limit";

// Review submission endpoint. Submissions land in a Supabase table (`review_submissions`)
// as a MODERATION QUEUE — every row is `status: 'pending'` until a human verifies the
// reviewer attended and publishes it (the neutral-host + legal posture). The table has RLS
// with an anon-INSERT-only policy, so the public can submit but nobody can read submissions
// back except via the dashboard. If SUPABASE_URL / SUPABASE_ANON_KEY aren't set the route
// still validates and accepts (logged), so the flow works end-to-end on a fresh deploy.
//
// Anti-spam layers, in order (cheapest first so bots pay before we do):
//   1. Honeypot (`website` must be empty) — free, catches dumb bots.
//   2. Field validation — free.
//   3. Cloudflare Turnstile — one siteverify round-trip; rejects when the token is
//      missing/invalid (skipped only when TURNSTILE_SECRET_KEY isn't configured).
//   4. Per-IP rate limit — one RPC; fails OPEN if the store is unavailable.

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

/**
 * The anon Supabase client (publishable key — RLS restricts it to INSERT on
 * review_submissions and EXECUTE on the rate-limit function). Null when the env
 * isn't configured, so callers degrade gracefully instead of throwing.
 */
function getServiceClient(): SupabaseClient | null {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) return null;
  return createClient(SUPABASE_URL, SUPABASE_ANON_KEY, { auth: { persistSession: false } });
}

async function persist(supabase: SupabaseClient | null, sub: Submission): Promise<{ queued: boolean }> {
  if (!supabase) {
    console.log("[review] received (no store configured):", JSON.stringify({ ...sub, contact: sub.contact ? "[redacted]" : undefined }));
    return { queued: false };
  }
  const { error } = await supabase.from("review_submissions").insert({
    actor_slug: sub.actorSlug ?? null,
    event_slug: sub.eventSlug ?? null,
    overall: sub.overall,
    dimensions: sub.dimensions,
    headline: sub.headline,
    body: sub.body,
    attended_proof: sub.attendedProof ?? null,
    author: sub.author ?? null,
    contact: sub.contact ?? null,
    // status defaults to 'pending' in the table — a human verifies before publishing.
  });
  if (error) {
    console.error("[review] store failed:", error.message);
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

  const ip = clientIp(req.headers);

  // Anti-bot: reject when the Turnstile token doesn't verify. The `code` lets the
  // client show a localized "please complete the anti-robot check" message.
  const captchaToken =
    typeof (json as Record<string, unknown>).captchaToken === "string"
      ? ((json as Record<string, unknown>).captchaToken as string)
      : "";
  const captcha = await verifyTurnstile(captchaToken, ip);
  if (!captcha.success) {
    return NextResponse.json(
      { ok: false, code: "captcha", error: "Please complete the anti-robot check, then try again." },
      { status: 400 },
    );
  }

  const supabase = getServiceClient();

  // Per-IP throttle (reviews are anonymous, so there's no account to key on).
  // Fails open if the store is unavailable — availability wins for this layer.
  if (supabase && (await isRateLimited(supabase, "review", { ip, accountId: null }))) {
    return NextResponse.json(
      { ok: false, code: "rate_limited", error: "You're submitting too often. Please wait a bit and try again." },
      { status: 429 },
    );
  }

  try {
    const { queued } = await persist(supabase, v.value);
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
