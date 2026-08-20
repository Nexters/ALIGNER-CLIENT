import { QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router";
import { Layout } from "./layouts/Layout";
import { APP_ROUTES } from "./routes";
import { ScrollToTop } from "./ScrollToTop";
import { queryClient } from "@/shared/config/query-client";

export function App() {
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
