import type { VoiceCueResponse } from "@/shared/api/generated/data-contracts";

export interface ActiveVoiceCues {
  current: VoiceCueResponse | null;
  next: VoiceCueResponse | null;
}

interface ResolvedCue {
  cue: VoiceCueResponse;
  start: number;
  end: number | null;
}

// startOffsetSeconds가 null이면 "타임코드 미확정 → displayOrder 순차 재생"이라는 스펙 문구대로,
// 전체 동작 시간을 순서대로 균등하게 나눠서 각 자막의 구간을 만든다.
function resolveTimecode(
  cue: VoiceCueResponse,
  index: number,
  total: number,
  totalDurationSeconds: number,
): ResolvedCue {
  if (cue.startOffsetSeconds != null) {
    return { cue, start: cue.startOffsetSeconds, end: cue.endOffsetSeconds ?? null };
  }
  const sliceSeconds = totalDurationSeconds / total;
  return { cue, start: index * sliceSeconds, end: (index + 1) * sliceSeconds };
}

function isWithin(resolved: ResolvedCue, currentTime: number): boolean {
  if (currentTime < resolved.start) return false;
  return resolved.end === null || currentTime < resolved.end;
}

export function getActiveVoiceCues(
  cues: VoiceCueResponse[],
  currentTime: number,
  totalDurationSeconds: number,
): ActiveVoiceCues {
  const sorted = cues.slice().sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0));
  const resolved = sorted.map((cue, index) =>
    resolveTimecode(cue, index, sorted.length, totalDurationSeconds),
  );
  const currentIndex = resolved.findIndex((entry) => isWithin(entry, currentTime));

  if (currentIndex === -1) {
    const upcoming = resolved.find((entry) => entry.start > currentTime) ?? null;
    return { current: null, next: upcoming?.cue ?? null };
  }

  return { current: resolved[currentIndex].cue, next: resolved[currentIndex + 1]?.cue ?? null };
}
