import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/shared/lib/cn";
import type { ButtonColor } from "./constants/variant";
import { BUTTON_BASE, BUTTON_COLOR, BUTTON_DISABLED } from "./types/theme";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  color?: ButtonColor;
  isLoading?: boolean;
};

export default function Button({
  children,
  color = "primary",
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
      className={cn(BUTTON_BASE, BUTTON_COLOR[color], isDisabled && BUTTON_DISABLED, className)}
      disabled={isDisabled}
      aria-busy={isLoading || undefined}
      {...props}
    >
      {children}
    </button>
  );
}
