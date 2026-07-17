import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { isEntryType, type SuggestEntryType } from "@/lib/suggest";
import { SUPABASE_URL, SUPABASE_ANON_KEY } from "@/lib/supabase/config";

// Suggestion submission endpoint (confirm half of assist-and-confirm). The
// reviewed, human-confirmed entry lands in a Supabase table (`entry_suggestions`)
// as a MODERATION QUEUE — every row is `status: 'pending'` until a human reviews
// it and adds it to the directory. The table has RLS with an anon-INSERT-only
// policy (mirrors review_submissions), so the public can submit but nobody can
// read the queue back except via the service role / dashboard. If SUPABASE_URL /
// SUPABASE_ANON_KEY aren't set the route still validates and accepts (logged), so
// the flow works end-to-end on a fresh deploy. Never published unmoderated.

interface Suggestion {
  type: SuggestEntryType;
  name: string;
  website?: string;
  location?: string;
  dates?: string;
  blurb?: string;
  sponsors: string[];
  sourceUrl?: string;
  submittedBy?: string;
}

function isHttpUrl(s: string): boolean {
  try {
    const u = new URL(s);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
}

function validate(input: unknown): { ok: true; value: Suggestion } | { ok: false; error: string } {
  if (typeof input !== "object" || input === null) return { ok: false, error: "Invalid payload." };
  const s = input as Record<string, unknown>;

  // Honeypot — real people leave `hp` empty.
  if (typeof s.hp === "string" && s.hp.trim() !== "") return { ok: false, error: "Rejected." };

  if (!isEntryType(s.type)) return { ok: false, error: "Please choose an entry type." };

  const name = typeof s.name === "string" ? s.name.trim() : "";
  if (name.length < 2 || name.length > 160) return { ok: false, error: "Name must be 2–160 characters." };

  const website = typeof s.website === "string" ? s.website.trim() : "";
  if (website && !isHttpUrl(website)) return { ok: false, error: "Website must be a valid http(s) link." };

  const sourceUrl = typeof s.sourceUrl === "string" ? s.sourceUrl.trim() : "";
  const sponsors = Array.isArray(s.sponsors)
    ? s.sponsors
        .filter((x): x is string => typeof x === "string")
        .map((x) => x.trim())
        .filter(Boolean)
        .slice(0, 20)
        .map((x) => x.slice(0, 120))
    : [];

  return {
    ok: true,
    value: {
      type: s.type,
      name,
      website: website || undefined,
      location: typeof s.location === "string" ? s.location.trim().slice(0, 160) || undefined : undefined,
      dates: typeof s.dates === "string" ? s.dates.trim().slice(0, 120) || undefined : undefined,
      blurb: typeof s.blurb === "string" ? s.blurb.trim().slice(0, 2000) || undefined : undefined,
      sponsors,
      sourceUrl: sourceUrl && isHttpUrl(sourceUrl) ? sourceUrl.slice(0, 500) : undefined,
      submittedBy: typeof s.submittedBy === "string" ? s.submittedBy.trim().slice(0, 120) || undefined : undefined,
    },
  };
}

async function persist(sug: Suggestion): Promise<{ queued: boolean }> {
  // Shared config (NEXT_PUBLIC_* first, SUPABASE_* fallback) — keeps this route
  // on the same env names as the forum so submissions can't silently drop.
  const url = SUPABASE_URL;
  const key = SUPABASE_ANON_KEY; // publishable/anon key — RLS restricts it to INSERT only
  if (!url || !key) {
    console.log("[suggest] received (no store configured):", JSON.stringify({ ...sug }));
    return { queued: false };
  }
  const supabase = createClient(url, key, { auth: { persistSession: false } });
  const { error } = await supabase.from("entry_suggestions").insert({
    type: sug.type,
    name: sug.name,
    website: sug.website ?? null,
    location: sug.location ?? null,
    dates: sug.dates ?? null,
    blurb: sug.blurb ?? null,
    sponsors: sug.sponsors,
    source_url: sug.sourceUrl ?? null,
    submitted_by: sug.submittedBy ?? null,
    // status defaults to 'pending' in the table — a human reviews before adding it.
  });
  if (error) {
    console.error("[suggest] store failed:", error.message);
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
        "Thank you. Your suggestion has been received and is pending review. We check every suggestion before adding it to the directory.",
    });
  } catch (err) {
    console.error("[suggest] error:", err);
    return NextResponse.json({ ok: false, error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
