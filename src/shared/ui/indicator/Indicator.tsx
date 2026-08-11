import type { ComponentProps } from "react";
import { cn } from "@/shared/lib/cn";

export interface IndicatorProps extends ComponentProps<"div"> {
  total: number;
  /** 현재 단계 (1-based). 0이면 아무 칸도 채우지 않는다 */
  current: number;
  /** progressbar의 aria-label */
  label?: string;
}

export default function Indicator({ total, current, label, className, ...props }: IndicatorProps) {
  const filled = Math.min(Math.max(current, 0), total);

  return (
    <div
      role="progressbar"
      aria-label={label ?? "진행 단계"}
      aria-valuenow={filled}
      aria-valuemin={0}
      aria-valuemax={total}
      className={cn("flex w-full gap-5", className)}
      {...props}
    >
      {Array.from({ length: total }, (_, index) => (
        <span
          key={index}
          className={cn("h-1 flex-1", index < filled ? "bg-bg-inverse" : "bg-bg-muted")}
        />
      ))}
    </div>
  );
}
