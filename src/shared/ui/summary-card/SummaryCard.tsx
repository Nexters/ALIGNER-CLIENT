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
}

export default function SummaryCard({
  minutes,
  chips,
  footer,
  className,
  ...props
}: SummaryCardProps) {
  return (
    <div
      className={cn("relative h-[33rem] w-[33.5rem] overflow-hidden rounded-[4rem]", className)}
      {...props}
    >
      {/* 카드 뒤(같은 부모 안의 배경 이미지 등)를 하단으로 갈수록 강하게 블러 처리한다 */}
      <div className="absolute inset-0 [mask-image:linear-gradient(to_bottom,transparent_0%,transparent_35%,black_75%)] backdrop-blur-[1.5rem]" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary-500/40 to-[84.479%]" />
      <div className="relative flex h-full flex-col justify-between p-[1rem]">
        <DurationBadge minutes={minutes} />
        <div className="flex flex-col gap-[2rem] px-[1rem] pb-[1rem]">
          <div className="flex gap-[0.8rem]">
            {chips.map((chip, index) => (
              <InfoChip key={index} icon={chip.icon} label={chip.label} />
            ))}
          </div>
          {footer}
        </div>
      </div>
    </div>
  );
}
