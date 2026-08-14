import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/shared/lib/cn";
import { DurationBadge } from "@/shared/ui/duration-badge";
import { InfoChip } from "@/shared/ui/info-chip";

export interface SummaryCardChip {
  icon: ReactNode;
  label: string;
}

export interface SummaryCardProps extends Omit<ComponentProps<"div">, "children"> {
  /** 좌상단 DurationBadge에 전달되는 분 단위 시간 */
  minutes: number;
  /** 하단에 나열할 정보 카드 목록 */
  chips: SummaryCardChip[];
}

export default function SummaryCard({ minutes, chips, className, ...props }: SummaryCardProps) {
  return (
    <div
      className={cn(
        "relative flex h-[30rem] w-[33.5rem] flex-col justify-between overflow-hidden rounded-[2.4rem] bg-gradient-to-b from-transparent to-primary-500/40 p-[1rem] backdrop-blur-[1.5rem]",
        className,
      )}
      {...props}
    >
      <DurationBadge minutes={minutes} />
      <div className="flex gap-[0.8rem] px-[1rem] pb-[1rem]">
        {chips.map((chip, index) => (
          <InfoChip key={index} icon={chip.icon} label={chip.label} />
        ))}
      </div>
    </div>
  );
}
