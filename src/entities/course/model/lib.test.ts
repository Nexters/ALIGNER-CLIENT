import { describe, expect, test } from "vitest";
import { normalizePoseName } from "./lib";

describe("normalizePoseName", () => {
  test("자세 접미사를 뗀다", () => {
    expect(normalizePoseName("낙타자세")).toBe("낙타");
    expect(normalizePoseName("휠 자세")).toBe("휠");
  });

  test("이름 중간의 띄어쓰기를 없앤다", () => {
    expect(normalizePoseName("반 보트")).toBe("반보트");
    expect(normalizePoseName("사이드 플랭크")).toBe("사이드플랭크");
  });

  test("접미사와 띄어쓰기가 같이 있어도 정규화한다", () => {
    expect(normalizePoseName("사이드 플랭크 자세")).toBe("사이드플랭크");
  });

  test("이미 정규화된 이름은 그대로 둔다", () => {
    expect(normalizePoseName("휠")).toBe("휠");
  });
});
