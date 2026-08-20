export type ButtonColor = "primary" | "tertiary" | "secondary" | "white" | "black";
export type ButtonSize = "large" | "medium" | "small";

export const BUTTON_BASE = "flex items-center justify-center";

export const BUTTON_SIZE: Record<NonNullable<ButtonSize>, string> = {
  large: "w-full px-6 py-5 rounded-[1.6rem] typo-body-emphasized",
  medium: "w-[12.4rem] h-[3.8rem] rounded-[0.8rem] typo-body-emphasized",
  small:
    "inline-flex h-[4.2rem] gap-[1rem] px-[1.6rem] py-[0.6rem] rounded-[2rem] typo-subheadline-emphasized",
};

export const BUTTON_DISABLED =
  "disabled:cursor-not-allowed disabled:bg-gray-95 disabled:text-gray-80 disabled:border-gray-95 disabled:outline-none";

type ButtonColorTheme = {
  base: string;
  selected?: string;
  disabled?: string;
};

export const BUTTON_COLOR: Record<NonNullable<ButtonColor>, ButtonColorTheme> = {
  primary: { base: "bg-gray-10 text-white active:text-gray-40" },
  tertiary: { base: "bg-tertiary-700 text-primary-200 active:text-primary-700" },
  secondary: {
    base: "bg-bg-surface text-gray-10 border-[1px] border-border-base active:bg-primary-50",
    selected:
      "bg-primary-50 border-accent-base outline outline-[1px] outline-accent-base outline-offset-0",
  },
  white: {
    base: "bg-white text-gray-50",
    selected: "bg-gray-10 text-white",
  },
  black: {
    base: "bg-gray-20 text-gray-98 active:bg-accent-base active:text-ink-base",
    disabled:
      "disabled:cursor-not-allowed disabled:bg-gray-5 disabled:text-gray-50 disabled:outline-none",
  },
};
