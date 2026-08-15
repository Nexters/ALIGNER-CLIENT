import { cn } from "@/shared/lib/cn";
import type { CourseProgress } from "@/entities/course";

export interface CourseProgressCardProps {
  progress: CourseProgress;
  className?: string;
}

export default function CourseProgressCard({ progress, className }: CourseProgressCardProps) {
  const { current, total } = progress;
  const filled = Math.min(Math.max(current, 0), total);
  const percent = total > 0 ? (filled / total) * 100 : 0;

  return (
    <div className={cn("flex flex-col gap-[1.5rem]", className)}>
      <p className="typo-subheadline-emphasized text-gray-10">현재 코스 진행도</p>
      <div className="flex flex-col gap-[0.4rem]">
        <p className="flex items-baseline text-gray-10">
          <span className="typo-title-2-5-emphasized">{current}</span>
          <span className="typo-subheadline-regular">/{total}</span>
        </p>
        <div
          role="progressbar"
          aria-label="현재 코스 진행도"
          aria-valuenow={filled}
          aria-valuemin={0}
          aria-valuemax={total}
          className="relative h-[0.6rem] w-full overflow-hidden rounded-[10rem] bg-gray-98"
        >
          <div
            className="absolute inset-y-0 left-0 rounded-[10rem] bg-secondary-400"
            style={{ width: `${percent}%` }}
          />
        </div>
        <div className="flex items-center justify-between typo-caption-1-regular">
          <span className="text-gray-60">전체 코스</span>
          <span className="text-gray-10">{total}</span>
        </div>
      </div>
    </div>
  );
}
