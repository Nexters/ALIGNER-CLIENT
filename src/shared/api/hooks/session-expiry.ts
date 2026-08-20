import type { AfterResponseHook } from "ky";
import { ROUTES } from "@/shared/config/routes";
import { setAccessToken } from "../access-token";

const KAKAO_LOGIN_PATH = "/auth/kakao";

export const sessionExpiry: AfterResponseHook = ({ request, response }) => {
  const isKakaoLogin = new URL(request.url).pathname === KAKAO_LOGIN_PATH;
  if (response.status === 401 && !isKakaoLogin) {
    setAccessToken(null);
    window.location.href = ROUTES.login;
  }
};
