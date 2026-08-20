import { ExperienceLevelOptions, type ExperienceLevel } from "@/features/onboarding-form";
import { TopNavBar } from "@/shared/ui/top-nav-bar";

type ExperienceStepProps = {
  value: ExperienceLevel;
  onChange: (value: ExperienceLevel) => void;
  onBack: () => void;
};

export function ExperienceStep({ value, onChange, onBack }: ExperienceStepProps) {
  return (
    <>
      <TopNavBar onBack={onBack}>
        <h1 className="typo-headline-emphasized text-ink-strong">운동 경력</h1>
      </TopNavBar>

      <div className="pt-9">
        <ExperienceLevelOptions value={value} onChange={onChange} />
      </div>
    </>
  );
}
