import type { CourseProgressResponse } from "@/shared/api/generated/data-contracts";
import type { Session } from "@/entities/session";

type BodyPartCode = NonNullable<CourseProgressResponse["bodyPartCode"]>;

// TODO: features/screening-flow/constants/body-parts.ts, pages/exercise-detail/api/map-exercise.ts와 부위 라벨이 중복된다. entities/course로 통합할 때 세 곳을 같이 정리한다.
const BODY_PART_LABELS: Record<BodyPartCode, string> = {
  BACK: "등",
  ABDOMEN: "복부",
  PELVIS: "골반",
};

// TODO: pages/exercise-detail/api/map-exercise.ts의 DIFFICULTY_LABELS, features/screening-flow의 LEVEL_OPTIONS와 난이도 라벨이 개념적으로 겹친다. entities/course로 통합할 때 같이 정리한다.
const LEVEL_LABELS: Record<number, string> = {
  1: "하",
  2: "중",
  3: "상",
};

export interface SessionStampView {
  targetPoseName: string;
  acquired: number;
  required: number;
}

export interface SessionReportView {
  subtitle: string;
  stamp: SessionStampView | null;
  durationLabel: string;
  completedExerciseLabel: string;
  kcalLabel: string;
}

function formatDuration(durationSeconds: number): string {
  const minutes = Math.floor(durationSeconds / 60);
  const seconds = durationSeconds % 60;
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

function resolveDurationLabel(session: Session): string {
  if (!session.completedAt || !session.startedAt) return "-";

  const durationSeconds = Math.round(
    (new Date(session.completedAt).getTime() - new Date(session.startedAt).getTime()) / 1000,
  );
  return formatDuration(Math.max(0, durationSeconds));
}

function resolveSubtitle(courseProgress: CourseProgressResponse | null | undefined): string {
  if (!courseProgress?.bodyPartCode || !courseProgress.level) {
    return "파이어로그 로드맵";
  }

  const bodyPartLabel = BODY_PART_LABELS[courseProgress.bodyPartCode];
  const levelLabel = LEVEL_LABELS[courseProgress.level] ?? "-";
  return `${bodyPartLabel} 난이도 ${levelLabel} · 파이어로그 로드맵`;
}

export function mapSessionReport(session: Session): SessionReportView {
  return {
    subtitle: resolveSubtitle(session.courseProgress),
    stamp: session.courseProgress
      ? {
          targetPoseName: session.courseProgress.targetPoseName ?? "",
          acquired: session.courseProgress.acquiredStampCount ?? 0,
          required: session.courseProgress.requiredStampCount ?? 0,
        }
      : null,
    durationLabel: resolveDurationLabel(session),
    completedExerciseLabel: `${session.completedExerciseCount ?? 0}개`,
    kcalLabel: session.estimatedKcal != null ? `${session.estimatedKcal}kcal` : "-",
  };
}
