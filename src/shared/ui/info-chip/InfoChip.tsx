import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/shared/lib/cn";

export interface InfoChipProps extends Omit<ComponentProps<"div">, "children"> {
  /** 아이콘은 호출부가 직접 주입한다 (예: <HumanIcon />) */
  icon: ReactNode;
  /** 아이콘 아래 표시할 텍스트 */
  label: string;
}

export default function InfoChip({ icon, label, className, ...props }: InfoChipProps) {
  return (
    <div
      className={cn(
        "flex h-[5.4rem] flex-1 items-center justify-center overflow-hidden rounded-[1.6rem] bg-primary-50/40",
        className,
      )}
      {...props}
    >
      <div className="flex flex-col items-center gap-[0.2rem]">
        <span className="flex size-[1.8rem] items-center justify-center text-gray-10">{icon}</span>
        <span className="typo-subheadline-regular whitespace-nowrap text-gray-10">{label}</span>
      </div>
    </div>
  );
}
