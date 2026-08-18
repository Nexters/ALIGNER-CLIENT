import { cn } from "@/shared/lib/cn";
import { Button } from "@/shared/ui/button";

export interface HomeEmptyCourseCardProps {
  onRecommend?: () => void;
  className?: string;
}

// 진행 중이거나 오늘 완주한 코스가 없을 때(GET /courses/today 404) 보여주는 빈 상태.
// Figma에 이 상태 디자인이 없어 TodayCourseCard와 같은 크기의 카드로 임시 구성한다.
export default function HomeEmptyCourseCard({ onRecommend, className }: HomeEmptyCourseCardProps) {
  return (
    <div
      className={cn(
        "flex h-[33rem] w-full flex-col items-center justify-center gap-[2rem] rounded-[4rem] bg-gray-97 px-[2rem] text-center",
        className,
      )}
    >
      <p className="typo-subheadline-regular text-gray-60">아직 진행 중인 코스가 없어요</p>
      <Button color="primary" size="medium" onClick={onRecommend}>
        코스 추천받기
      </Button>
    </div>
  );
}
