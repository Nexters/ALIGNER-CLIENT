import type { BodyPartCode } from "../constants/body-parts";
import type { Result } from "../model/diagnosis-status";
import Mannequin from "./Mannequin";

type ScanningMannequinProps = {
  status: Result;
  markerCodes?: BodyPartCode[];
};

export default function ScanningMannequin({ status, markerCodes = [] }: ScanningMannequinProps) {
  return (
    <Mannequin
      className="flex flex-1 items-end justify-center overflow-hidden"
      iconClassName="absolute bottom-0 w-[35rem]"
      markerCodes={status === "result" ? markerCodes : []}
    >
      {/* 스캔: 위쪽으로 옅어지는 그라데이션 + 가로 바(리딩 엣지) — 분석 중일 때만 */}
      {status === "loading" && (
        <div className="animate-scan-line absolute inset-x-0">
          <div className="h-[18.2rem] bg-[linear-gradient(180deg,rgba(236,255,63,0)_0%,rgba(236,255,63,0.2)_100%)] drop-shadow-[0_0_4px_var(--color-accent-base)]" />
          <div className="h-[1px] w-full bg-primary-500" />
        </div>
      )}
    </Mannequin>
  );
}
