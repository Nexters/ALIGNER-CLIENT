import { cn } from "@/shared/lib/cn";
import type { PoseTip } from "@/entities/course";
import { StarIcon } from "@/shared/ui/icons";

export interface PoseTipCardProps {
  tip: PoseTip;
  className?: string;
}

export default function PoseTipCard({ tip, className }: PoseTipCardProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-[2.4rem] rounded-[3.2rem] bg-primary-400 px-[1.4rem] py-[2rem]",
        className,
      )}
    >
      <StarIcon className="size-[2.4rem]" />
      <p className="typo-footnote-emphasized whitespace-pre-line text-primary-900">{tip.message}</p>
    </div>
  );
}
