import type { ReactNode } from "react";
import { EXPERIENCE_LEVEL_OPTIONS, type ExperienceLevel } from "@/features/onboarding-form";
import { cn } from "@/shared/lib/cn";
import { CTAButton } from "@/shared/ui/button";
import { ErrorMessage } from "@/shared/ui/error-message";
import { NumberField } from "@/shared/ui/number-field";
import { TextField } from "@/shared/ui/text-field";
import { TopNavBar } from "@/shared/ui/top-nav-bar";

type ProfileEditFormProps = {
  nickname: string;
  onNicknameChange: (value: string) => void;
  onNicknameBlur?: () => void;
  nicknameError?: string;
  experienceLevel: ExperienceLevel;
  onEditExperience: () => void;
  heightCm: string;
  onHeightChange: (value: string) => void;
  onHeightBlur?: () => void;
  heightError?: string;
  weightKg: string;
  onWeightChange: (value: string) => void;
  onWeightBlur?: () => void;
  weightError?: string;
  onBack: () => void;
  onSave: () => void;
  isSaving?: boolean;
  canSave: boolean;
};

export function ProfileEditForm({
  nickname,
  onNicknameChange,
  onNicknameBlur,
  nicknameError,
  experienceLevel,
  onEditExperience,
  heightCm,
  onHeightChange,
  onHeightBlur,
  heightError,
  weightKg,
  onWeightChange,
  onWeightBlur,
  weightError,
  onBack,
  onSave,
  isSaving = false,
  canSave,
}: ProfileEditFormProps) {
  return (
    <>
      <TopNavBar onBack={onBack}>
        <h1 className="typo-headline-emphasized text-ink-strong">프로필 편집</h1>
      </TopNavBar>

      <div className="flex flex-col gap-6 pt-2">
        <Field label="닉네임" htmlFor="nickname-field">
          <div className="flex flex-col gap-2">
            <TextField
              id="nickname-field"
              value={nickname}
              onValueChange={onNicknameChange}
              onBlur={onNicknameBlur}
              error={Boolean(nicknameError)}
            />
            {nicknameError && <ErrorMessage message={nicknameError} />}
          </div>
        </Field>

        <Field label="운동 경력">
          <button
            type="button"
            onClick={onEditExperience}
            className="flex h-[8.2rem] w-full items-center justify-between rounded-[2rem] border border-border-base bg-bg-surface px-8 text-left"
          >
            <span className="typo-body-emphasized text-ink-strong">
              {EXPERIENCE_LEVEL_OPTIONS.find((option) => option.value === experienceLevel)?.label}
            </span>
            <span className="typo-subheadline-regular text-gray-50">{"변경 >"}</span>
          </button>
        </Field>

        <div className="flex gap-4">
          <Field label="키" htmlFor="height-field" className="flex-1">
            <div className="flex flex-col gap-2">
              <NumberField
                id="height-field"
                placeholder="160"
                suffix="cm"
                value={heightCm}
                onValueChange={onHeightChange}
                onBlur={onHeightBlur}
                error={Boolean(heightError)}
              />
              {heightError && <ErrorMessage message={heightError} />}
            </div>
          </Field>
          <Field label="몸무게" htmlFor="weight-field" className="flex-1">
            <div className="flex flex-col gap-2">
              <NumberField
                id="weight-field"
                placeholder="50"
                suffix="kg"
                value={weightKg}
                onValueChange={onWeightChange}
                onBlur={onWeightBlur}
                error={Boolean(weightError)}
              />
              {weightError && <ErrorMessage message={weightError} />}
            </div>
          </Field>
        </div>
      </div>

      <CTAButton>
        <CTAButton.Single onClick={onSave} disabled={isSaving || !canSave} isLoading={isSaving}>
          저장
        </CTAButton.Single>
      </CTAButton>
    </>
  );
}

function Field({
  label,
  htmlFor,
  className,
  children,
}: {
  label: string;
  htmlFor?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("flex flex-col gap-4", className)}>
      {htmlFor ? (
        <label htmlFor={htmlFor} className="typo-subheadline-regular text-gray-50">
          {label}
        </label>
      ) : (
        <span className="typo-subheadline-regular text-gray-50">{label}</span>
      )}
      {children}
    </div>
  );
}
