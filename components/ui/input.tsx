import * as React from "react";
import { cn } from "./cn";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Renders an error ring + wires aria-invalid for assistive tech. */
  invalid?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  function Input({ className, invalid, type = "text", ...props }, ref) {
    return (
      <input
        ref={ref}
        type={type}
        aria-invalid={invalid || undefined}
        className={cn(
          "flex h-10 w-full rounded-lg border bg-surface px-3 py-2 text-sm text-foreground",
          "placeholder:text-faint",
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
