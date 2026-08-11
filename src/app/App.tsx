import { QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router";
import { Layout } from "./layout";
import { APP_ROUTES } from "./routes";
import { queryClient } from "@/shared/config/query-client";

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Layout>
          <Routes>
            {APP_ROUTES.map(({ path, element }) => (
              <Route key={path} path={path} element={element} />
            ))}
          </Routes>
        </Layout>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
