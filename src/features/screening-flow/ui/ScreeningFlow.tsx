import { StepRouter } from "./StepRouter";

export function ScreeningFlow() {
  return (
    <main className="flex h-screen -mx-[2rem] bg-[linear-gradient(180deg,#F6F7F3_15%,#F9FFC0_100%)]">
      <StepRouter />
    </main>
  );
}
