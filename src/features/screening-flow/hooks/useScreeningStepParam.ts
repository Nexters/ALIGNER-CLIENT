import { useSearchParams } from "react-router";
import type { ScreeningStep } from "../model/screening-steps";

export function useScreeningStepParam(): ScreeningStep | undefined {
  const [searchParams] = useSearchParams();
  return (searchParams.get("step") ?? undefined) as ScreeningStep | undefined;
}
