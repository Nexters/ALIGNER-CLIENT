export const EXPERIENCE_LEVELS = [
  "UNDER_ONE_YEAR",
  "ONE_TO_THREE_YEARS",
  "OVER_THREE_YEARS",
] as const;

export const EXPERIENCE_LEVEL_OPTIONS = [
  { value: "UNDER_ONE_YEAR", label: "1년 미만" },
  { value: "ONE_TO_THREE_YEARS", label: "1-3년" },
  { value: "OVER_THREE_YEARS", label: "3년 이상" },
] as const satisfies { value: (typeof EXPERIENCE_LEVELS)[number]; label: string }[];

export const MIN_MAX_FIELDS = {
  heightCm: {
    min: 100,
    max: 270,
  },
  weightKg: {
    min: 20,
    max: 300,
  },

  poses: {
    min: 1,
    max: 4,
  },
};

export const ERROR_MESSAGES = {
  heightCm: {
    required: "키를 입력해주세요",
    min: `3살 아이의 평균 키는 ${MIN_MAX_FIELDS.heightCm.min}cm입니다. 3살 미만이세요? 줄넘기나 하세요.`,
    max: `인류 역사상 기록된 인간의 최대 키는 ${MIN_MAX_FIELDS.heightCm.max}cm입니다. 기록을 갱신하셨나요?`,
  },
  weightKg: {
    required: "몸무게를 입력해주세요",
    min: "요가를 할 때가 아닙니다. 제발 밥을 드세요.",
    max: "요가를 할 때가 아닙니다. 마운자로 or 위고비 ㄱㄱ",
  },
  experienceLevel: "운동 경력을 선택해주세요",
  poses: {
    required: `자세를 최소 ${MIN_MAX_FIELDS.poses.min}개 골라주세요`,
    max: `자세는 최대 ${MIN_MAX_FIELDS.poses.max}개까지 고를 수 있어요`,
  },
};
