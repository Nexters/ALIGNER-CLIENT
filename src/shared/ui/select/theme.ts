type IndicatorTheme = {
  shape: string;
  selectedBg: string;
  unselectedBg: string;
};

// Select.Trigger(선택창 pill) 스타일
export const SELECT_TRIGGER = {
  base: "relative z-20 flex h-[6rem] gap-[1.3rem] w-fit min-w-[14rem] items-center justify-between rounded-[1.6rem] bg-white pl-[1.4rem] py-[0.8rem] pr-[0.8rem] text-gray-10 typo-headline-regular",
  dot: {
    shape: "w-[4.4rem] h-[4.4rem] rounded-[1.6rem]",
    selectedBg: "bg-primary-500",
    unselectedBg: "bg-gray-98",
  } satisfies IndicatorTheme,
  innerDot: {
    shape: "w-[0.8rem] h-[0.8rem] rounded-full",
    selectedBg: "bg-gray-10",
    unselectedBg: "bg-gray-70",
  } satisfies IndicatorTheme,
};

// Select.Content(펼쳐지는 옵션 리스트) 컨테이너 스타일
export const SELECT_CONTENT_BASE =
  "relative -mt-[6rem] z-10 flex flex-col overflow-hidden rounded-[2rem] bg-tertiary-700 pt-[6rem]";

// Select.Item 스타일
export const SELECT_ITEM = {
  base: "cursor-pointer flex items-center justify-between pl-[1.6rem] pr-[2.6rem] py-[1.9rem] text-tertiary-100 active:text-primary-500 typo-body-regular",
  dot: {
    shape: "w-[0.8rem] h-[0.8rem] rounded-full shrink-0",
    selectedBg: "bg-accent-base",
    unselectedBg: "bg-tertiary-100",
  } satisfies IndicatorTheme,
};
