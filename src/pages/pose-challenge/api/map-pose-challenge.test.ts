import { describe, expect, test } from "vitest";
import { getPoseImageSrc } from "@/entities/course";
import { mapPoseChallengeProgress } from "./map-pose-challenge";
import type { BodyPartResponse, TargetPoseProgressItem, TargetPoseProgressResponse } from "./types";

const BODY_PARTS: BodyPartResponse[] = [
  { bodyPartCode: "BACK", name: "등" },
  { bodyPartCode: "ABDOMEN", name: "복부" },
  { bodyPartCode: "PELVIS", name: "골반" },
];

function item(overrides: Partial<TargetPoseProgressItem>): TargetPoseProgressItem {
  return {
    targetPoseId: 1,
    targetPoseName: "낙타 자세",
    targetPoseImageAssetKey: null,
    bodyPartCode: "BACK",
    level: 1,
    courseId: null,
    completedStepCount: null,
    totalStepCount: null,
    acquiredStampCount: null,
    requiredStampCount: 4,
    completed: false,
    ...overrides,
  };
}

function response(targetPoses: TargetPoseProgressItem[]): TargetPoseProgressResponse {
  return { totalCount: targetPoses.length, inProgressCount: 0, completedCount: 0, targetPoses };
}

describe("mapPoseChallengeProgress", () => {
  test("루트 집계 수치를 그대로 옮긴다", () => {
    const view = mapPoseChallengeProgress(
      { totalCount: 9, inProgressCount: 3, completedCount: 2, targetPoses: [] },
      BODY_PARTS,
    );

    expect(view).toMatchObject({ totalCount: 9, inProgressCount: 3, completedCount: 2 });
  });

  test("아직 시작하지 않은 자세(courseId null)는 idle이고 current는 0이다", () => {
    const view = mapPoseChallengeProgress(
      response([item({ courseId: null, acquiredStampCount: null })]),
      BODY_PARTS,
    );

    expect(view.groups[0].poses[0]).toMatchObject({ status: "idle", current: 0, total: 4 });
  });

  test("완성하지 못했지만 시작한 자세는 inProgress다", () => {
    const view = mapPoseChallengeProgress(
      response([item({ courseId: 20, acquiredStampCount: 2, completed: false })]),
      BODY_PARTS,
    );

    expect(view.groups[0].poses[0]).toMatchObject({ status: "inProgress", current: 2 });
  });

  test("completed가 true면 completed다", () => {
    const view = mapPoseChallengeProgress(
      response([item({ courseId: 20, acquiredStampCount: 4, completed: true })]),
      BODY_PARTS,
    );

    expect(view.groups[0].poses[0]).toMatchObject({ status: "completed", current: 4 });
  });

  test("자세명으로 이미지를 매핑하고, id는 targetPoseId 문자열이다", () => {
    const view = mapPoseChallengeProgress(response([item({ targetPoseId: 42 })]), BODY_PARTS);

    expect(view.groups[0].poses[0]).toMatchObject({
      id: "42",
      imageSrc: getPoseImageSrc("낙타 자세"),
    });
  });

  test("부위 목록 순서대로, 각 부위 표시명으로 그룹핑한다", () => {
    const view = mapPoseChallengeProgress(
      response([
        item({ targetPoseId: 1, bodyPartCode: "PELVIS", level: 1 }),
        item({ targetPoseId: 2, bodyPartCode: "BACK", level: 1 }),
        item({ targetPoseId: 3, bodyPartCode: "BACK", level: 2 }),
      ]),
      BODY_PARTS,
    );

    expect(view.groups.map((group) => group.bodyPart)).toEqual(["등", "골반"]);
    expect(view.groups[0].poses.map((pose) => pose.id)).toEqual(["2", "3"]);
  });

  test("자세가 하나도 없는 부위는 그룹에서 제외한다", () => {
    const view = mapPoseChallengeProgress(response([item({ bodyPartCode: "BACK" })]), BODY_PARTS);

    expect(view.groups.map((group) => group.bodyPart)).toEqual(["등"]);
  });
});
