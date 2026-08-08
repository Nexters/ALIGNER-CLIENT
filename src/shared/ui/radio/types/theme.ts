import type { RadioVariant } from "../constants/variant";

export type RadioTheme = {
  shape: string;
  selectedBg: string;
  unselectedBg: string;
};

export const RADIO_BASE = "flex items-center justify-center";

export const RADIO_VARIANT: Record<NonNullable<RadioVariant>, RadioTheme> = {
  primary: {
    shape: "w-[4.4rem] h-[4.4rem] rounded-[1.6rem]",
    selectedBg: "bg-primary-500",
    unselectedBg: "bg-gray-98",
  },
  outline: {
    shape:
      "w-[3.6rem] h-[3.6rem] rounded-full border-[0.3px] border-white bg-white/20 backdrop-blur-[2.5px]",
    selectedBg: "",
    unselectedBg: "",
  },
};

export const RADIO_INDICATOR: Record<NonNullable<RadioVariant>, RadioTheme> = {
  primary: {
    shape: "w-[0.8rem] h-[0.8rem] rounded-full",
    selectedBg: "bg-gray-10",
    unselectedBg: "bg-gray-70",
  },
  outline: {
    shape: "w-[1.44rem] h-[1.44rem] rounded-full",
    selectedBg: "bg-primary-500",
    unselectedBg: "bg-gray-97",
  },
};
