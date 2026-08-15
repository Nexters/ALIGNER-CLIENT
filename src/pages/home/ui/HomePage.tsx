import { useNavigate } from "react-router";
import {
  isCourseCompleted,
  MOCK_COURSE_PROGRESS,
  type PoseTip,
  type TodayWorkoutSummary,
} from "@/entities/course";
import { ROUTES } from "@/shared/config/routes";
import yogaImage from "../assets/yoga-1.png";
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
  imageSrc: yogaImage,
};

// Figma 엣지 케이스(node 914:4287) 기준 자세명별 실제 줄바꿈 지점을 그대로 하드코딩한다.
// 자세명 글자수에 따라 줄바꿈 위치가 달라지고(예: 파이어로그만 다른 지점에서 끊김),
// 사이드플랭크/말라사나처럼 한 줄에 들어가는 경우는 Figma에도 수동 줄바꿈이 없다.
// TODO: API 연동 후 실제 응답 필드명(예: poseName)에 맞춰 이 표를 유틸 함수로 바꾸고,
// 여기 하드코딩된 케이스들은 그 유틸의 스냅샷/단위 테스트 fixture로 옮긴다.
const POSE_TIP_MESSAGES = {
  휠: "휠 자세는 등과 골반 \n근육에 집중해 보세요",
  사이드플랭크: "사이드플랭크 자세는 등과 골반 근육에 집중해 보세요",
  말라사나: "말라사나 자세는 등과 골반 근육에 집중해 보세요",
  활: "활 자세는 등과 골반 \n근육에 집중해 보세요",
  반보트: "반보트 자세는 등과 골반 \n근육에 집중해 보세요",
  파이어로그: "파이어로그 자세는 등과 \n골반 근육에 집중해 보세요",
  보트: "보트 자세는 등과 골반 \n근육에 집중해 보세요",
  브릿지: "브릿지 자세는 등과 골반 \n근육에 집중해 보세요",
} as const satisfies Record<string, string>;

const MOCK_TIP: PoseTip = { message: POSE_TIP_MESSAGES.휠 };

export function HomePage() {
  const navigate = useNavigate();
  const isCompleted = isCourseCompleted(MOCK_COURSE_PROGRESS);

  return (
    <main className="relative flex min-h-screen flex-col items-center pb-[8rem]">
      {/* TODO: 로고 에셋 적용 */}
      <p className="w-full typo-headline-emphasized text-black">header</p>

      <TodayCourseCard
        workout={MOCK_WORKOUT}
        isCompleted={isCompleted}
        onStart={() => navigate(ROUTES.dailyRoutine)}
        className="mt-[2rem]"
      />

      <div className="mt-[1.6rem] flex w-full items-center gap-[1.8rem] rounded-[3.2rem] bg-white py-[0.8rem] pr-[0.8rem] pl-[1.6rem]">
        <CourseProgressCard progress={MOCK_COURSE_PROGRESS} className="min-w-[13rem] flex-1" />
        <PoseTipCard tip={MOCK_TIP} className="min-w-[16.3rem] flex-1" />
      </div>

      <PoseChallengeRow onClick={() => navigate(ROUTES.poseChallenge)} className="mt-[4rem]" />
    </main>
  );
}
