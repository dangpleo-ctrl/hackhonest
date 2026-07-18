"use client";

import { useEffect, useRef, useState } from "react";

// Explicit-render mode: we call window.turnstile.render() ourselves so the widget
// works reliably inside React (implicit auto-scan misfires on client re-renders).
const SCRIPT_SRC =
  "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

/** Standard field name Cloudflare uses; the server reads this from FormData. */
export const TURNSTILE_FIELD = "cf-turnstile-response";

interface RenderOptions {
  sitekey: string;
  callback?: (token: string) => void;
  "error-callback"?: () => void;
  "expired-callback"?: () => void;
  theme?: "auto" | "light" | "dark";
  action?: string;
}

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, opts: RenderOptions) => string;
      reset: (id?: string) => void;
      remove: (id: string) => void;
    };
  }
}

let scriptPromise: Promise<void> | null = null;

function loadScript(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.turnstile) return Promise.resolve();
  if (scriptPromise) return scriptPromise;
  scriptPromise = new Promise<void>((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(
      `script[src="${SCRIPT_SRC}"]`,
    );
    if (existing) {
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", () => reject(new Error("load failed")));
      if (window.turnstile) resolve();
      return;
    }
    const s = document.createElement("script");
    s.src = SCRIPT_SRC;
    s.async = true;
    s.defer = true;
    s.addEventListener("load", () => resolve());
    s.addEventListener("error", () => reject(new Error("load failed")));
    document.head.appendChild(s);
  });
  return scriptPromise;
}

/**
 * Cloudflare Turnstile ("are you a robot?") widget.
 *
 * Renders the challenge and mirrors the resulting token into a hidden input
 * (default name `cf-turnstile-response`), so a plain `<form action={...}>`
 * server action picks it up in FormData with no extra wiring. Also calls the
 * optional `onToken` for forms that submit via fetch (e.g. the review form).
 *
 * When NEXT_PUBLIC_TURNSTILE_SITE_KEY is absent it renders nothing; the server
 * verify then treats the action as "not configured" and won't hard-block.
 */
export function Turnstile({
  onToken,
  name = TURNSTILE_FIELD,
  action,
  className,
  resetKey,
}: {
  onToken?: (token: string) => void;
  name?: string;
  action?: string;
  className?: string;
  /**
   * Bump this (e.g. increment a number) to tear down and re-render the widget
   * for a fresh challenge. Turnstile tokens are single-use, so a fetch-based
   * form that already spent its token on a failed submit should re-challenge
   * before the user retries.
   */
  resetKey?: number | string;
}) {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const onTokenRef = useRef(onToken);
  onTokenRef.current = onToken;
  const [token, setToken] = useState("");

  useEffect(() => {
    if (!siteKey) return;
    let cancelled = false;

    loadScript()
      .then(() => {
        if (cancelled || !containerRef.current || !window.turnstile) return;
        if (widgetIdRef.current) return; // guard StrictMode double-invoke
        widgetIdRef.current = window.turnstile.render(containerRef.current, {
          sitekey: siteKey,
          action,
          theme: "auto",
          callback: (t: string) => {
            setToken(t);
            onTokenRef.current?.(t);
          },
          "error-callback": () => {
            setToken("");
            onTokenRef.current?.("");
          },
          "expired-callback": () => {
            setToken("");
            onTokenRef.current?.("");
          },
        });
      })
      .catch(() => {
        // Script blocked (offline / blocker). Server verify decides the outcome.
      });

    return () => {
      cancelled = true;
      const id = widgetIdRef.current;
      if (id && window.turnstile) {
        try {
          window.turnstile.remove(id);
        } catch {
          // already removed
        }
      }
      widgetIdRef.current = null;
    };
  }, [siteKey, action, resetKey]);

  if (!siteKey) return null;

  return (
    <div className={className}>
      <div ref={containerRef} />
      <input type="hidden" name={name} value={token} readOnly />
    </div>
  );
}
