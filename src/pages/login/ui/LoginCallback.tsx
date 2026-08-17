import { useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { loginWithKakaoCode } from "@/features/login";
import { ROUTES } from "@/shared/config/routes";

export function LoginCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const hasRequested = useRef(false);

  useEffect(() => {
    if (hasRequested.current) return;
    hasRequested.current = true;

    const code = searchParams.get("code");
    if (!code) {
      navigate(ROUTES.login, {
        replace: true,
        state: { error: "카카오 로그인 코드를 받지 못했습니다." },
      });
      return;
    }

    loginWithKakaoCode(code).then((result) => {
      if (result.success) {
        navigate(ROUTES.home, { replace: true });
      } else {
        navigate(ROUTES.login, { replace: true, state: { error: result.message } });
      }
    });
  }, [searchParams, navigate]);

  return null;
}
