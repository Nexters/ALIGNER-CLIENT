import { useEffect, useRef, useState } from "react";

export type CourseIntroPhase = "intro" | "lit" | "open";

const LIT_DELAY_MS = 240;
const OPEN_DELAY_MS = 1950;

export function useCourseIntroTransition() {
  const [phase, setPhase] = useState<CourseIntroPhase>("intro");
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    timersRef.current = [
      setTimeout(() => setPhase("lit"), LIT_DELAY_MS),
      setTimeout(() => setPhase("open"), OPEN_DELAY_MS),
    ];
    return () => {
      timersRef.current.forEach(clearTimeout);
    };
  }, []);

  function open() {
    // 아직 안 끝난 lit/open 예약 타이머가 나중에 다시 발화하면 열린 화면을 되돌려버린다 —
    // 조기 open은 그 예약을 취소해야 한다
    timersRef.current.forEach(clearTimeout);
    setPhase("open");
  }

  return { phase, open };
}
