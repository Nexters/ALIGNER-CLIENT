import { ExperienceLevelOptions, type ExperienceLevel } from "@/features/onboarding-form";
import { TopNavBar } from "@/shared/ui/top-nav-bar";

type ExperienceStepProps = {
  value: ExperienceLevel;
  onChange: (value: ExperienceLevel) => void;
  onBack: () => void;
};

export function ExperienceStep({ value, onChange, onBack }: ExperienceStepProps) {
  return (
    <main className="flex min-h-screen flex-col bg-gray-98 px-6">
      <TopNavBar onBack={onBack}>
        <h1 className="typo-headline-emphasized text-ink-strong">운동 경력</h1>
      </TopNavBar>

      <div className="pt-9">
        <ExperienceLevelOptions value={value} onChange={onChange} />
      </div>
    </main>
  );
}
