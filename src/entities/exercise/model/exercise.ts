export function exerciseQueryKey(exerciseId: number | null) {
  return ["catalog", "exercises", exerciseId] as const;
}
