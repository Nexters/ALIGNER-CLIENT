import type { ComponentType, SVGProps } from "react";
import { cn } from "@/shared/lib/cn";
import TabItem from "./TabItem";

export type BottomTabBarTab<T extends string = string> = {
  id: T;
  label: string;
  filledIcon: ComponentType<SVGProps<SVGSVGElement>>;
  outlineIcon: ComponentType<SVGProps<SVGSVGElement>>;
};

type BottomTabBarProps<T extends string> = {
  tabs: BottomTabBarTab<T>[];
  activeTab: T;
  onTabChange: (tab: T) => void;
  className?: string;
};

export default function BottomTabBar<T extends string>({
  tabs,
  activeTab,
  onTabChange,
  className,
}: BottomTabBarProps<T>) {
  return (
    <nav
      className={cn(
        "flex items-center gap-[0.4rem] rounded-[2rem] bg-white/50 p-[0.4rem] shadow-tab-bar backdrop-blur-[0.5rem]",
        className,
      )}
    >
      {tabs.map(({ id, label, filledIcon, outlineIcon }) => (
        <TabItem
          key={id}
          icon={activeTab === id ? filledIcon : outlineIcon}
          label={label}
          isActive={activeTab === id}
          onClick={() => onTabChange(id)}
        />
      ))}
    </nav>
  );
}
