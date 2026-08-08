import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/shared/lib/cn";
import { RADIO_BASE, RADIO_INDICATOR, RADIO_VARIANT } from "./types/theme";
import type { RadioVariant } from "./constants/variant";

type RadioProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant: RadioVariant;
  isSelected?: boolean;
};

export default function Radio({
  variant = "primary",
  isSelected = false,
  type = "button",
  className,
  ...props
}: RadioProps) {
  return (
    <button
      type={type}
      className={cn(
        RADIO_BASE,
        RADIO_VARIANT[variant].shape,
        isSelected ? RADIO_VARIANT[variant].selectedBg : RADIO_VARIANT[variant].unselectedBg,
        className,
      )}
      {...props}
    >
      <div
        aria-hidden="true"
        className={cn(
          RADIO_INDICATOR[variant].shape,
          isSelected ? RADIO_INDICATOR[variant].selectedBg : RADIO_INDICATOR[variant].unselectedBg,
        )}
      />
    </button>
  );
}
