import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/shared/lib/cn";
import {
  RADIO_BASE,
  RADIO_INDICATOR_SELECTED_BG,
  RADIO_INDICATOR_SHAPE,
  RADIO_INDICATOR_UNSELECTED_BG,
  RADIO_SHAPE,
} from "./theme";

type RadioProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isSelected?: boolean;
};

export default function Radio({
  isSelected = false,
  type = "button",
  className,
  ...props
}: RadioProps) {
  return (
    <button type={type} className={cn(RADIO_BASE, RADIO_SHAPE, className)} {...props}>
      <div
        aria-hidden="true"
        className={cn(
          RADIO_INDICATOR_SHAPE,
          isSelected ? RADIO_INDICATOR_SELECTED_BG : RADIO_INDICATOR_UNSELECTED_BG,
        )}
      />
    </button>
  );
}
