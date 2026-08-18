import { describe, expect, test } from "vitest";
import { getPoseImageSrc } from "@/entities/course";
import { mapCourseDetailResponse } from "./map-course";
import type { CourseDetailResponse } from "./types";

const BASE_RESPONSE: CourseDetailResponse = {
  courseId: 20,
  targetPoseId: 3,
  targetPoseName: "낙타 자세",
  targetPoseImageAssetKey: null,
  name: "낙타자세 정복하기",
  recommendationReason: null,
  completedStepCount: 1,
  totalStepCount: 3,
  exerciseCount: 4,
  totalSetCount: 4,
  estimatedDurationSeconds: 900,
  estimatedKcal: 69,
  steps: [
    {
      courseStepId: 31,
      stepOrder: 1,
      completed: true,
      completedAt: "2026-08-18T00:00:00Z",
      // 한 스텝에 운동이 둘 이상일 수 있고, displayOrder 순으로 각각 한 줄이 되어야 한다.
      exercises: [
        {
          courseStepExerciseId: 51,
          exerciseId: 7,
          name: "캣카우",
          imageAssetKey: "exercise/cat-cow",
          category: "가동성 웜업",
          displayOrder: 2,
          durationSeconds: 120,
          setCount: 1,
          estimatedKcal: 6,
        },
        {
          courseStepExerciseId: 50,
          exerciseId: 6,
          name: "스트레칭",
          imageAssetKey: null,
          category: "가동성 웜업",
          displayOrder: 1,
          durationSeconds: 60,
          setCount: 1,
          estimatedKcal: 3,
        },
      ],
    },
    {
      courseStepId: 32,
      stepOrder: 2,
      completed: false,
      completedAt: null,
      exercises: [
        {
          courseStepExerciseId: 52,
          exerciseId: 8,
          name: "낙타 자세",
          imageAssetKey: null,
          category: null,
          displayOrder: 1,
          durationSeconds: null,
          setCount: null,
          estimatedKcal: null,
        },
      ],
    },
    {
      courseStepId: 33,
      stepOrder: 3,
      completed: false,
      completedAt: null,
      exercises: [],
    },
  ],
};

describe("mapCourseDetailResponse", () => {
  test("코스 이름과 이미지, 요약 수치를 매핑한다", () => {
    const view = mapCourseDetailResponse(BASE_RESPONSE);

    expect(view.courseName).toBe("낙타자세 정복하기");
    expect(view.workout).toEqual({
      minutes: 15,
      exerciseCount: 4,
      setCount: 4,
      kcal: 69,
      imageSrc: getPoseImageSrc("낙타 자세"),
    });
  });

  test("완료한 스텝 수가 전체 스텝 수 이상이면 완료 처리한다", () => {
    const completedResponse = { ...BASE_RESPONSE, completedStepCount: 3 };

    expect(mapCourseDetailResponse(completedResponse).completed).toBe(true);
    expect(mapCourseDetailResponse(BASE_RESPONSE).completed).toBe(false);
  });

  test("한 스텝의 운동 여럿을 displayOrder 순으로 각각 한 줄씩 펼친다", () => {
    const view = mapCourseDetailResponse(BASE_RESPONSE);

    expect(view.exercises).toHaveLength(3);
    expect(view.exercises.map((row) => row.exercise.name)).toEqual([
      "스트레칭",
      "캣카우",
      "낙타 자세",
    ]);
  });

  test("같은 스텝에 속한 줄은 courseStepId·completed를 공유한다", () => {
    const view = mapCourseDetailResponse(BASE_RESPONSE);

    expect(view.exercises[0]).toMatchObject({ courseStepId: 31, stepOrder: 1, completed: true });
    expect(view.exercises[1]).toMatchObject({ courseStepId: 31, stepOrder: 1, completed: true });
    expect(view.exercises[1].exercise).toMatchObject({
      name: "캣카우",
      category: "가동성 웜업",
      setInfo: "1세트/2분",
      kcal: 6,
    });
  });

  test("세트 수·시간·분류가 없으면 정보에 '-'를 채운다", () => {
    const view = mapCourseDetailResponse(BASE_RESPONSE);

    expect(view.exercises[2].exercise).toMatchObject({
      category: "-",
      setInfo: "-세트/-분",
      kcal: null,
    });
  });

  test("운동이 없는 스텝은 목록에서 제외한다", () => {
    const view = mapCourseDetailResponse(BASE_RESPONSE);

    expect(view.exercises.some((row) => row.courseStepId === 33)).toBe(false);
  });

  test("첫 미완료 줄을 활성 줄로 표시한다", () => {
    // 0,1번 줄(스텝1)은 완료, 2번 줄(스텝2)이 첫 미완료다.
    expect(mapCourseDetailResponse(BASE_RESPONSE).activeIndex).toBe(2);
  });

  test("모든 스텝을 완료했으면 마지막 줄을 활성 줄로 표시한다", () => {
    const allCompleted: CourseDetailResponse = {
      ...BASE_RESPONSE,
      steps: BASE_RESPONSE.steps.map((step) => ({ ...step, completed: true })),
    };

    expect(mapCourseDetailResponse(allCompleted).activeIndex).toBe(2);
  });

  test("표시할 운동이 하나도 없으면 활성 줄이 없다", () => {
    const empty: CourseDetailResponse = { ...BASE_RESPONSE, steps: [] };

    expect(mapCourseDetailResponse(empty).activeIndex).toBeNull();
  });
});
