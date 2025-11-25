import * as React from "react";
import { cn } from "@/lib/utils/helpers";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "standard" | "success" | "error" | "warning" | "information";
  size?: "sm" | "md" | "lg";
  dot?: boolean;
  children?: React.ReactNode;
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      className,
      variant = "standard",
      size = "md",
      dot = false,
      children,
      ...props
    },
    reference
  ) => {
    // Base Styles
    const baseStyles =
      "m-1 p-1 inline-flex items-center font-medium rounded-full";

    // Badge Variants
    const variants = {
      standard:
        "bg-[var(--color-gray-100)] text-[var(--color-gray-800)] dark:bg-[var(--color-gray-800)] dark:text-[var(--color-gray-100)]",
      success:
        "bg-[var(--color-green-100)] text-[var(--color-green-800)] dark:bg-[var(--color-green-900)] dark:text-[var(--color-green-100)]",
      error:
        "bg-[var(--color-red-100)] text-[var(--color-red-800)] dark:bg-[var(--color-red-900)] dark:text-[var(--color-red-100)]",
      warning:
        "bg-[var(--color-yellow-100)] text-[var(--color-yellow-800)] dark:bg-[var(--color-yellow-900)] dark:text-[var(--color-yellow-100)]",
      information:
        "bg-[var(--color-blue-100)] text-[var(--color-blue-800)] dark:bg-[var(--color-blue-900)] dark:text-[var(--color-blue-100)]",
    };

    // Badge Sizes
    const sizes = {
      sm: "px-2 py-0.5 text-xs gap-1",
      md: "px-2.5 py-0.5 text-sm gap-1.5",
      lg: "px-3 py-1 text-base gap-2",
    };

    // Dot Sizes
    const dotSizes = {
      sm: "h-1.5 w-1.5",
      md: "h-2 w-2",
      lg: "h-2.5 w-2.5",
    };

    return (
      <span
        ref={reference}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {dot && (
          <span
            className={cn(dotSizes[size], "rounded-full bg-current shrink-0")}
            aria-hidden="true"
          />
        )}
        {children}
      </span>
    );
  }
);

Badge.displayName = "Badge";

export { Badge };
