import { useNavigate } from "react-router";
import { CTAButton } from "@/shared/ui/button";
import { ROUTES } from "@/shared/config/routes";
import { KakaoIcon, MannequinIcon } from "@/shared/ui/icons";

export function LoginPage() {
  const navigate = useNavigate();

  return (
    <main className="relative flex h-screen flex-col items-center justify-between">
      {/* TODO: 로고 */}

      <MannequinIcon className="absolute w-[21rem] bottom-0" />

      <CTAButton
        color="secondary"
        className="absolute flex gap-[0.8rem] items-center justify-center bg-kakao bottom-[12.5rem] p-[1.6rem] rounded-[1.6rem] text-black"
        // TODO: 로그인 페이지에서 카카오 로그인 버튼 클릭 시, 카카오 로그인 API 호출 후, 토큰 발급 및 회원가입/로그인 처리 로직 구현 필요
        onClick={() => navigate(ROUTES.login)}
      >
        <KakaoIcon />
        <span className="typo-body-emphasized">카카오로 3초만에 시작하기</span>
      </CTAButton>
    </main>
  );
}
