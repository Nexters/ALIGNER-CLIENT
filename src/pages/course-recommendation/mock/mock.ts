import type { Course } from "@/features/course-recommendation";
import 낙타 from "@/shared/assets/imgs/낙타.png";

export const DUMMY_COURSE: Course = {
  targetPoseName: "낙타 자세",
  targetPoseImageAssetKey: null,
  totalStepCount: 6,
  exerciseCount: 6,
  totalSetCount: 6,
  estimatedDurationSeconds: 900,
  estimatedKcal: 69,
  steps: [
    { stepOrder: 1, exercises: [{ name: "캣카우", imageAssetKey: null, category: "가동성 웜업" }] },
    { stepOrder: 2, exercises: [{ name: "캣카우", imageAssetKey: null, category: "가동성 웜업" }] },
    { stepOrder: 3, exercises: [{ name: "캣카우", imageAssetKey: null, category: "가동성 웜업" }] },
    { stepOrder: 4, exercises: [{ name: "캣카우", imageAssetKey: null, category: "가동성 웜업" }] },
    { stepOrder: 5, exercises: [{ name: "캣카우", imageAssetKey: null, category: "가동성 웜업" }] },
    {
      stepOrder: 6,
      exercises: [{ name: "낙타 자세", imageAssetKey: 낙타, category: "핵심 자세" }],
    },
  ],
};
