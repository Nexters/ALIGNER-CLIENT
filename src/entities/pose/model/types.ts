/** "자세 도전 현황"에 나열되는 자세 하나의 도전 진행 상태 */
export interface PoseChallenge {
  id: string;
  name: string;
  /** 신체 부위 그룹명. 예: "등", "복부", "골반" */
  bodyPart: string;
  current: number;
  total: number;
  imageSrc: string;
}
