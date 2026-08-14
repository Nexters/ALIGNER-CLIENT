import { IconButton } from "@/shared/ui/button";
import { BackArrowIcon } from "@/shared/ui/icons";
import {
  BACK_BUTTON,
  BACK_BUTTON_FILL,
  BACK_BUTTON_RING_SHEEN,
  BACK_BUTTON_WRAPPER,
} from "./theme";

type BackButtonProps = {
  onBack: () => void;
};

export default function BackButton({ onBack }: BackButtonProps) {
  return (
    <div className={BACK_BUTTON_WRAPPER}>
      <div aria-hidden="true" className={BACK_BUTTON_RING_SHEEN} />
      <div aria-hidden="true" className={BACK_BUTTON_FILL} />
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
