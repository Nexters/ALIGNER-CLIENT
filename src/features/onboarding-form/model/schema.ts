import { z } from "zod";
import { ERROR_MESSAGES, EXPERIENCE_LEVELS, MIN_MAX_FIELDS } from "../constants/form-fields";

export const onboardingFormSchema = z.object({
  heightCm: z
    .number({ error: ERROR_MESSAGES.heightCm.required })
    .int()
    .min(MIN_MAX_FIELDS.heightCm.min, ERROR_MESSAGES.heightCm.min)
    .max(MIN_MAX_FIELDS.heightCm.max, ERROR_MESSAGES.heightCm.max),
  weightKg: z
    .number({ error: ERROR_MESSAGES.weightKg.required })
    .int()
    .min(MIN_MAX_FIELDS.weightKg.min, ERROR_MESSAGES.weightKg.min)
    .max(MIN_MAX_FIELDS.weightKg.max, ERROR_MESSAGES.weightKg.max),
  experienceLevel: z.enum(EXPERIENCE_LEVELS, ERROR_MESSAGES.experienceLevel),
  easyPoseIds: z
    .array(z.number().int())
    .min(MIN_MAX_FIELDS.poses.min, ERROR_MESSAGES.poses.required)
    .max(MIN_MAX_FIELDS.poses.max, ERROR_MESSAGES.poses.max),
  hardPoseIds: z
    .array(z.number().int())
    .min(MIN_MAX_FIELDS.poses.min, ERROR_MESSAGES.poses.required)
    .max(MIN_MAX_FIELDS.poses.max, ERROR_MESSAGES.poses.max),
});

export type OnboardingFormValues = z.infer<typeof onboardingFormSchema>;
