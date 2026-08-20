// GET /screening/body-parts
export const BODY_PART_CODES = ["BACK", "ABDOMEN", "PELVIS"] as const;

export type BodyPartCode = (typeof BODY_PART_CODES)[number];

export const BODY_PART_NAMES: Record<BodyPartCode, string> = {
  BACK: "등",
  ABDOMEN: "복부",
  PELVIS: "골반",
};

// 마네킹 실루엣 위에 부위 마커(Radio)를 얹을 위치. 컨테이너 기준 %.
// 여기 좌표는 별도 보정 없이 몸통 기준 비율을 그대로 쓴다.
export const BODY_PART_MARKER_POSITION: Record<BodyPartCode, { top: string; left: string }> = {
  BACK: { top: "20%", left: "50%" },
  ABDOMEN: { top: "39%", left: "50%" },
  PELVIS: { top: "50%", left: "50%" },
};
