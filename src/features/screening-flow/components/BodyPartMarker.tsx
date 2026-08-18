import { Radio } from "@/shared/ui/radio";
import { cn } from "@/shared/lib/cn";
import { BODY_PART_MARKER_POSITION, type BodyPartCode } from "../constants/body-parts";

type BodyPartMarkerProps = {
  bodyPartCode: BodyPartCode;
  isSelected?: boolean;
  onClick?: () => void;
};

export default function BodyPartMarker({
  bodyPartCode,
  isSelected = false,
  onClick,
}: BodyPartMarkerProps) {
  const position = BODY_PART_MARKER_POSITION[bodyPartCode];
  const isInteractive = onClick !== undefined;

  return (
    <Radio
      isSelected={isSelected}
      tabIndex={isInteractive ? 0 : -1}
      aria-hidden={isInteractive ? undefined : "true"}
      onClick={onClick}
      className={cn(
        "absolute -translate-x-1/2 -translate-y-1/2",
        !isInteractive && "pointer-events-none",
      )}
      style={position}
    />
  );
}
