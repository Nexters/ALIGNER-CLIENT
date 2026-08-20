import { z } from "zod";
// TODO: pages/my-edit는 features/profile-edit로 옮기는 게 맞아 보이지만, 그러면 이 import가 features 간 직접 참조가 된다(레포 규칙 위반). EXPERIENCE_LEVELS/MIN_MAX_FIELDS를 entities/member로 옮기고 나서 진행할 것 — 지금은 onboarding-form이 다른 작업 중이라 보류.
import { EXPERIENCE_LEVELS, MIN_MAX_FIELDS } from "@/features/onboarding-form";

const NICKNAME_MIN = 2;
const NICKNAME_MAX = 12;
const NICKNAME_PATTERN = /^[가-힣a-zA-Z0-9 ]*$/;

// 온보딩(MIN_MAX_FIELDS.heightCm.max = 270)은 실제 API(INVALID_HEIGHT, 100~250cm)와 어긋나 있다.
// 온보딩 쪽 수정은 이 작업 범위 밖이라, 키 상한만 실제 API 기준으로 보정해서 쓴다.
const HEIGHT_MAX_CM = 250;

export const ERROR_MESSAGES = {
  nickname: {
    min: `닉네임은 ${NICKNAME_MIN}자 이상이어야 해요`,
    max: `닉네임은 ${NICKNAME_MAX}자 이하여야 해요`,
    pattern: "닉네임에 특수문자는 쓸 수 없어요",
  },
  heightCm: {
    min: `키는 ${MIN_MAX_FIELDS.heightCm.min}cm 이상이어야 해요`,
    max: `키는 ${HEIGHT_MAX_CM}cm 이하여야 해요`,
  },
  weightKg: {
    min: `몸무게는 ${MIN_MAX_FIELDS.weightKg.min}kg 이상이어야 해요`,
    max: `몸무게는 ${MIN_MAX_FIELDS.weightKg.max}kg 이하여야 해요`,
  },
};

// TODO: 온보딩(features/onboarding-form/model/schema.ts)은 heightCm/weightKg를 z.number()로 검증하고, 여기는 NumberField가 string 값을 주고받아서 string 기반 .refine()으로 따로 짰다 — 지금은 MIN_MAX_FIELDS 숫자만 재사용하고 검증 로직 자체는 중복이다. 온보딩 쪽을 다음에 손볼 때 z.coerce.number() 등으로 맞춰서 검증 로직(과 키 상한 270 버그)까지 완전히 공유하는 걸 검토할 것.
export const profileEditSchema = z.object({
  nickname: z
    .string()
    .min(NICKNAME_MIN, ERROR_MESSAGES.nickname.min)
    .max(NICKNAME_MAX, ERROR_MESSAGES.nickname.max)
    .regex(NICKNAME_PATTERN, ERROR_MESSAGES.nickname.pattern),
  experienceLevel: z.enum(EXPERIENCE_LEVELS),
  heightCm: z
    .string()
    .refine((value) => Number(value) >= MIN_MAX_FIELDS.heightCm.min, ERROR_MESSAGES.heightCm.min)
    .refine((value) => Number(value) <= HEIGHT_MAX_CM, ERROR_MESSAGES.heightCm.max),
  weightKg: z
    .string()
    .refine((value) => Number(value) >= MIN_MAX_FIELDS.weightKg.min, ERROR_MESSAGES.weightKg.min)
    .refine((value) => Number(value) <= MIN_MAX_FIELDS.weightKg.max, ERROR_MESSAGES.weightKg.max),
});

export type ProfileEditFormValues = z.infer<typeof profileEditSchema>;
