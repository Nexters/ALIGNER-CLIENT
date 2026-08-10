import type { HTMLAttributes } from "react";
import { cn } from "@/shared/lib/cn";
import { CheckIcon } from "@/shared/ui/icons";
import { CheckMarkItemContext, useCheckMarkItemContext } from "./context";
import { CHECK_MARK_BASE, CHECK_MARK_INDICATOR_BG, CHECK_MARK_LABEL_TEXT } from "./theme";

type CheckMarkGroupRootProps = HTMLAttributes<HTMLDivElement>;

function CheckMarkGroupRoot({ className, children, ...props }: CheckMarkGroupRootProps) {
  return (
    <div className={cn(CHECK_MARK_BASE.GROUP_BASE, className)} {...props}>
      {children}
    </div>
  );
}

type CheckMarkGroupItemProps = HTMLAttributes<HTMLDivElement> & {
  isChecked: boolean;
};

function CheckMarkGroupItem({ isChecked, className, children, ...props }: CheckMarkGroupItemProps) {
  return (
    <CheckMarkItemContext.Provider value={isChecked}>
      <div className={cn(CHECK_MARK_BASE.ITEM_BASE, className)} {...props}>
        {children}
      </div>
    </CheckMarkItemContext.Provider>
  );
}

type CheckMarkGroupIndicatorProps = HTMLAttributes<HTMLDivElement>;

function CheckMarkGroupIndicator({ className, ...props }: CheckMarkGroupIndicatorProps) {
  const isChecked = useCheckMarkItemContext();

  return (
    <div
      aria-hidden="true"
      className={cn(
        CHECK_MARK_BASE.INDICATOR_SHAPE,
        CHECK_MARK_INDICATOR_BG[isChecked ? "checked" : "unchecked"],
        className,
      )}
      {...props}
    >
      {isChecked && <CheckIcon className={CHECK_MARK_BASE.ICON} />}
    </div>
  );
}

type CheckMarkGroupLabelProps = Omit<HTMLAttributes<HTMLSpanElement>, "children"> & {
  label: string;
};

function CheckMarkGroupLabel({ label, className, ...props }: CheckMarkGroupLabelProps) {
  const isChecked = useCheckMarkItemContext();

  return (
    <span
      className={cn(
        CHECK_MARK_BASE.LABEL_BASE,
        CHECK_MARK_LABEL_TEXT[isChecked ? "checked" : "unchecked"],
        className,
      )}
      {...props}
    >
      {label}
    </span>
  );
}

type CheckMarkGroupComponent = typeof CheckMarkGroupRoot & {
  Item: typeof CheckMarkGroupItem;
  Indicator: typeof CheckMarkGroupIndicator;
  Label: typeof CheckMarkGroupLabel;
};

const CheckMarkGroup: CheckMarkGroupComponent = Object.assign(CheckMarkGroupRoot, {
  Item: CheckMarkGroupItem,
  Indicator: CheckMarkGroupIndicator,
  Label: CheckMarkGroupLabel,
});

export default CheckMarkGroup;
