import { useLocation } from "react-router";
import { requestKakaoLogin } from "@/features/login";
import { CTAButton } from "@/shared/ui/button";
import { ROUTES } from "@/shared/config/routes";
import { KakaoIcon, LogoIcon } from "@/shared/ui/icons";
import 메인이미지 from "@/shared/assets/imgs/main.png";

export function Login() {
  const location = useLocation();
  const error = (location.state as { error?: string } | null)?.error;

  const handleKakaoLogin = () => {
    requestKakaoLogin(`${window.location.origin}${ROUTES.loginCallback}`);
  };

  return (
    <main
      className="relative flex h-screen flex-col items-center justify-between bg-cover bg-center"
      style={{ backgroundImage: `url(${메인이미지})` }}
    >
      <LogoIcon className="absolute top-1/2 left-1/2 w-[19.8rem] -translate-x-1/2 -translate-y-1/2 text-white" />

      {error && (
        <p className="absolute bottom-[20rem] typo-caption-1-emphasized text-ink-error">{error}</p>
      )}

      <CTAButton className="bottom-[12.5rem]">
        <CTAButton.Single
          className="flex items-center justify-center gap-[0.8rem] bg-kakao text-black"
          onClick={handleKakaoLogin}
        >
          <KakaoIcon />
          카카오로 3초만에 시작하기
        </CTAButton.Single>
      </CTAButton>
    </main>
  );
}
