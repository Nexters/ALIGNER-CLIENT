import { cn } from "@/shared/lib/cn";
import type { CourseProgress } from "@/entities/course";

export interface CourseProgressCardProps {
  /** 진행 중인 코스가 없으면 null. UI 구조는 그대로 두고 수치만 "-"로 표기한다 */
  progress: CourseProgress | null;
  className?: string;
}

export default function CourseProgressCard({ progress, className }: CourseProgressCardProps) {
  const current = progress?.current ?? null;
  const total = progress?.total ?? null;
  const filled = current !== null && total !== null ? Math.min(Math.max(current, 0), total) : 0;
  const percent = total ? (filled / total) * 100 : 0;
  // 코스를 다 완료하면 다음 코스로 넘어가기 전까지 "동작 진행도"로 표기가 바뀐다.
  const isCompleted = current !== null && total !== null && current >= total;
  const label = isCompleted ? "동작 진행도" : "현재 코스 진행도";

  return (
    <div className={cn("flex flex-col gap-[1.5rem]", className)}>
      <p className="typo-subheadline-emphasized text-gray-10">{label}</p>
      <div className="flex flex-col gap-[0.4rem]">
        <p className="flex items-baseline text-gray-10">
          <span className="typo-title-2-5-emphasized">{current ?? "-"}</span>
          <span className="typo-subheadline-regular">/{total ?? "-"}</span>
        </p>
        <div
          role="progressbar"
          aria-label={label}
          aria-valuenow={filled}
          aria-valuemin={0}
          aria-valuemax={total ?? 0}
          className="relative h-[0.6rem] w-full overflow-hidden rounded-[10rem] bg-gray-98"
        >
          <div
            className="absolute inset-y-0 left-0 rounded-[10rem] bg-secondary-400"
            style={{ width: `${percent}%` }}
          />
        </div>
        <div className="flex items-center justify-between typo-caption-1-regular">
          <span className="text-gray-60">전체 코스</span>
          <span className="text-gray-10">{total ?? "-"}</span>
        </div>
      </div>
    </div>
  );
}
