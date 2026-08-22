import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router";
import {
  findAdjacentExerciseRow,
  useCourseDetailView,
  type DailyRoutineExerciseRowView,
} from "@/entities/course";
import { useExercise } from "@/entities/exercise";
import { useSession } from "@/entities/session";
import sessionTimerGlow from "@/shared/assets/imgs/session/timer-glow.svg";
import sessionWoodBg from "@/shared/assets/imgs/session/wood-bg.png";
import {
  toCompletePath,
  toDailyRoutineExercisePath,
  toDailyRoutinePath,
} from "@/shared/config/routes";
import { TopNavBar } from "@/shared/ui/top-nav-bar";
import { getActiveVoiceCues } from "../api/active-voice-cues";
import { useCompleteSession } from "../api/use-complete-session";
import { mapExerciseMuscles } from "../api/map-exercise-muscles";
import { SessionCountdownTimer } from "./SessionCountdownTimer";
import { SessionExerciseMedia } from "./SessionExerciseMedia";
import { SessionMuscleBadge } from "./SessionMuscleBadge";

const DEFAULT_DURATION_SECONDS = 30;

// 세션 하나 = 코스 스텝 하나 = 동작 하나다("다른 자세를 하려면 밖에서 다시 시작하기를 눌러야 한다").
// exerciseRecords는 스키마상 배열이지만, 이 세션 안에서 여러 동작을 넘나드는 시나리오는 없다.
//
// 타이머가 끝나면 세션을 완료 처리하고, 이 코스 회차의 마지막 스텝이었을 때만(courseCompleted)
// 완료 리포트(핀포즈 직후에만 뜨는 화면)로 보낸다. 아니면 코스 상세를 다시 조회해 다음 운동을
// 찾아 그 운동의 코스 상세 화면으로 보낸다 — 세션은 그 화면의 "운동 시작하기"를 눌러야 다시 시작된다.
// 이전/다음 동작 버튼도 같은 방식으로, 방금 플레이 중인 스텝 기준 바로 옆 운동의 코스 상세로 보낸다
// (세션을 시작/완료하지 않고 그냥 둘러보기만 한다).
export function SessionPlayerPage() {
  const navigate = useNavigate();
  const params = useParams();
  const sessionId = params.sessionId ? Number(params.sessionId) : null;

  const { data: session } = useSession(sessionId);
  const completeSession = useCompleteSession(sessionId as number);
  const { data: courseDetail } = useCourseDetailView(session?.courseId ?? null);
  const [videoTime, setVideoTime] = useState(0);

  const exerciseRecords = useMemo(() => session?.exerciseRecords ?? [], [session]);
  const currentRecord = exerciseRecords[0] ?? null;
  const totalSeconds = currentRecord?.durationSeconds ?? DEFAULT_DURATION_SECONDS;

  const { data: exercise } = useExercise(currentRecord?.exerciseId ?? null);
  const { front: frontMuscles, back: backMuscles } = useMemo(
    () => mapExerciseMuscles(exercise?.muscles ?? []),
    [exercise],
  );
  const { current: currentCue, next: nextCue } = getActiveVoiceCues(
    exercise?.voiceCues ?? [],
    videoTime,
    totalSeconds,
  );

  const navigateToExerciseDetail = (
    courseId: number,
    index: number,
    row: DailyRoutineExerciseRowView,
    total: number,
  ) => {
    navigate(toDailyRoutineExercisePath(String(row.exercise.exerciseId)), {
      state: {
        courseId,
        stepOrder: row.stepOrder,
        name: row.exercise.name,
        imageSrc: row.exercise.imageSrc,
        step: { current: index + 1, total },
      },
    });
  };

  const goToCourseDetail = () => {
    if (!session?.courseId) return;
    const currentIndex = courseDetail?.exercises.findIndex(
      (row) => row.stepOrder === session.stepOrder,
    );
    if (courseDetail && currentIndex !== undefined && currentIndex !== -1) {
      navigateToExerciseDetail(
        session.courseId,
        currentIndex,
        courseDetail.exercises[currentIndex],
        courseDetail.exercises.length,
      );
      return;
    }
    navigate(toDailyRoutinePath(session.courseId));
  };

  const goToAdjacentExercise = (direction: "previous" | "next") => {
    if (!session?.courseId || !session?.stepOrder || !courseDetail) return;
    const adjacent = findAdjacentExerciseRow(courseDetail.exercises, session.stepOrder, direction);
    if (!adjacent) return;
    navigateToExerciseDetail(
      session.courseId,
      adjacent.index,
      adjacent.row,
      courseDetail.exercises.length,
    );
  };

  const handleFinish = () => {
    if (sessionId === null || !session?.courseId || !session?.stepOrder) return;
    const courseId = session.courseId;
    const playedStepOrder = session.stepOrder;
    completeSession.mutate(exerciseRecords, {
      onSuccess: (result) => {
        if (result.courseProgress?.courseCompleted) {
          navigate(toCompletePath(sessionId));
          return;
        }

        // 방금 마친 세션의 stepOrder 바로 다음 줄로 간다 — 전체 진행도(활성 스텝)와 무관하게,
        // 예를 들어 5번째까지 진행된 상태에서 2번을 다시 플레이했으면 다음은 3번이어야 한다.
        const next = courseDetail
          ? findAdjacentExerciseRow(courseDetail.exercises, playedStepOrder, "next")
          : null;
        if (!next) {
          navigate(toDailyRoutinePath(courseId));
          return;
        }

        navigateToExerciseDetail(courseId, next.index, next.row, courseDetail!.exercises.length);
      },
    });
  };

  if (sessionId === null || !session || !currentRecord) {
    return null;
  }

  const hasPreviousExercise = Boolean(
    courseDetail && findAdjacentExerciseRow(courseDetail.exercises, session.stepOrder!, "previous"),
  );
  const hasNextExercise = Boolean(
    courseDetail && findAdjacentExerciseRow(courseDetail.exercises, session.stepOrder!, "next"),
  );

  return (
    <main className="relative flex min-h-screen flex-col bg-white">
      <TopNavBar
        onBack={goToCourseDetail}
        className="px-[2rem]"
        // TODO: 음소거 버튼 추가
        // rightIcon={SoundIcon}
        // rightIconLabel={muted ? "음소거 해제" : "음소거"}
        // onRightIconClick={() => setMuted((value) => !value)}
      >
        <span className="typo-headline-emphasized text-black">{currentRecord.name}</span>
      </TopNavBar>

      <div className="relative mt-[2.4rem] flex flex-1 flex-col">
        <SessionExerciseMedia exercise={exercise} muted onTimeUpdate={setVideoTime} />

        <div className="relative z-10 flex items-start justify-between px-[2.1rem] pt-[1rem]">
          <div className="flex w-[8.7rem] flex-col items-center gap-[0.4rem] rounded-[1.6rem] border border-gray-97 bg-tertiary-50 px-[1rem] py-[0.8rem]">
            <span className="typo-caption-2-emphasized whitespace-nowrap text-gray-50">
              {session.stepOrder}스텝 {currentRecord.setCount ?? "-"}세트
            </span>
            {/* TODO: 현재 몇 번째 세트를 수행 중인지 알려주는 필드가 아직 API에 없어 항상 1로 표시한다 */}
            <span className="flex items-center gap-[0.2rem] text-tertiary-950">
              <span className="typo-headline-emphasized">1</span>
              <span className="typo-caption-2-emphasized">회</span>
            </span>
          </div>

          <SessionMuscleBadge frontMuscles={frontMuscles} backMuscles={backMuscles} />
        </div>
      </div>

      {/* 자막과 타이머 바가 나무 배경 하나를 이어서 같이 쓴다(각자 따로 깔면 이음새가 생긴다).
       * 돔(정확히 링 바닥에 고정)과 글로우(자막 영역까지 은은하게 번지는 배경)를 서로 다른
       * 이미지로 분리해서, 자막은 픽셀 좌표가 아니라 자기 영역 안에서 자유롭게 가운데 정렬한다. */}
      <div
        className="relative bg-cover bg-center"
        style={{ backgroundImage: `url(${sessionWoodBg})` }}
      >
        <img
          src={sessionTimerGlow}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 w-full"
        />

        <div className="relative z-10">
          {(currentCue || nextCue) && (
            <div className="flex min-h-[9.6rem] w-full flex-col items-center justify-center gap-[0.8rem] px-[2.1rem] text-center">
              {currentCue && (
                <p className="typo-body-emphasized text-white">{currentCue.content}</p>
              )}
              {nextCue && (
                <p className="typo-subheadline-regular text-gray-80">{nextCue.content}</p>
              )}
            </div>
          )}

          <SessionCountdownTimer
            totalSeconds={totalSeconds}
            onFinish={handleFinish}
            onPrevious={() => goToAdjacentExercise("previous")}
            onNext={() => goToAdjacentExercise("next")}
            previousDisabled={!hasPreviousExercise}
            nextDisabled={!hasNextExercise}
          />
        </div>
      </div>
    </main>
  );
}
