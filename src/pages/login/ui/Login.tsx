import { useLocation } from "react-router";
import { requestKakaoLogin } from "@/features/login";
import { CTAButton } from "@/shared/ui/button";
import { ROUTES } from "@/shared/config/routes";
import { KakaoIcon, MannequinIcon } from "@/shared/ui/icons";
import 메인 from "@/shared/assets/imgs/main.png";

export function Login() {
  const location = useLocation();
  const error = (location.state as { error?: string } | null)?.error;

  const handleKakaoLogin = () => {
    requestKakaoLogin(`${window.location.origin}${ROUTES.loginCallback}`);
  };

  return (
    <main
      className="relative flex h-screen flex-col items-center justify-between bg-cover bg-center"
      style={{ backgroundImage: `url(${메인})` }}
    >
      {/* TODO: 로고 */}

      <MannequinIcon className="absolute w-[21rem] bottom-0" />

      {error && (
        <p className="absolute bottom-[20rem] typo-caption-1-emphasized text-ink-error">{error}</p>
      )}

      <CTAButton
        color="secondary"
        className="absolute flex gap-[0.8rem] items-center justify-center bg-kakao bottom-[12.5rem] p-[1.6rem] rounded-[1.6rem] text-black"
        onClick={handleKakaoLogin}
      >
        <KakaoIcon />
        <span className="typo-body-emphasized">카카오로 3초만에 시작하기</span>
      </CTAButton>
    </main>
  );
}
