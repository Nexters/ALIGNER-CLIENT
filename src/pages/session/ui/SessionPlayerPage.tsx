import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useExercise } from "@/entities/exercise";
import { useSession } from "@/entities/session";
import sessionTimerGlow from "@/shared/assets/imgs/session/timer-glow.svg";
import sessionWoodBg from "@/shared/assets/imgs/session/wood-bg.png";
import { toCompletePath, toDailyRoutinePath } from "@/shared/config/routes";
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
// 완료 리포트(핀포즈 직후에만 뜨는 화면)로 보낸다. 아니면 다음 스텝을 고르도록 코스 순서 화면으로
// 돌려보낸다 — 다른 자세를 하려면 밖에서 다시 "시작하기"를 눌러야 하기 때문이다.
export function SessionPlayerPage() {
  const navigate = useNavigate();
  const params = useParams();
  const sessionId = params.sessionId ? Number(params.sessionId) : null;

  const { data: session } = useSession(sessionId);
  const completeSession = useCompleteSession(sessionId as number);
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

  const handleFinish = () => {
    if (sessionId === null) return;
    completeSession.mutate(exerciseRecords, {
      onSuccess: (result) => {
        if (result.courseProgress?.courseCompleted) {
          navigate(toCompletePath(sessionId));
        } else {
          navigate(toDailyRoutinePath(result.courseId as number));
        }
      },
    });
  };

  if (sessionId === null || !session || !currentRecord) {
    return null;
  }

  return (
    <main className="relative flex min-h-screen flex-col bg-white">
      <TopNavBar
        onBack={() => navigate(-1)}
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

          <SessionCountdownTimer totalSeconds={totalSeconds} onFinish={handleFinish} />
        </div>
      </div>
    </main>
  );
}
