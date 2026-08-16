import { useNavigate } from "react-router";
import {
  isCourseCompleted,
  MOCK_COURSE_PROGRESS,
  MOCK_EXERCISES,
  type TodayWorkoutSummary,
} from "@/entities/course";
import { toDailyRoutineExercisePath } from "@/shared/config/routes";
import { CTAButton } from "@/shared/ui/button";
import { CroppedWorkoutImage } from "@/shared/ui/cropped-workout-image";
import { AlarmIcon, FireIcon, HumanIcon } from "@/shared/ui/icons";
import { SequenceItem } from "@/shared/ui/sequence-item";
import { SummaryCard, type SummaryCardChip } from "@/shared/ui/summary-card";
import { TopNavBar } from "@/shared/ui/top-nav-bar";
import yogaImage from "@/shared/assets/images/yoga-1.png";

// TODO: 실제 API 연동 전까지의 목데이터. entities/course 타입에 맞춰 추후 fetch 훅으로 교체한다.
const MOCK_POSE_TITLE = "낙타자세 정복하기";
const MOCK_WORKOUT: TodayWorkoutSummary = {
  minutes: 15,
  exerciseCount: 6,
  setCount: 6,
  kcal: 69,
  imageSrc: yogaImage,
};

export function DailyRoutinePage() {
  const navigate = useNavigate();
  const isCompleted = isCourseCompleted(MOCK_COURSE_PROGRESS);

  const chips: SummaryCardChip[] = [
    { icon: <HumanIcon />, label: `${MOCK_WORKOUT.exerciseCount}개 운동` },
    { icon: <AlarmIcon />, label: `${MOCK_WORKOUT.setCount}개 세트` },
    { icon: <FireIcon />, label: `${MOCK_WORKOUT.kcal}kcal` },
  ];

  return (
    <main className="relative flex min-h-screen flex-col items-center pb-[10rem]">
      <TopNavBar
        onBack={() => navigate(-1)}
        className="w-full"
        children={<span className="typo-headline-emphasized text-black">데일리 루틴</span>}
      />

      <h1 className="mt-[3rem] w-full typo-title-2-5-emphasized text-black">{MOCK_POSE_TITLE}</h1>

      <div className="relative mt-[2rem] h-[30rem] w-full overflow-hidden rounded-[4rem] bg-gray-97">
        <CroppedWorkoutImage src={MOCK_WORKOUT.imageSrc} />
        <SummaryCard
          minutes={MOCK_WORKOUT.minutes}
          chips={chips}
          isCompleted={isCompleted}
          className="absolute inset-0 size-full h-[30rem]"
        />
      </div>

      <div className="mt-[2.8rem] flex w-full flex-col items-start gap-[2.8rem]">
        <h2 className="typo-title-3-emphasized text-black">코스 순서</h2>
        <div className="flex w-full flex-col items-start">
          {MOCK_EXERCISES.map((exercise, index) => (
            <button
              key={exercise.id}
              type="button"
              onClick={() => navigate(toDailyRoutineExercisePath(exercise.id))}
              className="w-full text-left"
            >
              <SequenceItem
                step={index + 1}
                active={index === 0}
                isLast={index === MOCK_EXERCISES.length - 1}
                imageSrc={exercise.imageSrc}
                alt={exercise.name}
                title={exercise.name}
                descriptions={[exercise.category, exercise.setInfo]}
                captionIcon={<FireIcon />}
                caption={`${exercise.kcal}kcal`}
              />
            </button>
          ))}
        </div>
      </div>

      <CTAButton>
        <CTAButton.Single
          disabled={isCompleted}
          // TODO: 운동 시작 플로우 화면 구현 후 실제 라우팅 연결
          onClick={() => {}}
        >
          운동 시작하기
        </CTAButton.Single>
      </CTAButton>
    </main>
  );
}
