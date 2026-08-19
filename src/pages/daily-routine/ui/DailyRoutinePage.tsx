import { useNavigate, useSearchParams } from "react-router";
import { toDailyRoutineExercisePath } from "@/shared/config/routes";
import { CTAButton } from "@/shared/ui/button";
import { CroppedWorkoutImage } from "@/shared/ui/cropped-workout-image";
import { AlarmIcon, FireIcon, HumanIcon } from "@/shared/ui/icons";
import { SequenceItem } from "@/shared/ui/sequence-item";
import { Skeleton } from "@/shared/ui/skeleton";
import { SummaryCard, type SummaryCardChip } from "@/shared/ui/summary-card";
import { TopNavBar } from "@/shared/ui/top-nav-bar";
import { useCourse } from "../api/use-course";
import { mapCourseDetailResponse } from "../api/map-course";

export function DailyRoutinePage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const courseIdParam = searchParams.get("courseId");
  const courseId = courseIdParam !== null ? Number(courseIdParam) : null;

  const { data, error, isPending } = useCourse(courseId);

  if (courseId === null) {
    return null;
  }

  if (isPending) {
    return (
      <main className="relative flex min-h-screen flex-col items-center px-[2rem] pb-[10rem]">
        <TopNavBar
          onBack={() => navigate(-1)}
          className="w-full"
          children={<span className="typo-headline-emphasized text-black">데일리 루틴</span>}
        />
        <Skeleton className="mt-[3rem] h-[2.6rem] w-2/3 rounded-[0.6rem]" />
        <Skeleton className="mt-[2rem] h-[30rem] w-full rounded-[4rem]" />
        <div className="mt-[2.8rem] flex w-full flex-col gap-[1.6rem]">
          <Skeleton className="h-[8rem] w-full rounded-[2rem]" />
          <Skeleton className="h-[8rem] w-full rounded-[2rem]" />
          <Skeleton className="h-[8rem] w-full rounded-[2rem]" />
        </div>
      </main>
    );
  }

  if (error || !data) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center px-[2rem]">
        <p className="typo-body-regular text-gray-50">
          정보를 불러오지 못했어요. 잠시 후 다시 시도해 주세요.
        </p>
      </main>
    );
  }

  const { courseName, workout, completed, activeIndex, exercises } = mapCourseDetailResponse(data);

  const chips: SummaryCardChip[] = [
    { icon: <HumanIcon />, label: `${workout.exerciseCount}개 운동` },
    { icon: <AlarmIcon />, label: `${workout.setCount}개 세트` },
    { icon: <FireIcon />, label: `${workout.kcal ?? "-"}kcal` },
  ];

  return (
    <main className="relative flex min-h-screen flex-col items-center px-[2rem] pb-[10rem]">
      <TopNavBar
        onBack={() => navigate(-1)}
        className="w-full"
        children={<span className="typo-headline-emphasized text-black">데일리 루틴</span>}
      />

      <h1 className="mt-[3rem] w-full typo-title-2-5-emphasized text-black">{courseName}</h1>

      <div className="relative mt-[2rem] h-[30rem] w-full overflow-hidden rounded-[4rem] bg-gray-97">
        <CroppedWorkoutImage src={workout.imageSrc} />
        <SummaryCard
          minutes={workout.minutes}
          chips={chips}
          isCompleted={completed}
          className="absolute inset-0 size-full h-[30rem]"
        />
      </div>

      <div className="mt-[2.8rem] flex w-full flex-col items-start gap-[2.8rem]">
        <h2 className="typo-title-3-emphasized text-black">코스 순서</h2>
        <div className="flex w-full flex-col items-start">
          {exercises.map((row, index) => (
            <button
              key={row.exercise.exerciseId}
              type="button"
              onClick={() =>
                navigate(toDailyRoutineExercisePath(String(row.exercise.exerciseId)), {
                  // 상세 API가 느려서, 코스 순서에서 이미 알고 있는 값으로 먼저 그린다.
                  state: {
                    name: row.exercise.name,
                    imageSrc: row.exercise.imageSrc,
                    step: { current: index + 1, total: exercises.length },
                  },
                })
              }
              className="w-full text-left"
            >
              <SequenceItem
                step={index + 1}
                active={index === activeIndex}
                isLast={index === exercises.length - 1}
                imageSrc={row.exercise.imageSrc}
                alt={row.exercise.name}
                title={row.exercise.name}
                descriptions={[row.exercise.category, row.exercise.setInfo]}
                captionIcon={<FireIcon />}
                caption={`${row.exercise.kcal ?? "-"}kcal`}
              />
            </button>
          ))}
        </div>
      </div>

      <CTAButton>
        <CTAButton.Single
          disabled={completed}
          // TODO: 운동 시작 플로우 화면 구현 후 실제 라우팅 연결
          onClick={() => {}}
        >
          운동 시작하기
        </CTAButton.Single>
      </CTAButton>
    </main>
  );
}
