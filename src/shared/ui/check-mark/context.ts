import { createContext, useContext } from "react";

export const CheckMarkItemContext = createContext<boolean | null>(null);

export function useCheckMarkItemContext(): boolean {
  const context = useContext(CheckMarkItemContext);
  if (context === null) {
    throw new Error("CheckMarkGroup.Indicator/Label must be used within CheckMarkGroup.Item");
  }
  return context;
}
