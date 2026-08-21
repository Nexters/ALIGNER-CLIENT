import { QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import { bodyPartsQueryKey } from "@/entities/screening";
import { getBodyParts } from "@/features/screening-flow";
import { Layout } from "./layouts/Layout";
import { APP_ROUTES } from "./routes";
import { ScrollToTop } from "./ScrollToTop";
import { isAuthenticated } from "@/shared/api";
import { queryClient } from "@/shared/config/query-client";

export function App() {
  // 부위 목록은 유저 입력과 무관한 고정 참조 데이터라 앱 시작 시 미리 당겨둔다
  // (온보딩·스크리닝 진단 화면이 나중에 다시 fetch하지 않고 이 캐시를 그대로 쓴다).
  // 인증된 사용자만 접근하는 화면에서 쓰이므로, 로그인 전에는 요청하지 않는다
  // (보안 엔드포인트라 미인증 요청은 401 → 강제 리로드를 반복 트리거한다).
  useEffect(() => {
    if (!isAuthenticated()) return;

    queryClient.prefetchQuery({
      queryKey: bodyPartsQueryKey(),
      queryFn: getBodyParts,
      staleTime: Infinity,
    });
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ScrollToTop />
        <Layout>
          <Routes>
            {Object.entries(APP_ROUTES).map(([key, group]) => {
              const paths = group.paths.map(({ path, element }) => (
                <Route key={path} path={path} element={element} />
              ));
              const withLayout = group.layout ? (
                <Route element={group.layout}>{paths}</Route>
              ) : (
                paths
              );

              return group.guard ? (
                <Route key={key} element={group.guard}>
                  {withLayout}
                </Route>
              ) : (
                withLayout
              );
            })}
          </Routes>
        </Layout>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
