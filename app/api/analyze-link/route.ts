import { NextResponse } from "next/server";
import { actors, events } from "@/lib/data";
import {
  computeDuplicates,
  isEntryType,
  type AnalyzeResult,
  type ExtractedEntry,
} from "@/lib/suggest";

// Analyze-link endpoint (assist half of assist-and-confirm). POST { url }:
//   1. Server-side FETCH the url (hard 8s timeout, ~1MB size cap, http(s) only,
//      private-range hosts blocked) and strip it to readable text.
//   2. Ask OpenRouter (the product-AI budget) to extract the entry as strict JSON.
//   3. DEDUP the extracted name/website against the existing directory.
//   4. Return { extracted, duplicates }.
//
// GRACEFUL BY DESIGN — this route never 500s on a missing key or a fetch/AI
// failure. No OPENROUTER_API_KEY -> { extracted: null, aiDisabled: true }. Any
// fetch/parse/AI error -> { extracted: null, error } with HTTP 200, so the UI
// shows the message and the manual form still works. The OpenRouter key is read
// server-side only and never returned to the client.

const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";
// Cheap, capable default; override per-deploy with OPENROUTER_MODEL.
const OPENROUTER_MODEL = process.env.OPENROUTER_MODEL?.trim() || "openai/gpt-4o-mini";

const FETCH_TIMEOUT_MS = 8_000;
const AI_TIMEOUT_MS = 20_000;
const MAX_BYTES = 1_000_000; // ~1MB response cap
const MAX_TEXT_CHARS = 12_000; // trim page text before the prompt (keeps it cheap)

const SYSTEM_PROMPT = [
  "You extract structured directory data about hackathon events, their organizers,",
  "and their sponsors from the text of a single web page.",
  "Return ONLY a JSON object, no prose, with EXACTLY these keys:",
  '{ "type": "organizer" | "event" | "company" | "sponsor",',
  '  "name": string, "website": string, "location": string,',
  '  "dates": string, "sponsors": string[], "blurb": string }',
  "Rules:",
  "- type: 'event' for a specific hackathon; 'organizer' for the group running it;",
  "  'company'/'sponsor' for a sponsoring/partner business.",
  "- name: the official name of the entity the page is primarily about.",
  "- dates: only for an event (e.g. 'Aug 20-24, 2026'); empty string otherwise.",
  "- sponsors: names of sponsors/partners mentioned; [] if none.",
  "- blurb: one or two NEUTRAL, factual sentences in English describing what it is.",
  "  Do not accuse, rate, or editorialize. No marketing hype.",
  "- Use an empty string for anything you cannot determine. Never invent facts.",
].join("\n");

function str(v: unknown): string {
  return typeof v === "string" ? v : "";
}

function asRecord(v: unknown): Record<string, unknown> | null {
  return typeof v === "object" && v !== null ? (v as Record<string, unknown>) : null;
}

/** http(s) only; returns the parsed URL or null. */
function parseHttpUrl(raw: string): URL | null {
  try {
    const u = new URL(raw.trim());
    return u.protocol === "http:" || u.protocol === "https:" ? u : null;
  } catch {
    return null;
  }
}

/** Block loopback / private / link-local / metadata hosts (basic SSRF guard). */
function isBlockedHost(hostname: string): boolean {
  const h = hostname.toLowerCase().replace(/^\[|\]$/g, "");
  if (h === "localhost" || h.endsWith(".localhost")) return true;
  if (h === "::1" || h === "0.0.0.0") return true;
  if (h === "metadata.google.internal") return true;
  const m = h.match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/);
  if (m) {
    const a = Number(m[1]);
    const b = Number(m[2]);
    if (a === 0 || a === 10 || a === 127) return true;
    if (a === 169 && b === 254) return true; // link-local (incl. cloud metadata)
    if (a === 192 && b === 168) return true;
    if (a === 172 && b >= 16 && b <= 31) return true;
  }
  return false;
}

/** Thrown when a redirect hop resolves to a blocked (private) host. */
class BlockedHostError extends Error {}

/**
 * Fetch a URL, following redirects MANUALLY and re-validating every hop against
 * the SSRF host guard. A public page that 30x-redirects to a private/metadata
 * host is rejected instead of followed (closes the redirect-based SSRF hole).
 */
