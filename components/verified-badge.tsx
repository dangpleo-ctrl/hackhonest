import * as React from "react";
import { BadgeCheck } from "lucide-react";
import type { VerifyMethod } from "@/lib/types";
import { Badge, type BadgeSize } from "./ui/badge";
import { cn } from "./ui/cn";

/** Human-readable label + one-line explanation for each verification method. */
const METHOD_COPY: Record<VerifyMethod, { label: string; detail: string }> = {
  "founder-attested": {
    label: "Founder-attested",
    detail: "A named founder confirmed this reviewer attended.",
  },
  github: {
    label: "GitHub-verified",
    detail: "Linked to a GitHub account with a matching submission.",
  },
  evidence: {
    label: "Evidence-backed",
    detail: "Reviewer supplied supporting screenshots or documents.",
  },
  "email-dkim": {
    label: "Email-verified",
    detail: "Confirmed via a signed (DKIM) email from the event.",
  },
};

export interface VerifiedBadgeProps {
  method?: VerifyMethod;
  size?: BadgeSize;
  /** Show the specific method name instead of the generic label. */
  showMethod?: boolean;
  className?: string;
}

/**
 * "Verified attendee" trust marker. The `title` carries the plain-English
 * explanation of how this reviewer was verified.
 */
export function VerifiedBadge({
  method,
  size = "sm",
  showMethod = false,
  className,
}: VerifiedBadgeProps) {
  const copy = method ? METHOD_COPY[method] : null;
  const text = showMethod && copy ? copy.label : "Verified attendee";
  const title = copy
    ? `Verified attendee — ${copy.detail}`
    : "Verified attendee";

  return (
    <Badge tone="success" size={size} className={cn(className)} title={title}>
      <BadgeCheck aria-hidden="true" />
      <span>{text}</span>
    </Badge>
  );
}
