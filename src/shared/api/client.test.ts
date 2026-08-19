// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from "vitest";
import { apiClient } from "./client";
import { ROUTES } from "@/shared/config/routes";
import { stubFetch } from "@/shared/lib/test/stub-fetch";
import { getAccessToken, setAccessToken } from "./access-token";

afterEach(() => {
  setAccessToken(null);
  vi.unstubAllGlobals();
});

describe("apiClient", () => {
  it("저장된 토큰이 있으면 Authorization 헤더를 첨부한다", async () => {
    setAccessToken("test-token");
    const fetchMock = stubFetch(new Response(null, { status: 200 }));

    await apiClient.get("members/me");

    const [request] = fetchMock.mock.calls[0];
    expect(request.headers.get("Authorization")).toBe("Bearer test-token");
  });

  it("저장된 토큰이 없으면 Authorization 헤더를 첨부하지 않는다", async () => {
    const fetchMock = stubFetch(new Response(null, { status: 200 }));

    await apiClient.get("members/me");

    const [request] = fetchMock.mock.calls[0];
    expect(request.headers.get("Authorization")).toBeNull();
  });

  it("/auth/kakao가 아닌 요청이 401이면 토큰을 지우고 로그인 페이지로 리다이렉트한다", async () => {
    setAccessToken("test-token");
    stubFetch(
      new Response(JSON.stringify({ code: "UNAUTHORIZED", message: "인증이 필요합니다" }), {
        status: 401,
      }),
    );
    const originalLocation = window.location;
    const locationStub = { href: "" } as Location;
    Object.defineProperty(window, "location", { value: locationStub, configurable: true });

    await expect(apiClient.get("members/me")).rejects.toThrow();

    expect(getAccessToken()).toBeNull();
    expect(window.location.href).toBe(ROUTES.login);

    Object.defineProperty(window, "location", { value: originalLocation, configurable: true });
  });

  it("/auth/kakao 요청의 401은 토큰을 지우거나 리다이렉트하지 않는다", async () => {
    setAccessToken("test-token");
    stubFetch(
      new Response(
        JSON.stringify({
          code: "KAKAO_AUTH_CODE_INVALID",
          message: "인가 코드가 유효하지 않습니다",
        }),
        { status: 401 },
      ),
    );
    const originalHref = window.location.href;

    await expect(
      apiClient.post("auth/kakao", { json: { authorizationCode: "code" } }),
    ).rejects.toThrow();

    expect(getAccessToken()).toBe("test-token");
    expect(window.location.href).toBe(originalHref);
  });
});
