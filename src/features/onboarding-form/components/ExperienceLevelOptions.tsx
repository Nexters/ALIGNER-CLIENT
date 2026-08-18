import { cn } from "@/shared/lib/cn";
import { Button } from "@/shared/ui/button";
import { EXPERIENCE_LEVEL_OPTIONS } from "../constants/form-fields";

export type ExperienceLevel = (typeof EXPERIENCE_LEVEL_OPTIONS)[number]["value"];

type ExperienceLevelOptionsProps = {
  value?: ExperienceLevel;
  onChange: (value: ExperienceLevel) => void;
  className?: string;
};

export default function ExperienceLevelOptions({
  value,
  onChange,
  className,
}: ExperienceLevelOptionsProps) {
  return (
    <div className={cn("flex flex-col gap-[1.2rem]", className)}>
      {EXPERIENCE_LEVEL_OPTIONS.map((option) => (
        <Button
          key={option.value}
          color="secondary"
          isSelected={value === option.value}
          onClick={() => onChange(option.value)}
          className="py-[2.2rem] px-[4.1rem]"
        >
          {option.label}
        </Button>
      ))}
    </div>
  );
}
