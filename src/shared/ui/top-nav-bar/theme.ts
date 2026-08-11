export const TOP_NAV_BAR_BASE = "flex h-[5.6rem] w-full items-center gap-[1rem] px-[2rem]";

// 원형 컨테이너. 흰 베이스(bg-white/40) + 그림자를 직접 가지고, overflow-hidden으로 자식들을 원형으로 clip
export const BACK_BUTTON_WRAPPER =
  "relative size-[4.4rem] shrink-0 overflow-hidden rounded-full bg-white/40 shadow-back-button";
// 대각선 흰 반짝임(유리 하이라이트). BACK_BUTTON_FILL이 inset-[0.5px]로 살짝 작아서, 실제로 보이는 부분은 0.5px 링 테두리뿐
export const BACK_BUTTON_RING_SHEEN =
  "absolute inset-0 mix-blend-screen bg-gradient-to-tr from-transparent via-white/40 to-transparent";
// 유리 재질처럼 보이게 하는 대각선 음영. inset-[0.5px]로 wrapper보다 살짝 작게 그려서 테두리를 남김
export const BACK_BUTTON_FILL =
  "absolute inset-[0.5px] rounded-full pointer-events-none [background:linear-gradient(135deg,color-mix(in_srgb,var(--color-black)_10%,transparent)_0%,transparent_70%,color-mix(in_srgb,var(--color-white)_35%,transparent)_100%)]";
// 실제 클릭 가능한 아이콘 버튼. 데코 레이어들 위에 올라가는 최상단 레이어
export const BACK_BUTTON = "absolute inset-0 size-full rounded-full";

export const RIGHT_ICON_SLOT = "size-[3.6rem] shrink-0";
export const CENTER_SLOT = "flex min-w-0 flex-1 items-center justify-center";
