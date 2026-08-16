import { useContext } from "react";
import { StepChromeContext } from "../model/step-chrome-context";

// 스텝이 인트로처럼 CTA 없이 보여줘야 하는 구간에서, 자기 자신의 로컬 상태를 이 훅으로 부모(Layout)의 CTA 버튼에 반영한다
export function useStepChrome() {
  const context = useContext(StepChromeContext);
  if (!context) throw new Error("useStepChrome은 StepChromeProvider 안에서만 쓸 수 있다");
  return context;
}
