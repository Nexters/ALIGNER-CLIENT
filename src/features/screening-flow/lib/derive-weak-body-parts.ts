import type {
  BodyPartResponse,
  ScreeningCauseResponse,
} from "@/shared/api/generated/data-contracts";
import type { BodyPartCode } from "../constants/body-parts";

export type WeakBodyPart = { bodyPartCode: BodyPartCode; name: string };

export function deriveWeakBodyParts(
  causes: Pick<ScreeningCauseResponse, "bodyPartCode">[],
  bodyParts: BodyPartResponse[],
): WeakBodyPart[] {
  const nameByCode = new Map(bodyParts.map((part) => [part.bodyPartCode, part.name]));
  const seen = new Set<BodyPartCode>();
  const result: WeakBodyPart[] = [];

  for (const cause of causes) {
    if (!cause.bodyPartCode || seen.has(cause.bodyPartCode)) continue;
    seen.add(cause.bodyPartCode);

    const name = nameByCode.get(cause.bodyPartCode);
    if (name) result.push({ bodyPartCode: cause.bodyPartCode, name });
  }

  return result;
}
