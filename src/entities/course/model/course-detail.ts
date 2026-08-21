export function courseDetailQueryKey(courseId: number) {
  return ["courses", courseId] as const;
}