async function guardedFetch(start: URL, signal: AbortSignal): Promise<Response> {
  let current = start;
  for (let hop = 0; hop < 5; hop++) {
    if (isBlockedHost(current.hostname)) throw new BlockedHostError();
    const res = await fetch(current.toString(), {
      method: "GET",
      redirect: "manual",
      signal,
      headers: {
        "user-agent": "HackHonestBot/1.0 (+https://hackhonest.example)",
        accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      },
    });
    if (res.status >= 300 && res.status < 400) {
      const loc = res.headers.get("location");
      if (!loc) return res;
      let next: URL;
      try {
        next = new URL(loc, current);
      } catch {
        return res;
      }
      if (next.protocol !== "http:" && next.protocol !== "https:") throw new BlockedHostError();
      await res.body?.cancel().catch(() => {});
      current = next;
    } else {
      return res;
    }
  }
  throw new Error("Too many redirects");
}

/** Read a response body up to maxBytes, then stop; decode as UTF-8 (lenient). */
async function readCapped(res: Response, maxBytes: number): Promise<string> {
  const reader = res.body?.getReader();
  if (!reader) return "";
  const chunks: Uint8Array[] = [];
  let total = 0;
  try {
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      if (value) {
        chunks.push(value);
        total += value.byteLength;
        if (total >= maxBytes) {
          await reader.cancel();
          break;
        }
      }
    }
  } catch {
    // Partial read is fine — decode whatever we got.
  }
  const buf = new Uint8Array(total);
  let offset = 0;
  for (const c of chunks) {
    buf.set(c, offset);
    offset += c.byteLength;
  }
  return new TextDecoder("utf-8", { fatal: false }).decode(buf);
}

function decodeEntities(s: string): string {
  return s
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#0*39;|&apos;/gi, "'")
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => safeCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => safeCodePoint(parseInt(d, 10)));
}

function safeCodePoint(n: number): string {
  try {
    return Number.isFinite(n) && n > 0 && n <= 0x10ffff ? String.fromCodePoint(n) : "";
  } catch {
    return "";
  }
}

