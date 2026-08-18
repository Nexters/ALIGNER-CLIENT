import { cn } from "@/shared/lib/cn";
import { BackArrowIcon, HumanIcon } from "@/shared/ui/icons";

export interface PoseChallengeRowProps {
  onClick?: () => void;
  className?: string;
}

export default function PoseChallengeRow({ onClick, className }: PoseChallengeRowProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex w-full items-center justify-between rounded-[2rem] bg-white px-[1.6rem] py-[2.3rem]",
        className,
      )}
    >
      <span className="flex items-center gap-[0.8rem]">
        <HumanIcon className="size-[2.4rem] text-secondary-500" />
        <span className="typo-body-emphasized text-gray-10">자세 도전 현황 보기</span>
      </span>
      <BackArrowIcon className="size-[2.4rem] -scale-x-100 text-gray-60" />
    </button>
  );
}
