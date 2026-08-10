import { IconButton } from "@/shared/ui/button";
import { BackArrowIcon } from "@/shared/ui/icons";
import {
  BACK_BUTTON,
  BACK_BUTTON_FILL_CLIP,
  BACK_BUTTON_FILL_DIAGONAL,
  BACK_BUTTON_FILL_WHITE,
  BACK_BUTTON_RING_CLIP,
  BACK_BUTTON_RING_SHEEN,
  BACK_BUTTON_WRAPPER,
} from "./theme";

type BackButtonProps = {
  onBack: () => void;
};

export default function BackButton({ onBack }: BackButtonProps) {
  return (
    <div className={BACK_BUTTON_WRAPPER}>
      {/* 링: 아래 body fill과 같은 베이스를 써서, 흰색 sheen이 밝히는 부분을 제외하면 1px 테두리가 body 색과 자연스럽게 이어짐 */}
      <div aria-hidden="true" className={BACK_BUTTON_RING_CLIP}>
        <div className={BACK_BUTTON_FILL_WHITE} />
        <div className={BACK_BUTTON_RING_SHEEN} />
      </div>
      <div aria-hidden="true" className={BACK_BUTTON_FILL_CLIP}>
        <div className={BACK_BUTTON_FILL_DIAGONAL} />
      </div>
      <IconButton
        icon={BackArrowIcon}
        aria-label="뒤로가기"
        onClick={onBack}
        className={BACK_BUTTON}
        iconClassName="size-[3.6rem] text-gray-10"
      />
    </div>
  );
}
