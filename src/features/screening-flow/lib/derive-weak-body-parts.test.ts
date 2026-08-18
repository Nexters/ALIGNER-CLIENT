import { describe, expect, test } from "vitest";
import type { BodyPartCode } from "../constants/body-parts";
import { deriveWeakBodyParts } from "./derive-weak-body-parts";

describe("deriveWeakBodyParts", () => {
  test("원인의 부위 코드를 부위 표시명과 함께 나열한다", () => {
    const weakBodyParts = deriveWeakBodyParts(
      [{ bodyPartCode: "BACK" }, { bodyPartCode: "PELVIS" }],
      [
        { bodyPartCode: "BACK", name: "등" },
        { bodyPartCode: "PELVIS", name: "골반" },
      ],
    );

    expect(weakBodyParts).toEqual([
      { bodyPartCode: "BACK", name: "등" },
      { bodyPartCode: "PELVIS", name: "골반" },
    ]);
  });

  test("같은 부위 코드를 가진 원인이 여럿이면 하나로 합친다", () => {
    const weakBodyParts = deriveWeakBodyParts(
      [{ bodyPartCode: "BACK" }, { bodyPartCode: "BACK" }, { bodyPartCode: "PELVIS" }],
      [
        { bodyPartCode: "BACK", name: "등" },
        { bodyPartCode: "PELVIS", name: "골반" },
      ],
    );

    expect(weakBodyParts).toEqual([
      { bodyPartCode: "BACK", name: "등" },
      { bodyPartCode: "PELVIS", name: "골반" },
    ]);
  });

  test("부위 목록에 없는 코드는 건너뛴다", () => {
    const weakBodyParts = deriveWeakBodyParts(
      [{ bodyPartCode: "UNKNOWN" as BodyPartCode }, { bodyPartCode: "BACK" }],
      [{ bodyPartCode: "BACK", name: "등" }],
    );

    expect(weakBodyParts).toEqual([{ bodyPartCode: "BACK", name: "등" }]);
  });
});
