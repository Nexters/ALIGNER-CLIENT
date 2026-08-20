// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from "vitest";
import { isAuthenticated, setAccessToken } from "@/shared/api";
import { stubFetch } from "@/shared/lib/test/stub-fetch";
import { loginWithKakaoCode } from "./login-with-kakao-code";

afterEach(() => {
  setAccessToken(null);
  vi.unstubAllGlobals();
});

describe("loginWithKakaoCode", () => {
  it("교환에 성공하면 토큰을 저장하고 success: true를 반환한다", async () => {
    stubFetch(
      new Response(JSON.stringify({ accessToken: "issued-token", expiresIn: 1_209_600 }), {
        status: 200,
      }),
    );

    const result = await loginWithKakaoCode("valid-code");

    expect(result).toEqual({ success: true });
    expect(isAuthenticated()).toBe(true);
  });

  it("교환에 실패하면 토큰을 저장하지 않고 에러 code/message를 반환한다", async () => {
    stubFetch(
      new Response(
        JSON.stringify({
          code: "KAKAO_AUTH_CODE_INVALID",
          message: "카카오 인가 코드가 유효하지 않습니다",
        }),
        { status: 401 },
      ),
    );

    const result = await loginWithKakaoCode("invalid-code");

    expect(result).toEqual({
      success: false,
      code: "KAKAO_AUTH_CODE_INVALID",
      message: "카카오 인가 코드가 유효하지 않습니다",
    });
    expect(isAuthenticated()).toBe(false);
  });
});
