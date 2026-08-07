import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/shared/lib/cn";
import {
  BUTTON_BASE,
  BUTTON_COLOR,
  BUTTON_DISABLED,
  BUTTON_SIZE,
  type ButtonColor,
  type ButtonSize,
} from "./theme";

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
  return (
    <button
      type={type}
      className={cn(
        BUTTON_BASE,
        BUTTON_SIZE[size],
        BUTTON_COLOR[color],
        disabled && BUTTON_DISABLED,
        className,
      )}
      disabled={disabled}
      aria-busy={isLoading || undefined}
      {...props}
    >
      {children}
    </button>
  );
}
