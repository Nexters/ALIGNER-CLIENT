import { OptionItem } from "@/shared/ui/option-item";
import { POSES } from "../constants/poses";
import { cn } from "@/shared/lib/cn";

type PoseGridProps = {
  selectedIds: number[];
  excludedIds?: number[];
  onToggle?: (id: number, isSelected: boolean) => void;
};

export default function PoseGrid({ selectedIds, excludedIds = [], onToggle }: PoseGridProps) {
  return (
    <div className="grid grid-cols-3 gap-x-[1.3rem] gap-y-[1.6rem]">
      {POSES.map((pose) => {
        const isSelected = selectedIds.includes(pose.id);
        const isExcluded = excludedIds.includes(pose.id);
        return (
          <div key={pose.id} className="flex flex-col items-center gap-[1.1rem]">
            <OptionItem
              imageSrc={pose.image}
              alt={pose.name}
              selected={isSelected}
              disabled={!onToggle || isExcluded}
              onClick={() => onToggle?.(pose.id, isSelected)}
              className="h-[10.3rem] w-[10.3rem]"
            />
            <span
              className={cn(
                "typo-subheadline-emphasized text-gray-10",
                (!onToggle || isExcluded) && "text-gray-95",
              )}
            >
              {pose.name}
            </span>
          </div>
        );
      })}
    </div>
  );
}
