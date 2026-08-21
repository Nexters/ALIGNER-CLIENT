import {
  getPoseImageSrc,
  isCourseCompleted,
  resolveThumbnailSrc,
  type TodayWorkoutSummary,
} from "@/entities/course";
import type {
  CourseDetailResponse,
  CourseStepExerciseResponse,
} from "@/shared/api/generated/data-contracts";

export interface DailyRoutineExerciseView {
  exerciseId: number;
  name: string;
  category: string;
  setInfo: string;
  kcal: number | null;
  imageSrc: string;
}

// "코스 순서" 목록의 한 줄. 한 스텝에 운동이 여럿이면 스텝당 여러 줄로 펼쳐진다.
export interface DailyRoutineExerciseRowView {
  courseStepId: number;
  stepOrder: number;
  /** 이 운동이 속한 스텝의 완료 여부. 같은 스텝의 운동은 값이 모두 같다 */
  completed: boolean;
  /**
   * 코스 순서 목록에서 강조(활성 색상) 표시해야 하면 true.
   * 개별 스텝의 completed 값이 아니라, completedStepCount만큼 앞에서부터 누적으로 결정된다
   * (스텝은 순차적으로 진행된다고 가정)
   */
  active: boolean;
  exercise: DailyRoutineExerciseView;
}

export interface CourseDetailView {
  courseName: string;
  workout: TodayWorkoutSummary;
  completed: boolean;
  /** 다음에 수행할 줄의 인덱스. 모두 완료했으면 마지막 줄, 표시할 줄이 없으면 null */
  activeIndex: number | null;
  exercises: DailyRoutineExerciseRowView[];
}

function buildSetInfo(exercise: CourseStepExerciseResponse): string {
  const setCount = exercise.setCount ?? "-";
  const minutes =
    exercise.durationSeconds != null ? Math.round(exercise.durationSeconds / 60) : "-";
  return `${setCount}세트/${minutes}분`;
}

function mapExercise(exercise: CourseStepExerciseResponse): DailyRoutineExerciseView {
  return {
    exerciseId: exercise.exerciseId!,
    name: exercise.name!,
    category: exercise.category ?? "-",
    setInfo: buildSetInfo(exercise),
    kcal: exercise.estimatedKcal ?? null,
    imageSrc: resolveThumbnailSrc(exercise.thumbnailUrl, exercise.imageAssetKey ?? null),
  };
}

export function mapCourseDetailResponse(response: CourseDetailResponse): CourseDetailView {
  const exercises = (response.steps ?? [])
    .slice()
    .sort((a, b) => a.stepOrder! - b.stepOrder!)
    .flatMap((step) =>
      (step.exercises ?? [])
        .slice()
        .sort((a, b) => a.displayOrder! - b.displayOrder!)
        .map((exercise) => ({
          courseStepId: step.courseStepId!,
          stepOrder: step.stepOrder!,
          completed: step.completed!,
          active: step.stepOrder! <= response.completedStepCount!,
          exercise: mapExercise(exercise),
        })),
    );

  const firstIncompleteIndex = exercises.findIndex((row) => !row.active);
  const activeIndex =
    firstIncompleteIndex !== -1
      ? firstIncompleteIndex
      : exercises.length > 0
        ? exercises.length - 1
        : null;

  return {
    courseName: response.name!,
    workout: {
      minutes:
        response.estimatedDurationSeconds != null
          ? Math.round(response.estimatedDurationSeconds / 60)
          : null,
      exerciseCount: response.exerciseCount!,
      setCount: response.totalSetCount!,
      kcal: response.estimatedKcal ?? null,
      imageSrc: getPoseImageSrc(response.targetPoseImageAssetKey ?? null),
    },
    completed: isCourseCompleted({
      current: response.completedStepCount!,
      total: response.totalStepCount!,
    }),
    activeIndex,
    exercises,
  };
}
