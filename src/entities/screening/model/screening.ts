export function screeningResultQueryKey() {
  return ["screening", "latest-result"] as const;
}

export function bodyPartsQueryKey() {
  return ["screening", "body-parts"] as const;
}
