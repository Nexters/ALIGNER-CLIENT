/** idle: 아직 시작하지 않음 / inProgress: 도전 중 / completed: 완성 */
export type PoseChallengeStatus = "idle" | "inProgress" | "completed";

/** "자세 도전 현황"에 나열되는 자세 하나의 도전 진행 상태 */
export interface PoseChallenge {
  id: string;
  name: string;
  /** 신체 부위 그룹명. 예: "등", "복부", "골반" */
  bodyPart: string;
  /** 완주 횟수(도장 수). 화면의 `3 / 4`의 분자 */
  current: number;
  /** 완성에 필요한 완주 횟수. 화면의 `3 / 4`의 분모 */
  total: number;
  imageSrc: string;
  status: PoseChallengeStatus;
}
