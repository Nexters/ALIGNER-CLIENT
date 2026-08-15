import type { CourseProgress, PoseTip, TodayWorkoutSummary } from "@/entities/course";
import todayCourseImage from "../assets/today-course.png";
import CourseProgressCard from "./CourseProgressCard";
import PoseChallengeRow from "./PoseChallengeRow";
import PoseTipCard from "./PoseTipCard";
import TodayCourseCard from "./TodayCourseCard";

// TODO: 실제 API 연동 전까지의 목데이터. entities/course 타입에 맞춰 추후 fetch 훅으로 교체한다.
const MOCK_WORKOUT: TodayWorkoutSummary = {
  minutes: 15,
  exerciseCount: 6,
  setCount: 6,
  kcal: 69,
  imageSrc: todayCourseImage,
};
const MOCK_PROGRESS: CourseProgress = { current: 1, total: 6 };
const MOCK_TIP: PoseTip = { message: "낙타 자세는 등과 골반\n근육에 집중해 보세요" };

export function HomePage() {
  return (
    <main className="relative flex min-h-screen flex-col items-center pt-[5.4rem] pb-[8rem]">
      {/* TODO: 로고 에셋 적용 */}
      <h1 className="w-full typo-headline-emphasized text-gray-10">ALIGNER</h1>

      <TodayCourseCard
        workout={MOCK_WORKOUT}
        ctaLabel="오늘 운동 시작하기"
        // TODO: 코스 처방 플로우(#40) 구현 후 실제 라우팅 연결
        onStart={undefined}
        className="mt-[2rem]"
      />

      <div className="mt-[1.6rem] flex w-full items-center gap-[1.8rem] rounded-[3.2rem] bg-white py-[0.8rem] pr-[0.8rem] pl-[1.6rem]">
        <CourseProgressCard progress={MOCK_PROGRESS} className="w-[13rem]" />
        <PoseTipCard tip={MOCK_TIP} className="w-[16.3rem]" />
      </div>

      {/* TODO: 자세 도전 현황 화면 구현 후 실제 라우팅 연결 */}
      <PoseChallengeRow className="mt-[4rem]" />
    </main>
  );
}
