import yogaImage from "@/shared/assets/images/yoga-1.png";
import type { CourseProgress, Exercise, ExerciseGuide } from "./types";

// TODO: 실제 API 연동 전까지의 목데이터. 홈/데일리 루틴이 완료 여부를 같이 봐야 해서 여기서 공유한다.
export const MOCK_COURSE_PROGRESS: CourseProgress = { current: 6, total: 6 };

// TODO: 가슴 외 신체 부위 가이드는 아직 디자인이 없어 임시로 비워둔다. 디자인 나오는 대로 채운다.
const MOCK_EXERCISE_GUIDES: ExerciseGuide[] = [
  {
    bodyPart: "가슴",
    highlightedMuscles: ["복직근", "외복사근"],
    tip: "명치를 천장을 향해 높게 끌어올리세요.",
  },
];

// TODO: 실제 API 연동 전까지의 목데이터. entities/course 타입에 맞춰 추후 fetch 훅으로 교체한다.
// 데일리 루틴 "코스 순서" 목록과 운동 상세 페이지가 같은 목록을 공유해야 해서 여기서 관리한다.
export const MOCK_EXERCISES: Exercise[] = [
  {
    id: "1",
    name: "캣카우",
    category: "가동성 웜업",
    setInfo: "1세트/2분",
    kcal: 6,
    imageSrc: yogaImage,
    difficulty: "하",
    guides: MOCK_EXERCISE_GUIDES,
  },
  {
    id: "2",
    name: "캣카우",
    category: "가동성 웜업",
    setInfo: "1세트/2분",
    kcal: 6,
    imageSrc: yogaImage,
    difficulty: "하",
    guides: MOCK_EXERCISE_GUIDES,
  },
  {
    id: "3",
    name: "캣카우",
    category: "가동성 웜업",
    setInfo: "1세트/2분",
    kcal: 6,
    imageSrc: yogaImage,
    difficulty: "하",
    guides: MOCK_EXERCISE_GUIDES,
  },
  {
    id: "4",
    name: "캣카우",
    category: "가동성 웜업",
    setInfo: "1세트/2분",
    kcal: 6,
    imageSrc: yogaImage,
    difficulty: "하",
    guides: MOCK_EXERCISE_GUIDES,
  },
  {
    id: "5",
    name: "캣카우",
    category: "가동성 웜업",
    setInfo: "1세트/2분",
    kcal: 6,
    imageSrc: yogaImage,
    difficulty: "하",
    guides: MOCK_EXERCISE_GUIDES,
  },
  {
    id: "6",
    name: "낙타 자세",
    category: "핵심 자세",
    setInfo: "1세트/2분",
    kcal: 6,
    imageSrc: yogaImage,
    difficulty: "하",
    guides: MOCK_EXERCISE_GUIDES,
  },
];
