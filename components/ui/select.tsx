import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "./cn";

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  /** Renders an error ring + wires aria-invalid for assistive tech. */
  invalid?: boolean;
}

/**
 * Native `<select>` styled to match Input, with a decorative chevron. Native
 * keeps the OS picker (best on mobile) and full keyboard/AT support for free.
 */
export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  function Select({ className, invalid, children, ...props }, ref) {
    return (
      <div className="relative">
        <select
          ref={ref}
          aria-invalid={invalid || undefined}
          className={cn(
            "flex h-10 w-full appearance-none rounded-lg border bg-surface pl-3 pr-9 text-sm text-foreground",
            "transition-colors duration-150",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
            "disabled:cursor-not-allowed disabled:opacity-50",
            invalid
              ? "border-danger focus-visible:ring-danger"
              : "border-border hover:border-border-strong",
            className,
          )}
          {...props}
        >
          {children}
        </select>
        <ChevronDown
          aria-hidden="true"
          className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-faint"
        />
      </div>
    );
  },
);
