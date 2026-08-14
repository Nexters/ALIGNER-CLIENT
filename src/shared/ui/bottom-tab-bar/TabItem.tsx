import type { ComponentType, SVGProps } from "react";
import { cn } from "@/shared/lib/cn";
import { IconButton } from "@/shared/ui/button";

type TabItemProps = {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  label: string;
  isActive: boolean;
  onClick: () => void;
};

export default function TabItem({ icon, label, isActive, onClick }: TabItemProps) {
  return (
    <IconButton
      icon={icon}
      aria-label={label}
      onClick={onClick}
      className={cn(
        "flex items-center justify-center rounded-[1.6rem] px-[3.3rem] py-[1.9rem]",
        isActive && "bg-gray-98",
      )}
      iconClassName={isActive ? "text-gray-10" : "text-gray-70"}
    />
  );
}
