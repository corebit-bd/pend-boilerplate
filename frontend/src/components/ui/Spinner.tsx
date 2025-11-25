import * as React from "react";
import { cn } from "@/lib/utils/helpers";

export interface SpinnerProps {
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
  className?: string;
  label?: string;
}

// Spinner Sizes
const sizeClasses = {
  xs: "h-3 w-3",
  sm: "h-4 w-4",
  md: "h-5 w-5",
  lg: "h-6 w-6",
  xl: "h-7 w-7",
  "2xl": "h-8 w-8",
};

export const Spinner = React.forwardRef<HTMLDivElement, SpinnerProps>(
  ({ size = "md", className, label = "Loading" }, ref) => {
    return (
      <div ref={ref} role="status" className="inline-flex items-center">
        <svg
          className={cn("animate-spin", sizeClasses[size], className)}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
        <span className="sr-only">{label}</span>
      </div>
    );
  }
);

Spinner.displayName = "Spinner";
