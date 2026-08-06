import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/shared/lib/cn";
import type { ButtonColor, ButtonSize } from "./constants/variant";
import { BUTTON_BASE, BUTTON_COLOR, BUTTON_DISABLED, BUTTON_SIZE } from "./types/theme";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  color?: ButtonColor;
  size?: ButtonSize;
  isLoading?: boolean;
};

export default function Button({
  children,
  color = "primary",
  size = "large",
  disabled = false,
  isLoading = false,
  type = "button",
  className,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || isLoading;
  return (
    <button
      type={type}
      className={cn(
        BUTTON_BASE,
        BUTTON_SIZE[size],
        BUTTON_COLOR[color],
        isDisabled && BUTTON_DISABLED,
        className,
      )}
      disabled={isDisabled}
      aria-busy={isLoading || undefined}
      {...props}
    >
      {children}
    </button>
  );
}
