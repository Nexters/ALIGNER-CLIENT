const WEEKDAY_LABELS = ["일", "월", "화", "수", "목", "금", "토"];

export function toWeekdayLabel(date: string): string {
  return WEEKDAY_LABELS[new Date(`${date}T00:00:00+09:00`).getDay()];
}
