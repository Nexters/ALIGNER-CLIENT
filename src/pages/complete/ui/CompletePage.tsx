import { useParams } from "react-router";
import { useSession, type Session } from "@/entities/session";
import { ErrorMessage } from "@/shared/ui/error-message";
import { CompletePoseFeedback } from "./CompletePoseFeedback";
import { CompleteReport } from "./CompleteReport";

// 세션의 운동 기록은 displayOrder 오름차순이다. 스텝의 마지막 운동이 핀포즈다.
// TODO: 지금까지 확인한 데이터는 스텝당 운동이 항상 1개라 "마지막=핀포즈"가 맞았지만, 스텝에 운동이 여러 개일 때도
// 핀포즈가 항상 마지막인지는 검증되지 않았다. 백엔드가 핀포즈를 직접 가리키는 필드(예: exerciseId)를 응답에
// 내려주면 이 위치 추정 로직을 그 필드로 교체한다. (docs/adr/0007-session-complete-report-integration.md 결정 4 참고, 백엔드 확인 중)
function findPinPoseExerciseId(session: Session): number | null {
  const records = session.exerciseRecords ?? [];
  return records.at(-1)?.exerciseId ?? null;
}

export function CompletePage() {
  const params = useParams();
  const sessionId = params.sessionId ? Number(params.sessionId) : null;

  const { data, error, isPending } = useSession(sessionId);

  if (sessionId === null) {
    return null;
  }

  if (isPending) return null;

  if (error || !data) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center px-6">
        <ErrorMessage
          message="정보를 불러오지 못했어요. 잠시 후 다시 시도해 주세요."
          className="typo-body-regular text-gray-50"
        />
      </main>
    );
  }

  // 이 페이지는 세션이 COMPLETED된 뒤에만 진입한다 — courseProgress는 이미 채워져 있고, 남은 분기는 perceivedResult뿐이다.
  // poseName은 courseProgress.targetPoseName(코스 최종 목표 자세)을 쓴다. 코스 안에 핀포즈가 여러 개일 수 있어(예:
  // 중간 체크포인트 홀드 + 최종 목표 자세) 이 값이 "지금 세션의 핀포즈"와 항상 같다고 보장되진 않는다 — 현재는
  // 세션 플레이어가 코스의 마지막(=목표 자세) 핀포즈에서만 이 페이지로 보낸다는 전제로 맞춰뒀다(백엔드 확인 중).
  const pinPoseExerciseId = findPinPoseExerciseId(data);

  return !data.perceivedResult ? (
    <CompletePoseFeedback
      sessionId={sessionId}
      poseName={data.courseProgress?.targetPoseName ?? ""}
      pinPoseExerciseId={pinPoseExerciseId}
    />
  ) : (
    <CompleteReport sessionId={sessionId} />
  );
}