/** Light tag-strip: pull <title> + meta description, then flatten body text. */
function htmlToText(html: string): { title: string; description: string; text: string } {
  const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  const title = titleMatch ? decodeEntities(titleMatch[1]).replace(/\s+/g, " ").trim() : "";

  const descMatch =
    html.match(/<meta[^>]+name=["']description["'][^>]*content=["']([^"']*)["']/i) ||
    html.match(/<meta[^>]+content=["']([^"']*)["'][^>]*name=["']description["']/i) ||
    html.match(/<meta[^>]+property=["']og:description["'][^>]*content=["']([^"']*)["']/i);
  const description = descMatch ? decodeEntities(descMatch[1]).replace(/\s+/g, " ").trim() : "";

  const text = decodeEntities(
    html
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<noscript[\s\S]*?<\/noscript>/gi, " ")
      .replace(/<!--[\s\S]*?-->/g, " ")
      .replace(/<[^>]+>/g, " "),
  )
    .replace(/\s+/g, " ")
    .trim();

  return { title, description, text };
}

/** Parse a model reply that should be JSON, tolerating code fences / stray prose. */
function parseModelJson(content: string): Record<string, unknown> | null {
  const cleaned = content.trim().replace(/^```(?:json)?/i, "").replace(/```$/, "").trim();
  const direct = asRecord(safeJsonParse(cleaned));
  if (direct) return direct;
  const i = cleaned.indexOf("{");
  const j = cleaned.lastIndexOf("}");
  if (i >= 0 && j > i) return asRecord(safeJsonParse(cleaned.slice(i, j + 1)));
  return null;
}

function safeJsonParse(s: string): unknown {
  try {
    return JSON.parse(s);
  } catch {
    return null;
  }
}

function ok(result: AnalyzeResult): Response {
  return NextResponse.json(result);
}

export async function POST(req: Request): Promise<Response> {
  // Parse request body.
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON." }, { status: 400 });
  }
  const rawUrl = str(asRecord(body)?.url).trim();
  if (!rawUrl) {
    return NextResponse.json({ ok: false, error: "Missing url." }, { status: 400 });
  }

  // No key configured -> AI disabled, manual form still works.
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    return ok({ extracted: null, duplicates: [], aiDisabled: true });
  }

  // Validate + guard the URL.
  const url = parseHttpUrl(rawUrl);
  if (!url) return ok({ extracted: null, duplicates: [], error: "Please enter a valid http(s) link." });
  if (isBlockedHost(url.hostname)) {
    return ok({ extracted: null, duplicates: [], error: "That link points to a private address we can't read." });
  }

  // Fetch the page (hard timeout + size cap).
  let pageText = "";
  let pageTitle = "";
  let pageDescription = "";
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
    let res: Response;
    try {
      res = await guardedFetch(url, controller.signal);
    } finally {
      clearTimeout(timer);
    }

    if (!res.ok) {
      return ok({ extracted: null, duplicates: [], error: `We couldn't read that page (HTTP ${res.status}).` });
    }
    const contentType = (res.headers.get("content-type") || "").toLowerCase();
    if (contentType && !/(text\/html|xml|text\/plain|application\/xhtml)/.test(contentType)) {
      return ok({ extracted: null, duplicates: [], error: "That link isn't a readable web page." });
    }
    const html = await readCapped(res, MAX_BYTES);
    const parsed = htmlToText(html);
    pageTitle = parsed.title;
    pageDescription = parsed.description;
    pageText = parsed.text.slice(0, MAX_TEXT_CHARS);
  } catch (err) {
    if (err instanceof BlockedHostError) {
      return ok({ extracted: null, duplicates: [], error: "That link points to a private address we can't read." });
    }
    return ok({
      extracted: null,
      duplicates: [],
      error: "We couldn't reach that link (it may be slow or unavailable). Fill the form manually.",
    });
  }

  // Ask the model to extract the entry.
  let extracted: ExtractedEntry;
  try {
    const userContent = [
      `URL: ${url.toString()}`,
      pageTitle ? `Page title: ${pageTitle}` : "",
      pageDescription ? `Meta description: ${pageDescription}` : "",
      "Page text (truncated):",
      pageText || "(the page returned no readable text)",
    ]
      .filter(Boolean)
      .join("\n\n");

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), AI_TIMEOUT_MS);
    let aiRes: Response;
    try {
      aiRes = await fetch(OPENROUTER_URL, {
        method: "POST",
        signal: controller.signal,
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          // Optional OpenRouter attribution headers.
          "HTTP-Referer": process.env.NEXT_PUBLIC_SITE_URL || "https://hackhonest.vercel.app",
          "X-Title": "HackHonest",
        },
        body: JSON.stringify({
          model: OPENROUTER_MODEL,
          temperature: 0,
          max_tokens: 700,
          response_format: { type: "json_object" },
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            { role: "user", content: userContent },
          ],
        }),
      });
    } finally {
      clearTimeout(timer);
    }

    if (!aiRes.ok) {
      return ok({
        extracted: null,
        duplicates: [],
        error: "AI analysis is temporarily unavailable. Fill the form manually.",
      });
    }

    const aiJson = asRecord(await aiRes.json());
    const choices = aiJson?.choices;
    const first = Array.isArray(choices) ? asRecord(choices[0]) : null;
    const message = first ? asRecord(first.message) : null;
    const content = str(message?.content);
    const parsed = content ? parseModelJson(content) : null;
    if (!parsed) {
      return ok({
        extracted: null,
        duplicates: [],
        error: "AI couldn't structure that page. Fill the form manually.",
      });
    }

    const rawType = parsed.type;
    const defaultWebsite = `${url.protocol}//${url.host}`;
    const website = str(parsed.website).trim().slice(0, 300) || defaultWebsite;
    extracted = {
      type: isEntryType(rawType) ? rawType : "organizer",
      name: str(parsed.name).trim().slice(0, 160),
      website,
      location: str(parsed.location).trim().slice(0, 160),
      dates: str(parsed.dates).trim().slice(0, 120),
      blurb: str(parsed.blurb).trim().slice(0, 600),
      sponsors: Array.isArray(parsed.sponsors)
        ? parsed.sponsors.map((s) => str(s).trim()).filter(Boolean).slice(0, 20)
        : [],
    };
  } catch {
    return ok({
      extracted: null,
      duplicates: [],
      error: "AI analysis failed. Fill the form manually.",
    });
  }

  // Dedup against the existing directory.
  const duplicates = computeDuplicates(extracted.name, extracted.website, actors, events);
  return ok({ extracted, duplicates });
}
