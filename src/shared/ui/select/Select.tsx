import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import { cn } from "@/shared/lib/cn";
import { SelectContext, useSelectContext } from "./context";
import { SELECT_CONTENT_BASE, SELECT_ITEM, SELECT_TRIGGER } from "./theme";

type SelectRootProps = {
  children: ReactNode;
  className?: string;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
};

function SelectRoot({
  children,
  className,
  value: controlledValue,
  defaultValue,
  onValueChange,
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
}: SelectRootProps) {
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const value = controlledValue ?? uncontrolledValue;
  const open = controlledOpen ?? uncontrolledOpen;

  const setValue = useCallback(
    (next: string) => {
      setUncontrolledValue(next);
      onValueChange?.(next);
    },
    [onValueChange],
  );

  const setOpen = useCallback(
    (next: boolean) => {
      setUncontrolledOpen(next);
      onOpenChange?.(next);
    },
    [onOpenChange],
  );

  // 열려 있을 때만 감시: Trigger/Content를 감싸는 wrapper 바깥 클릭이나 Esc로 닫는다.
  // wrapper 전체(Trigger 포함) 기준으로 판단해야 Trigger 클릭 시 자기 자신의
  // onClick 토글과 이 리스너가 서로 충돌해 두 번 토글되는 걸 막는다.
  useEffect(() => {
    if (!open) return;

    function handlePointerDown(event: PointerEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, setOpen]);

  return (
    <SelectContext.Provider value={{ value, setValue, open, setOpen }}>
      <div ref={wrapperRef} className={cn("relative inline-flex flex-col", className)}>
        {children}
      </div>
    </SelectContext.Provider>
  );
}

type SelectTriggerProps = ButtonHTMLAttributes<HTMLButtonElement>;

function SelectTrigger({ children, className, type = "button", ...props }: SelectTriggerProps) {
  const { value, open, setOpen } = useSelectContext();
  const isSelected = value !== undefined;

  return (
    <button
      type={type}
      aria-haspopup="listbox"
      aria-expanded={open}
      onClick={() => setOpen(!open)}
      className={cn(SELECT_TRIGGER.base, className)}
      {...props}
    >
      <span>{children}</span>
      <div
        aria-hidden="true"
        className={cn(
          "flex shrink-0 items-center justify-center",
          SELECT_TRIGGER.dot.shape,
          isSelected ? SELECT_TRIGGER.dot.selectedBg : SELECT_TRIGGER.dot.unselectedBg,
        )}
      >
        <div
          className={cn(
            SELECT_TRIGGER.innerDot.shape,
            isSelected ? SELECT_TRIGGER.innerDot.selectedBg : SELECT_TRIGGER.innerDot.unselectedBg,
          )}
        />
      </div>
    </button>
  );
}

type SelectContentProps = HTMLAttributes<HTMLUListElement>;

function SelectContent({ className, children, ...props }: SelectContentProps) {
  const { open } = useSelectContext();

  return (
    <ul role="listbox" className={cn(SELECT_CONTENT_BASE, !open && "hidden", className)} {...props}>
      {children}
    </ul>
  );
}

type SelectItemProps = HTMLAttributes<HTMLLIElement> & {
  value: string;
};

function SelectItem({ value, children, className, ...props }: SelectItemProps) {
  const { value: selectedValue, setValue, setOpen } = useSelectContext();
  const isSelected = selectedValue === value;

  return (
    <li
      role="option"
      aria-selected={isSelected}
      onClick={() => {
        setValue(value);
        setOpen(false);
      }}
      className={cn(SELECT_ITEM.base, className)}
      {...props}
    >
      <span>{children}</span>
      <div
        aria-hidden="true"
        className={cn(
          SELECT_ITEM.dot.shape,
          isSelected ? SELECT_ITEM.dot.selectedBg : SELECT_ITEM.dot.unselectedBg,
        )}
      />
    </li>
  );
}

type SelectComponent = typeof SelectRoot & {
  Root: typeof SelectRoot;
  Trigger: typeof SelectTrigger;
  Content: typeof SelectContent;
  Item: typeof SelectItem;
};

const Select: SelectComponent = Object.assign(SelectRoot, {
  Root: SelectRoot,
  Trigger: SelectTrigger,
  Content: SelectContent,
  Item: SelectItem,
});

export default Select;
