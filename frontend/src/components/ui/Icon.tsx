import * as React from "react";
import { cn } from "@/lib/utils/helpers";

export interface IconProps {
  icon: React.ReactNode;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
  className?: string;
  label?: string; // For Accessibility - Screen Readers Only
}

// Icon Sizes
const sizeClasses = {
  xs: "h-3 w-3",
  sm: "h-4 w-4",
  md: "h-5 w-5",
  lg: "h-6 w-6",
  xl: "h-7 w-7",
  "2xl": "h-8 w-8",
};

export const Icon = React.forwardRef<HTMLSpanElement, IconProps>(
  ({ icon, size = "md", className, label }, reference) => {
    return (
      <span
        ref={reference}
        className={cn(
          "inline-flex items-center justify-center shrink-0",
          sizeClasses[size],
          className
        )}
        aria-label={label}
        aria-hidden={!label}
      >
        {icon}
      </span>
    );
  }
);

Icon.displayName = "Icon";
