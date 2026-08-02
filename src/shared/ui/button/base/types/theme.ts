import type { ButtonColor } from "../constants/variant";

export const BUTTON_BASE =
  "w-full items-center justify-center px-[2rem] py-[1.6rem] rounded-[1.6rem] text-body-emphasized";

export const BUTTON_DISABLED =
  "disabled:cursor-not-allowed disabled:bg-gray-95 disabled:text-gray-8";

export const BUTTON_COLOR: Record<NonNullable<ButtonColor>, string> = {
  primary: "bg-gray-10 text-white active:text-gray-40",
};
