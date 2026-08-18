import type { BodyPart, ScreeningCause } from "../api/types";

export function deriveWeakBodyParts(
  causes: Pick<ScreeningCause, "bodyPartCode">[],
  bodyParts: BodyPart[],
): BodyPart[] {
  const nameByCode = new Map(bodyParts.map((part) => [part.bodyPartCode, part.name]));
  const seen = new Set<string>();
  const result: BodyPart[] = [];

  for (const cause of causes) {
    if (seen.has(cause.bodyPartCode)) continue;
    seen.add(cause.bodyPartCode);

    const name = nameByCode.get(cause.bodyPartCode);
    if (name) result.push({ bodyPartCode: cause.bodyPartCode, name });
  }

  return result;
}
