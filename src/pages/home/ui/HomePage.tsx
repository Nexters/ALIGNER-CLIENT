import { isHTTPError } from "ky";
import { useNavigate } from "react-router";
import { normalizePoseName, type PoseTip } from "@/entities/course";
import { ROUTES, toDailyRoutinePath } from "@/shared/config/routes";
import { Logo } from "@/shared/ui/icons";
import { useTodayCourse } from "../api/use-today-course";
import { mapTodayCourseResponse } from "../api/map-today-course";
import CourseProgressCard from "./CourseProgressCard";
import PoseChallengeRow from "./PoseChallengeRow";
import PoseTipCard from "./PoseTipCard";
import TodayCourseCard from "./TodayCourseCard";

// Figma 엣지 케이스(node 914:4287) 기준 자세명별 실제 줄바꿈 지점을 그대로 하드코딩한다.
// 자세명 글자수에 따라 줄바꿈 위치가 달라지고(예: 파이어로그만 다른 지점에서 끊김),
// 사이드플랭크/말라사나처럼 한 줄에 들어가는 경우는 Figma에도 수동 줄바꿈이 없다.
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

const DEFAULT_TIP_MESSAGE = "오늘 동작에 집중해 보세요";

function getPoseTip(targetPoseName: string): PoseTip {
  const key = normalizePoseName(targetPoseName) as keyof typeof POSE_TIP_MESSAGES;
  return { message: POSE_TIP_MESSAGES[key] ?? DEFAULT_TIP_MESSAGE };
}

export function HomePage() {
  const navigate = useNavigate();
  const { data, error, isPending } = useTodayCourse();

  // 진행 중인 코스도, 오늘 완주한 코스도 없다(404 IN_PROGRESS_COURSE_NOT_FOUND).
  // 화면 구조는 그대로 두고 수치만 "-"로 표기한다(카드 컴포넌트들이 null을 받아 처리).
  const isNotFound = isHTTPError(error) && error.response.status === 404;

  if (isPending || (!data && !isNotFound)) {
    return null;
  }

  const view = data ? mapTodayCourseResponse(data) : null;
  const tip = data ? getPoseTip(data.targetPoseName) : { message: DEFAULT_TIP_MESSAGE };

  return (
    <main className="relative flex min-h-screen flex-col items-center px-[2rem] pb-[8rem]">
      <header className="flex w-full items-center pr-[1.6rem] pt-[2.7rem] pb-[2.4rem]">
        <Logo className="h-[2.4rem] w-auto shrink-0 text-black" />
      </header>

      <TodayCourseCard
        workout={view?.workout ?? null}
        isCompleted={view?.completed ?? false}
        onStart={() =>
          navigate(data ? toDailyRoutinePath(data.courseId) : ROUTES.courseRecommendation)
        }
      />

      <div className="mt-[1.6rem] flex w-full items-center gap-[1.8rem] rounded-[3.2rem] bg-white py-[0.8rem] pr-[0.8rem] pl-[1.6rem]">
        <CourseProgressCard progress={view?.progress ?? null} className="min-w-[13rem] flex-1" />
        <PoseTipCard tip={tip} className="min-w-[16.3rem] flex-1" />
      </div>

      <PoseChallengeRow onClick={() => navigate(ROUTES.poseChallenge)} className="mt-[4rem]" />
    </main>
  );
}
