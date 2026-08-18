import { Link } from "react-router";
import { ROUTES } from "@/shared/config/routes";
import { BackArrowIcon } from "@/shared/ui/icons";
import { MuscleTargetCard } from "./MuscleTargetCard";

// TODO: 실제 유저 프로필 API 연동 전까지의 목데이터
const MOCK_NICKNAME = "한두살차이";

export function MyPage() {
  return (
    <main className="flex min-h-screen flex-col bg-gray-97">
      <div className="flex flex-1 flex-col gap-[36px] px-6 pt-5">
        <div className="flex flex-col gap-7">
          <h1 className="typo-title-1-emphasized text-ink-base">마이</h1>

          <div className="flex flex-col gap-5">
            <Link
              to={ROUTES.myEdit}
              className="flex items-center gap-[14px] rounded-[18px] bg-gray-99 px-6 py-5"
            >
              <span className="flex-1 typo-headline-emphasized text-[#4a4a4a]">
                {MOCK_NICKNAME}님
              </span>
              <span className="typo-caption-1-regular text-ink-muted">편집 ›</span>
            </Link>

            <MuscleTargetCard />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          {/* TODO: 확인 모달 및 로그아웃 처리 */}
          <MyMenuRow label="로그아웃" />
          {/* TODO: 확인 모달 및 회원탈퇴 처리 */}
          <MyMenuRow label="회원탈퇴" />
        </div>
      </div>

      <footer className="flex items-center gap-3 bg-gray-95 px-6 pt-6 pb-[130px] typo-caption-2-emphasized text-gray-60">
        {/* TODO: 개인정보 처리방침 웹뷰 연결 */}
        <button type="button">개인정보 처리방침</button>
        <span aria-hidden="true" className="size-2 rounded-full bg-gray-60" />
        {/* TODO: 서비스 이용약관 웹뷰 연결 */}
        <button type="button">서비스 이용약관</button>
      </footer>
    </main>
  );
}

function MyMenuRow({ label }: { label: string }) {
  return (
    <button
      type="button"
      className="flex items-center justify-between py-4 text-left typo-body-regular text-ink-base"
    >
      {label}
      <BackArrowIcon className="size-7 -scale-x-100 text-ink-base" />
    </button>
  );
}
