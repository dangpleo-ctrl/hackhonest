"use client";

import * as React from "react";
import { Sun, Moon } from "lucide-react";
import { useT } from "@/lib/i18n/locale-provider";
import { cn } from "./ui/cn";

type Theme = "light" | "dark";

/**
 * Manual light/dark switch. Overrides the OS default and persists the choice to
 * localStorage under `hh-theme`; the inline script in app/layout.tsx re-applies
 * that value before first paint so a reload never flashes the wrong theme.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const t = useT();
  const [theme, setTheme] = React.useState<Theme | null>(null);

  // Resolve the active theme after mount: an explicit choice on <html> wins,
  // otherwise fall back to what the OS is currently showing.
  React.useEffect(() => {
    const attr = document.documentElement.getAttribute("data-theme");
    if (attr === "light" || attr === "dark") {
      setTheme(attr);
    } else {
      setTheme(
        window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light",
      );
    }
  }, []);

  function toggle() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("hh-theme", next);
    } catch {
      // Private mode can block storage; the switch still works for this session.
    }
  }

  const isDark = theme === "dark";
  const label = isDark ? t.nav.switchToLight : t.nav.switchToDark;

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className={cn(
        "inline-flex size-9 items-center justify-center rounded-md text-muted transition-colors hover:bg-surface-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
        className,
      )}
    >
      {/* Before mount `theme` is null → render Moon on both server and client so
          hydration matches; the effect then corrects it to the real theme. */}
      {isDark ? (
        <Sun aria-hidden="true" className="size-5" />
      ) : (
        <Moon aria-hidden="true" className="size-5" />
      )}
    </button>
  );
}
