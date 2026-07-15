"use client";

import * as React from "react";
import { BadgeCheck } from "lucide-react";
import type { VerifyMethod } from "@/lib/types";
import { useT } from "@/lib/i18n/locale-provider";
import { Badge, type BadgeSize } from "./ui/badge";
import { cn } from "./ui/cn";

export interface VerifiedBadgeProps {
  method?: VerifyMethod;
  size?: BadgeSize;
  /** Show the specific method name instead of the generic label. */
  showMethod?: boolean;
  className?: string;
}

/**
 * "Verified attendee" trust marker. The `title` carries the plain-English (or
 * plain-Vietnamese) explanation of how this reviewer was verified.
 */
export function VerifiedBadge({
  method,
  size = "sm",
  showMethod = false,
  className,
}: VerifiedBadgeProps) {
  const t = useT();
  const copy = method ? t.verified.methods[method] : null;
  const text = showMethod && copy ? copy.label : t.verified.attendee;
  const title = copy
    ? `${t.verified.attendee} — ${copy.detail}`
    : t.verified.attendee;

  return (
    <Badge tone="success" size={size} className={cn(className)} title={title}>
      <BadgeCheck aria-hidden="true" />
      <span>{text}</span>
    </Badge>
  );
}
