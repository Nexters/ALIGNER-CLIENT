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
  /** 정보 카드 아래에 놓일 영역 (예: CTA 버튼). 문구/동작은 호출부 책임 */
  footer?: ReactNode;
  /** true면 완료 상태 그라데이션(tertiary-400)을, false면 기본 그라데이션(primary-500)을 사용한다 */
  isCompleted?: boolean;
}

export default function SummaryCard({
  minutes,
  chips,
  footer,
  isCompleted = false,
  className,
  ...props
}: SummaryCardProps) {
  return (
    <div
      className={cn("relative h-[33rem] w-[33.5rem] overflow-hidden rounded-[4rem]", className)}
      {...props}
    >
      <div className="absolute inset-0 [mask-image:linear-gradient(to_bottom,transparent_0%,transparent_35%,black_75%)] backdrop-blur-[1.5rem]" />
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-b from-transparent to-[84.479%]",
          isCompleted ? "to-tertiary-400/40" : "to-primary-500/40",
        )}
      />
      <div className="relative flex h-full flex-col justify-between p-[1rem]">
        <DurationBadge minutes={minutes} />
        <div className="flex flex-col gap-[2rem] px-[1rem] pb-[1rem]">
          <div className="flex gap-[0.8rem]">
            {chips.map((chip, index) => (
              <InfoChip
                key={index}
                icon={chip.icon}
                label={chip.label}
                className="w-auto min-w-[9.3rem] flex-1"
              />
            ))}
          </div>
          {footer}
        </div>
      </div>
    </div>
  );
}
