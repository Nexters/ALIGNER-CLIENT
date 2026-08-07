export type ButtonColor = "primary" | "tertiary";
export type ButtonSize = "large" | "medium";

export const BUTTON_BASE = "flex items-center justify-center typo-body-emphasized";

export const BUTTON_SIZE: Record<NonNullable<ButtonSize>, string> = {
  large: "w-full px-6 py-5 rounded-[1.6rem]",
  medium: "w-[12.4rem] h-[3.8rem] rounded-[0.8rem]",
};

export const BUTTON_DISABLED =
  "disabled:cursor-not-allowed disabled:bg-gray-95 disabled:text-gray-80";

export const BUTTON_COLOR: Record<NonNullable<ButtonColor>, string> = {
  primary: "bg-gray-10 text-white active:text-gray-40",
  tertiary: "bg-tertiary-700 text-primary-200 active:text-primary-700",
};
