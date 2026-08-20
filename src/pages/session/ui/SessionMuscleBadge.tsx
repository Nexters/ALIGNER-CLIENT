import { MuscleDiagram, type MuscleName } from "@/shared/ui/muscle-diagram";

interface SessionMuscleBadgeProps {
  frontMuscles: MuscleName[];
  backMuscles: MuscleName[];
}

export function SessionMuscleBadge({ frontMuscles, backMuscles }: SessionMuscleBadgeProps) {
  return (
    <div className="flex gap-[0.8rem] rounded-[1.6rem] border border-gray-97 bg-tertiary-50 px-[1.1rem] py-[0.9rem]">
      <div className="flex flex-col items-center gap-[0.4rem]">
        <MuscleDiagram view="front" highlightedMuscles={frontMuscles} className="h-[10.8rem]" />
        <span className="typo-caption-2-emphasized text-tertiary-950">앞</span>
      </div>
      <div className="flex flex-col items-center gap-[0.4rem]">
        <MuscleDiagram view="back" highlightedMuscles={backMuscles} className="h-[10.8rem]" />
        <span className="typo-caption-2-emphasized text-tertiary-950">뒤</span>
      </div>
    </div>
  );
}
