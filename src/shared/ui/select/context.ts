import { createContext, useContext } from "react";

type SelectContextValue = {
  value: string | undefined;
  setValue: (value: string) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
};

export const SelectContext = createContext<SelectContextValue | null>(null);

export function useSelectContext() {
  const context = useContext(SelectContext);
  if (!context) {
    throw new Error("Select 서브컴포넌트는 Select.Root 안에서만 사용할 수 있습니다.");
  }
  return context;
}
