import { MOCK_COURSE_PROGRESS, type Exercise, type TodayWorkoutSummary } from "@/entities/course";
import { CTAButton } from "@/shared/ui/button";
import { AlarmIcon, FireIcon, HumanIcon } from "@/shared/ui/icons";
import { SequenceItem } from "@/shared/ui/sequence-item";
import { SummaryCard, type SummaryCardChip } from "@/shared/ui/summary-card";
import yogaImage from "../assets/yoga-1.png";

// TODO: 실제 API 연동 전까지의 목데이터. entities/course 타입에 맞춰 추후 fetch 훅으로 교체한다.
const MOCK_POSE_TITLE = "낙타자세 정복하기";
const MOCK_WORKOUT: TodayWorkoutSummary = {
  minutes: 15,
  exerciseCount: 6,
  setCount: 6,
  kcal: 69,
  imageSrc: yogaImage,
};
const MOCK_EXERCISES: Exercise[] = [
  {
    id: "1",
    name: "캣카우",
    category: "가동성 웜업",
    setInfo: "1세트/2분",
    kcal: 6,
    imageSrc: yogaImage,
  },
  {
    id: "2",
    name: "캣카우",
    category: "가동성 웜업",
    setInfo: "1세트/2분",
    kcal: 6,
    imageSrc: yogaImage,
  },
  {
    id: "3",
    name: "캣카우",
    category: "가동성 웜업",
    setInfo: "1세트/2분",
    kcal: 6,
    imageSrc: yogaImage,
  },
  {
    id: "4",
    name: "캣카우",
    category: "가동성 웜업",
    setInfo: "1세트/2분",
    kcal: 6,
    imageSrc: yogaImage,
  },
  {
    id: "5",
    name: "캣카우",
    category: "가동성 웜업",
    setInfo: "1세트/2분",
    kcal: 6,
    imageSrc: yogaImage,
  },
  {
    id: "6",
    name: "낙타 자세",
    category: "핵심 자세",
    setInfo: "1세트/2분",
    kcal: 6,
    imageSrc: yogaImage,
  },
];

export function DailyRoutinePage() {
  // 완료 여부는 별도 flag가 아니라 코스 진행도에서 파생시킨다 (홈 화면과 동일한 규칙).
  const isCompleted = MOCK_COURSE_PROGRESS.current >= MOCK_COURSE_PROGRESS.total;

  const chips: SummaryCardChip[] = [
    { icon: <HumanIcon />, label: `${MOCK_WORKOUT.exerciseCount}개 운동` },
    { icon: <AlarmIcon />, label: `${MOCK_WORKOUT.setCount}개 세트` },
    { icon: <FireIcon />, label: `${MOCK_WORKOUT.kcal}kcal` },
  ];

  return (
    <main className="relative flex min-h-screen flex-col items-center pb-[10rem]">
      {/* TODO: 뒤로가기 헤더(TopNavBar) 나중에 연결. 지금은 자리만 표시 */}
      <p className="w-full typo-headline-emphasized text-black">header</p>

      <h1 className="mt-[3rem] w-full typo-title-2-5-emphasized text-black">{MOCK_POSE_TITLE}</h1>

      <div className="relative mt-[2rem] h-[30rem] w-full overflow-hidden rounded-[4rem] bg-gray-97">
        {/* TODO: yoga-1.png 원본이 인물 주위에 여백이 커서 트리밍 박스(416,223,650x828 / 1369x1149) 기준으로 확대·이동해 Figma 크롭 비율(182.7x224.1)에 맞췄다. 실제 API 이미지로 교체 시 제거 */}
        <div className="absolute left-1/2 top-1/2 h-[22.41rem] w-[18.27rem] -translate-x-1/2 -translate-y-1/2 overflow-hidden">
          <img
            src={MOCK_WORKOUT.imageSrc}
            alt=""
            style={{
              position: "absolute",
              left: -112.59,
              top: -60.35,
              width: 370.52,
              height: 310.94,
              maxWidth: "none",
            }}
          />
        </div>
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
            <SequenceItem
              key={exercise.id}
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
