import { Link, useNavigate } from "react-router";
import { useMemberProfile, useWithdrawMember } from "@/entities/member";
import { setAccessToken } from "@/shared/api";
import { ROUTES } from "@/shared/config/routes";
import { BackArrowIcon } from "@/shared/ui/icons";
import { MuscleTargetCard } from "./MuscleTargetCard";

export function MyPage() {
  const navigate = useNavigate();
  const { data: member } = useMemberProfile();
  const withdrawMember = useWithdrawMember();

  // TODO: window.confirm 대신 shared/ui 확인 모달 컴포넌트로 교체
  const handleLogout = () => {
    if (!window.confirm("로그아웃 하시겠습니까?")) return;
    setAccessToken(null);
    navigate(ROUTES.login);
  };

  // TODO: window.confirm 대신 shared/ui 확인 모달 컴포넌트로 교체
  const handleWithdraw = () => {
    if (!window.confirm("회원탈퇴 하시겠습니까?")) return;
    withdrawMember.mutate(undefined, {
      onSuccess: () => {
        setAccessToken(null);
        navigate(ROUTES.login);
      },
    });
  };

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
                {member?.nickname ? `${member.nickname}님` : ""}
              </span>
              <span className="typo-caption-1-regular text-ink-muted">편집 ›</span>
            </Link>

            <MuscleTargetCard />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <MyMenuRow label="로그아웃" onClick={handleLogout} />
          <MyMenuRow
            label="회원탈퇴"
            onClick={handleWithdraw}
            disabled={withdrawMember.isPending}
          />
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

function MyMenuRow({
  label,
  onClick,
  disabled,
}: {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="flex items-center justify-between py-4 text-left typo-body-regular text-ink-base disabled:opacity-40"
    >
      {label}
      <BackArrowIcon className="size-7 -scale-x-100 text-ink-base" />
    </button>
  );
}
