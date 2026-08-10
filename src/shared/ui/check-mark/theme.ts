export const CHECK_MARK_BASE = {
  GROUP_BASE: "flex gap-[0.9rem]",
  ITEM_BASE: "flex flex-col items-center gap-[0.6rem]",
  INDICATOR_SHAPE: "flex w-[3.4rem] h-[3.4rem] items-center justify-center rounded-full",
  ICON: "w-[3.4rem] h-[3.4rem] text-primary-500",
  //현재 폰트 정해지지 x
  LABEL_BASE: "",
};

type CheckedState = "checked" | "unchecked";

export const CHECK_MARK_INDICATOR_BG: Record<CheckedState, string> = {
  checked: "bg-gray-10",
  unchecked: "bg-gray-98 border border-gray-95",
};

export const CHECK_MARK_LABEL_TEXT: Record<CheckedState, string> = {
  checked: "text-gray-10",
  unchecked: "text-gray-90",
};
