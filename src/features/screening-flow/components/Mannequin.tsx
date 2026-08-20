import type { ReactNode } from "react";
import { cn } from "@/shared/lib/cn";
import { MannequinScanIcon } from "@/shared/ui/icons";
import type { BodyPartCode } from "../constants/body-parts";
import BodyPartMarker from "./BodyPartMarker";

type MannequinProps = {
  className?: string;
  iconClassName?: string;
  markerCodes?: BodyPartCode[];
  activeCode?: BodyPartCode;
  onMarkerClick?: (code: BodyPartCode) => void;
  children?: ReactNode;
};

export default function Mannequin({
  className,
  iconClassName,
  markerCodes = [],
  activeCode,
  onMarkerClick,
  children,
}: MannequinProps) {
  return (
    <div aria-hidden="true" className={cn("relative", className)}>
      <MannequinScanIcon className={cn("w-full", iconClassName)} />
      {markerCodes.map((code) => (
        <BodyPartMarker
          key={code}
          bodyPartCode={code}
          isSelected={code === activeCode}
          onClick={onMarkerClick ? () => onMarkerClick(code) : undefined}
        />
      ))}
      {children}
    </div>
  );
}
