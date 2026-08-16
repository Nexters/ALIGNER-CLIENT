import { useState, type ReactNode } from "react";
import { StepChromeContext } from "../model/step-chrome-context";

export function StepChromeProvider({ children }: { children: ReactNode }) {
  const [isCTAHidden, setIsCTAHidden] = useState(false);
  return (
    <StepChromeContext.Provider value={{ isCTAHidden, setIsCTAHidden }}>
      {children}
    </StepChromeContext.Provider>
  );
}
