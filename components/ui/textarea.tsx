import * as React from "react";
import { cn } from "./cn";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Renders an error ring + wires aria-invalid for assistive tech. */
  invalid?: boolean;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea({ className, invalid, rows = 4, ...props }, ref) {
    return (
      <textarea
        ref={ref}
        rows={rows}
        aria-invalid={invalid || undefined}
        className={cn(
          "flex w-full rounded-lg border bg-surface px-3 py-2 text-sm leading-relaxed text-foreground",
          "placeholder:text-faint resize-y",
          "transition-colors duration-150",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
          "disabled:cursor-not-allowed disabled:opacity-50",
          invalid
            ? "border-danger focus-visible:ring-danger"
            : "border-border hover:border-border-strong",
          className,
        )}
        {...props}
      />
    );
  },
);
