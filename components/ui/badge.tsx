import * as React from "react";
import { cn } from "./cn";

export type BadgeTone =
  | "neutral"
  | "accent"
  | "success"
  | "warning"
  | "danger"
  | "outline";
export type BadgeSize = "sm" | "md";

const tones: Record<BadgeTone, string> = {
  neutral: "bg-surface-muted text-foreground border-border",
  accent: "bg-accent-subtle text-accent-strong border-accent-border",
  success: "bg-green-50 text-green-800 border-green-200",
  warning: "bg-amber-50 text-amber-800 border-amber-200",
  danger: "bg-red-50 text-red-800 border-red-200",
  outline: "bg-transparent text-muted border-border",
};

const sizes: Record<BadgeSize, string> = {
  sm: "text-xs px-2 py-0.5 gap-1 [&_svg]:size-3",
  md: "text-sm px-2.5 py-1 gap-1.5 [&_svg]:size-3.5",
};

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: BadgeTone;
  size?: BadgeSize;
}

/** Small, calm status pill. Compose an icon + text as children. */
export function Badge({
  className,
  tone = "neutral",
  size = "sm",
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border font-medium leading-none whitespace-nowrap",
        tones[tone],
        sizes[size],
        className,
      )}
      {...props}
    />
  );
}
