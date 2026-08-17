import { cn } from "@/shared/lib/cn";
import { SequenceItem } from "@/shared/ui/sequence-item";
import type { CourseStep } from "../model/types";
import { EASE_OUT } from "./animation";

type StepListProps = {
  steps: CourseStep[];
  isOpen: boolean;
};

export function StepList({ steps, isOpen }: StepListProps) {
  return (
    <ol className="mt-[2.4rem] flex flex-col gap-3">
      {steps.map((step, index) => {
        const exercise = step.exercises[0];
        const isKeyStep = index === steps.length - 1;
        return (
          <li
            key={step.stepOrder}
            className={cn(
              "translate-y-[3rem] scale-[0.97] opacity-0 transition-[opacity,transform] duration-[660ms]",
              EASE_OUT,
              isOpen && "translate-y-0 scale-100 opacity-100",
            )}
            style={isOpen ? { transitionDelay: `${140 + index * 55}ms` } : undefined}
          >
            <SequenceItem
              compact
              step={step.stepOrder}
              active={isKeyStep}
              imageSrc={exercise?.imageAssetKey ?? undefined}
              alt={exercise?.name ?? ""}
              title={exercise?.name ?? ""}
              descriptions={exercise?.category ? [exercise.category] : undefined}
            />
          </li>
        );
      })}
    </ol>
  );
}
