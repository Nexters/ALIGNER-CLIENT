import { login } from "@/entities/auth";
import { authApi } from "@/shared/api/http";
import type { ApiErrorResponse } from "@/shared/api/generated/data-contracts";

export type LoginWithKakaoCodeResult =
  { success: true } | { success: false; code: string; message: string };

export async function loginWithKakaoCode(
  authorizationCode: string,
): Promise<LoginWithKakaoCodeResult> {
  try {
    const response = await authApi.login({ authorizationCode });
    const accessToken = response.data.accessToken;
    if (!accessToken) {
      return { success: false, code: "UNKNOWN", message: "로그인에 실패했습니다." };
    }
    login(accessToken);
    return { success: true };
  } catch (err) {
    const apiError = (err as { error?: ApiErrorResponse }).error;
    return {
      success: false,
      code: apiError?.code ?? "UNKNOWN",
      message: apiError?.message ?? "로그인에 실패했습니다.",
    };
  }
}
