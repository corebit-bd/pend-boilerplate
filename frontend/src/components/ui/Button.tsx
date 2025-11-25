import * as React from "react";
import { cn } from "@/lib/utils/helpers";
import { Spinner } from "./Spinner";
import { Icon } from "./Icon";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "tertiary" | "outline" | "danger";
  size?: "sm" | "md" | "lg" | "xl" | "2xl";
  icon?: React.ReactNode;
  iconPosition?: "leading" | "trailing" | "dot" | "only";
  isLoading?: boolean;
  fullWidth?: boolean;
  loadingText?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      icon,
      iconPosition = "leading",
      isLoading = false,
      fullWidth = false,
      disabled,
      children,
      loadingText,
      type = "button",
      ...props
    },
    reference
  ) => {

    // Base Styles
    const baseStyles =
      "m-1 p-1 inline-flex items-center justify-center font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60";

    // Button Variants
    const variants = {
      primary:
        "bg-(--color-blue-600) text-white hover:bg-(--color-blue-700) active:bg-(--color-blue-800) focus-visible:ring-(--color-blue-500)",
      secondary:
        "bg-(--color-purple-600) text-white hover:bg-(--color-purple-700) active:bg-(--color-purple-800) focus-visible:ring-(--color-purple-500)",
      tertiary:
        "bg-transparent text-(--color-gray-900) hover:bg-(--color-gray-100) active:bg-(--color-gray-200) focus-visible:ring-(--color-gray-400) dark:text-white dark:hover:bg-(--color-gray-800)",
      outline:
        "border-2 border-(--color-gray-300) bg-transparent text-(--color-gray-900) hover:bg-(--color-gray-100) active:bg-(--color-gray-200) focus-visible:ring-(--color-gray-400) dark:text-white dark:border-(--color-gray-600) dark:hover:bg-(--color-gray-800)",
      danger:
        "bg-(--color-red-600) text-white hover:bg-(--color-red-700) active:bg-(--color-red-800) focus-visible:ring-(--color-red-500)",
    };

    // Button Sizes
    const sizes = {
      sm: "h-9 px-3 text-sm rounded-md gap-2",
      md: "h-10 px-4 text-base rounded-md gap-2",
      lg: "h-11 px-6 text-lg rounded-lg gap-2",
      xl: "h-12 px-8 text-xl rounded-lg gap-3",
      "2xl": "h-14 px-10 text-2xl rounded-xl gap-3",
    };

    // Map Button Sizes to Icon / Spinner Sizes
    const iconSizeMap = {
      sm: "sm" as const,
      md: "md" as const,
      lg: "lg" as const,
      xl: "xl" as const,
      "2xl": "2xl" as const,
    };

    // Dot Sizes
    const dotSizes = {
      sm: "h-2 w-2",
      md: "h-2.5 w-2.5",
      lg: "h-2.5 w-2.5",
      xl: "h-3 w-3",
      "2xl": "h-3.5 w-3.5",
    };

    // Button States
    const isDisabled = disabled || isLoading;
    const isIconOnly = iconPosition === "only";
    const isDot = iconPosition === "dot";
    const showIcon = icon && !isLoading && !isDot;
    const showDot = isDot && !isLoading;
    const showLoadingSpinner = isLoading;

    // Padding for Icon Only Buttons
    const iconOnlyPadding = {
      sm: "px-2",
      md: "px-2.5",
      lg: "px-3",
      xl: "px-3.5",
      "2xl": "px-4",
    };

    return (
      <button
        ref={reference}
        type={type}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          isIconOnly && iconOnlyPadding[size],
          fullWidth && "w-full",
          className
        )}
        disabled={isDisabled}
        aria-busy={isLoading}
        aria-disabled={isDisabled}
        {...props}
      >
        {/* Loading Spinner */}
        {showLoadingSpinner && <Spinner size={iconSizeMap[size]} />}

        {/* Dot Indicator */}
        {showDot && (
          <span
            className={cn(dotSizes[size], "rounded-full bg-current shrink-0")}
            aria-hidden="true"
          />
        )}

        {/* Leading Icon */}
        {showIcon && iconPosition === "leading" && (
          <Icon icon={icon} size={iconSizeMap[size]} />
        )}

        {/* Icon Only */}
        {showIcon && isIconOnly && (
          <Icon icon={icon} size={iconSizeMap[size]} />
        )}

        {/* Button Text */}
        {!isIconOnly && (
          <span className={isLoading && loadingText ? "sr-only" : undefined}>
            {children}
          </span>
        )}

        {/* Trailing Icon */}
        {showIcon && iconPosition === "trailing" && (
          <Icon icon={icon} size={iconSizeMap[size]} />
        )}

        {/* Custom Loading Text */}
        {isLoading && loadingText && !isIconOnly && <span>{loadingText}</span>}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };