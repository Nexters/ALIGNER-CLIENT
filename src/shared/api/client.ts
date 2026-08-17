import ky from "ky";
import { ROUTES } from "@/shared/config/routes";
import { clearAccessToken, getAccessToken } from "./token";

const KAKAO_LOGIN_PATH = "/auth/kakao";

export const apiClient = ky.create({
  baseUrl: import.meta.env.VITE_API_BASE_URL,
  timeout: 10_000,
  throwHttpErrors: false,
  hooks: {
    beforeRequest: [
      ({ request }) => {
        const token = getAccessToken();
        if (token) {
          request.headers.set("Authorization", `Bearer ${token}`);
        }
      },
    ],
    afterResponse: [
      ({ request, response }) => {
        const isKakaoLogin = new URL(request.url).pathname === KAKAO_LOGIN_PATH;
        if (response.status === 401 && !isKakaoLogin) {
          clearAccessToken();
          window.location.href = ROUTES.login;
        }
      },
    ],
  },
});
