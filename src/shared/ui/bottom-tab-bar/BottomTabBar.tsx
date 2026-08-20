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
  const activeIndex = Math.max(
    tabs.findIndex((tab) => tab.id === activeTab),
    0,
  );

  return (
    <nav
      className={cn(
        "relative flex items-center gap-[0.4rem] rounded-[2rem] bg-white/50 p-[0.4rem] shadow-tab-bar backdrop-blur-[0.5rem]",
        className,
      )}
    >
      <div
        aria-hidden="true"
        className="absolute inset-y-[0.4rem] left-[0.4rem] rounded-[1.6rem] bg-gray-98 transition-transform duration-[250ms] ease-[cubic-bezier(0.23,1,0.32,1)]"
        style={{
          width: `calc((100% - 0.4rem) / ${tabs.length})`,
          transform: `translateX(${activeIndex * 100}%)`,
        }}
      />
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
