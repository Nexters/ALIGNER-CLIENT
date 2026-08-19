import { vi } from "vitest";

export function stubFetch(response: Response) {
  const fetchMock = vi.fn<(request: Request) => Promise<Response>>(async () => response);
  vi.stubGlobal("fetch", fetchMock);
  return fetchMock;
}
