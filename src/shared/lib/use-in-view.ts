import { useEffect, useRef, useState } from "react";

interface UseInViewOptions {
  /** 요소가 몇 % 보여야 in-view로 볼지 */
  threshold?: number;
  /** 뷰포트 경계를 안쪽으로 당겨서, 화면에 딱 들어오기 전에 미리 트리거하고 싶을 때 사용 */
  rootMargin?: string;
}

/**
 * 요소가 뷰포트에 처음 들어오는 시점을 감지한다. 스크롤 reveal 같은
 * 1회성 진입 애니메이션 트리거용 — 한 번 보이면 다시 관찰하지 않는다.
 */
export function useInView<T extends HTMLElement>({
  threshold = 0.2,
  rootMargin = "0px 0px -10% 0px",
}: UseInViewOptions = {}) {
  const ref = useRef<T>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || isInView) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [isInView, threshold, rootMargin]);

  return { ref, isInView };
}
