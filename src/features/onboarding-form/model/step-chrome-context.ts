import { createContext } from "react";

export type StepChromeContextValue = {
  isCTAHidden: boolean;
  setIsCTAHidden: (hidden: boolean) => void;
};

export const StepChromeContext = createContext<StepChromeContextValue | undefined>(undefined);
