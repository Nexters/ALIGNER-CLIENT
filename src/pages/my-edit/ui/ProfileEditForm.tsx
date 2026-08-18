import type { ReactNode } from "react";
import { EXPERIENCE_LEVEL_OPTIONS, type ExperienceLevel } from "@/features/onboarding-form";
import { cn } from "@/shared/lib/cn";
import { CTAButton } from "@/shared/ui/button";
import { NumberField } from "@/shared/ui/number-field";
import { TextField } from "@/shared/ui/text-field";
import { TopNavBar } from "@/shared/ui/top-nav-bar";

type ProfileEditFormProps = {
  nickname: string;
  onNicknameChange: (value: string) => void;
  experienceLevel: ExperienceLevel;
  onEditExperience: () => void;
  heightCm: string;
  onHeightChange: (value: string) => void;
  weightKg: string;
  onWeightChange: (value: string) => void;
  onBack: () => void;
  onSave: () => void;
};

export function ProfileEditForm({
  nickname,
  onNicknameChange,
  experienceLevel,
  onEditExperience,
  heightCm,
  onHeightChange,
  weightKg,
  onWeightChange,
  onBack,
  onSave,
}: ProfileEditFormProps) {
  return (
    <main className="flex min-h-screen flex-col bg-gray-98 px-6">
      <TopNavBar onBack={onBack}>
        <h1 className="typo-headline-emphasized text-ink-strong">프로필 편집</h1>
      </TopNavBar>

      <div className="flex flex-col gap-6 pt-2">
        <Field label="닉네임" htmlFor="nickname-field">
          <TextField id="nickname-field" value={nickname} onValueChange={onNicknameChange} />
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
            <NumberField
              id="height-field"
              placeholder="160"
              suffix="cm"
              value={heightCm}
              onValueChange={onHeightChange}
            />
          </Field>
          <Field label="몸무게" htmlFor="weight-field" className="flex-1">
            <NumberField
              id="weight-field"
              placeholder="50"
              suffix="kg"
              value={weightKg}
              onValueChange={onWeightChange}
            />
          </Field>
        </div>
      </div>

      <CTAButton>
        <CTAButton.Single onClick={onSave}>저장</CTAButton.Single>
      </CTAButton>
    </main>
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
