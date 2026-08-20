import { useEffect } from "react";
import { useLocation } from "react-router";

export function ScrollToTop() {
  const { pathname } = useLocation();

  // 브라우저 기본 scrollRestoration("auto")을 끄지 않으면, 뒤로가기 시 브라우저가
  // 이전 히스토리 엔트리의 스크롤 위치를 비동기로 복원하면서 아래 window.scrollTo(0, 0)를 덮어쓴다.
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
