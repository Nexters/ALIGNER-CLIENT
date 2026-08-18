import { describe, expect, test } from "vitest";
import { getPoseImageSrc } from "@/entities/course";
import { mapTodayCourseResponse } from "./map-today-course";
import type { TodayCourseResponse } from "./types";

const BASE_RESPONSE: TodayCourseResponse = {
  courseId: 20,
  targetPoseId: 3,
  targetPoseName: "낙타 자세",
  targetPoseImageAssetKey: null,
  targetPoseLevel: 1,
  name: "낙타자세 정복하기",
  recommendationReason: null,
  currentStepOrder: 2,
  completedStepCount: 1,
  totalStepCount: 6,
  exerciseCount: 6,
  totalSetCount: 6,
  estimatedDurationSeconds: 900,
  estimatedKcal: 69,
  completed: false,
  tomorrowPreview: null,
};

describe("mapTodayCourseResponse", () => {
  test("스텝 진행도를 CourseProgress로 매핑한다", () => {
    const view = mapTodayCourseResponse(BASE_RESPONSE);

    expect(view.progress).toEqual({ current: 1, total: 6 });
  });

  test("예상 시간(초)을 분 단위로 반올림해 매핑한다", () => {
    const view = mapTodayCourseResponse({ ...BASE_RESPONSE, estimatedDurationSeconds: 890 });

    expect(view.workout.minutes).toBe(15);
  });

  test("예상 시간이 없으면(null) 0분으로 표기한다", () => {
    const view = mapTodayCourseResponse({ ...BASE_RESPONSE, estimatedDurationSeconds: null });

    expect(view.workout.minutes).toBe(0);
  });

  test("예상 칼로리가 없으면(null) kcal도 null로 남긴다", () => {
    const view = mapTodayCourseResponse({ ...BASE_RESPONSE, estimatedKcal: null });

    expect(view.workout.kcal).toBeNull();
  });

  test("자세명으로 이미지를 매핑한다", () => {
    const view = mapTodayCourseResponse(BASE_RESPONSE);

    expect(view.workout.imageSrc).toBe(getPoseImageSrc("낙타 자세"));
  });

  test("완료 여부와 자세명을 그대로 전달한다", () => {
    const view = mapTodayCourseResponse({ ...BASE_RESPONSE, completed: true });

    expect(view.completed).toBe(true);
    expect(view.targetPoseName).toBe("낙타 자세");
  });
});
