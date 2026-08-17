/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

/** 세션 시작 요청 */
export interface StartSessionRequest {
  /**
   * 수행할 코스 식별자
   * @format int64
   * @example 20
   */
  courseId: number;
  /**
   * 수행할 스텝 순서. 1 부터다
   * @format int32
   * @example 1
   */
  stepOrder: number;
}

/** 세션 완료가 코스 진행도에 반영된 결과 */
export interface CourseProgressResponse {
  /**
   * 이번 회차에서 완료한 스텝 수. **파이어로그 세그먼트가 아니다**
   * @format int32
   * @example 2
   */
  completedStepCount?: number;
  /**
   * 이 코스의 전체 스텝 수
   * @format int32
   * @example 6
   */
  totalStepCount?: number;
  /**
   * 이번 회차의 스텝을 전부 끝냈는지. **자세 완성과 다르다** — 완성은 4 회 완주다
   * @example false
   */
  courseCompleted?: boolean;
  /**
   * 이 호출로 이번 회차의 도장이 새로 붙었는지. 재시도에서는 false 다
   * @example false
   */
  stampAcquired?: boolean;
  /**
   * 이 코스의 목표 자세 식별자
   * @format int64
   * @example 3
   */
  targetPoseId?: number;
  /**
   * 목표 자세 이름. 리포트 헤더와 파이어로그 카드에 쓴다
   * @example "낙타자세"
   */
  targetPoseName?: string;
  /**
   * 목표 자세의 부위. catalog 에 자세가 없으면 null 이다
   * @example "BACK"
   */
  bodyPartCode?: "BACK" | "ABDOMEN" | "PELVIS";
  /**
   * 목표 자세의 난이도 단계
   * @format int32
   * @example 3
   */
  level?: number | null;
  /**
   * 이 자세를 지금까지 완주한 횟수 = 붙은 도장 수. **`1 / 4회` 의 분자다.** 코스를 한 번 완주할 때마다 하나씩 오른다
   * @format int32
   * @example 1
   */
  acquiredStampCount?: number;
  /**
   * 완성에 필요한 완주 횟수. `1 / 4회` 의 분모다
   * @format int32
   * @example 4
   */
  requiredStampCount?: number;
  /**
   * 이 자세를 완성했는지. `stampAcquired` 와 함께 true 면 방금 완성한 것이라 축하 화면을 띄운다
   * @example false
   */
  targetPoseCompleted?: boolean;
}

/** 세션 안의 운동 하나 */
export interface SessionExerciseRecordResponse {
  /**
   * 완료 요청에 그대로 넣을 식별자
   * @format int64
   * @example 51
   */
  courseStepExerciseId?: number;
  /**
   * 운동 식별자. 운동 가이드 조회에 쓴다
   * @format int64
   * @example 7
   */
  exerciseId?: number;
  /**
   * 운동 이름
   * @example "캣카우"
   */
  name?: string;
  /**
   * 분류
   * @example "가동성 웜업"
   */
  category?: string | null;
  /**
   * 표시 순서
   * @format int32
   * @example 1
   */
  displayOrder?: number;
  /**
   * 수행 시간(초)
   * @format int32
   * @example 120
   */
  durationSeconds?: number | null;
  /**
   * 세트 수
   * @format int32
   * @example 1
   */
  setCount?: number | null;
  /**
   * 수행 완료 여부. 시작 직후에는 전부 false 다
   * @example false
   */
  completed?: boolean;
  /**
   * 실제 수행 시간(초)
   * @format int32
   */
  performedDurationSeconds?: number | null;
}

/** 세션 상태 */
export interface SessionResponse {
  /**
   * 세션 식별자
   * @format int64
   * @example 100
   */
  sessionId?: number;
  /**
   * 코스 식별자
   * @format int64
   * @example 20
   */
  courseId?: number;
  /**
   * 수행 중인 스텝 순서
   * @format int32
   * @example 1
   */
  stepOrder?: number;
  /** 세션 상태 */
  status?: "IN_PROGRESS" | "COMPLETED";
  /**
   * 시작 시각
   * @format date-time
   */
  startedAt?: string;
  /**
   * 완료 시각. 진행 중이면 null 이다
   * @format date-time
   */
  completedAt?: string | null;
  /**
   * 완료한 운동 개수. 리포트의 "완료 동작 N 개" 다
   * @format int32
   * @example 8
   */
  completedExerciseCount?: number;
  /**
   * 이 세션의 소모 칼로리. 완료 시점에 계산해 **저장한 값**이라 나중에 몸무게가 바뀌어도 지난 리포트가 흔들리지 않는다. 몸무게·MET·수행 시간 중 하나라도 모르면 0 이 아니라 null 이다
   * @format int32
   * @example 63
   */
  estimatedKcal?: number | null;
  /** 핀포즈 직후 체감. 아직 답하지 않았으면 null 이다 */
  perceivedResult?: "SUCCEEDED" | "STILL_HARD" | "TOO_HARD";
  /** 운동별 수행 기록. displayOrder 오름차순이다 */
  exerciseRecords?: SessionExerciseRecordResponse[];
  courseProgress?: CourseProgressResponse | null;
}

/** 핀포즈 직후 체감 기록 요청 */
export interface RecordPerceivedResultRequest {
  /** SUCCEEDED(잘됐어요) · STILL_HARD(아직 어려워요) · TOO_HARD(안될 거 같아요) */
  perceivedResult: "SUCCEEDED" | "STILL_HARD" | "TOO_HARD";
}

/** 세션 완료 요청 */
export interface CompleteSessionRequest {
  /** 운동별 수행 결과 */
  exerciseRecords: ExerciseResultRequest[];
}

/** 운동 하나의 수행 결과 */
export interface ExerciseResultRequest {
  /**
   * 세션 응답의 courseStepExerciseId 를 그대로 쓴다
   * @format int64
   * @example 51
   */
  courseStepExerciseId?: number;
  /**
   * 수행 완료 여부
   * @example true
   */
  completed?: boolean;
  /**
   * 실제 수행 시간(초). 수행하지 않았으면 null 이다
   * @format int32
   * @example 120
   */
  performedDurationSeconds?: number | null;
}

/** 자세 하나에 대한 체감 */
export interface ScreeningAnswerRequest {
  /**
   * catalog 자세 그리드에서 받은 식별자
   * @format int64
   * @example 12
   */
  targetPoseId: number;
  /** EASY 는 쉬웠던 자세, HARD 는 어려웠던 자세 */
  perceivedDifficulty: "EASY" | "HARD";
}

/** 자세 체감 선택 제출 */
export interface SubmitScreeningRequest {
  /** 고른 자세와 체감. 쉬웠던 자세와 어려웠던 자세를 각각 최대 4 개까지 담는다 */
  answers: ScreeningAnswerRequest[];
}

/** 판별된 원인 하나 */
export interface ScreeningCauseResponse {
  /**
   * 원인 코드
   * @example "THORACIC_STIFFNESS"
   */
  causeCode?: string;
  /**
   * 표시용 이름
   * @example "굳은 흉추"
   */
  name?: string;
  /**
   * **원인이 있는 부위.** 회원이 고른 부위와 다를 수 있다
   * @example "BACK"
   */
  bodyPartCode?: "BACK" | "ABDOMEN" | "PELVIS";
  /** 결과 화면에 보여줄 설명 */
  description?: string | null;
  /**
   * 표시 순서. 1 이 가장 유력한 원인이다
   * @format int32
   * @example 1
   */
  rank?: number;
  /**
   * 분기 규칙 가중치의 합. 순위 근거다
   * @format int32
   * @example 7
   */
  score?: number;
}

/** 진단 결과. 원인이 순위로 실린다 */
export interface ScreeningResultResponse {
  /**
   * 이 진단의 식별자
   * @format int64
   * @example 3
   */
  resultId?: number;
  /** 판별된 원인. rank 오름차순이다 */
  causes?: ScreeningCauseResponse[];
  /**
   * 진단 시각
   * @format date-time
   */
  createdAt?: string;
}

/** 코스 추천 요청 */
export interface RecommendCourseRequest {
  /**
   * 강화할 부위 코드. `GET /screening/body-parts` 의 값이다
   * @example "BACK"
   */
  bodyPartCode: "BACK" | "ABDOMEN" | "PELVIS";
  /**
   * 난이도. 1(하)·2(중)·3(상)이며 **목표 자세의 레벨과 같은 값**이다
   * @format int32
   * @example 1
   */
  level: number;
}

/** 추천된 코스 식별자 */
export interface RecommendCourseResponse {
  /**
   * 코스 식별자
   * @format int64
   * @example 20
   */
  courseId?: number;
}

/** 카카오 로그인 요청 */
export interface KakaoLoginRequest {
  /**
   * 카카오가 리다이렉트 URI 로 넘긴 인가 코드(`code` 쿼리 파라미터). 1 회용이다
   * @example "0X1yZ...q7Rk"
   */
  authorizationCode: string;
}

/** 자체 JWT 발급 결과 */
export interface KakaoLoginResponse {
  /**
   * 이후 요청의 Authorization: Bearer 에 그대로 넣는 값
   * @example "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIn0.sig"
   */
  accessToken?: string;
  /**
   * 만료까지 남은 초. 리프레시 토큰이 없어 만료되면 authorize() 부터 다시 태운다
   * @format int64
   * @example 1209600
   */
  expiresIn?: number;
}

/** 프로필 수정 요청. 보낸 필드만 바뀐다 */
export interface UpdateMemberProfileRequest {
  /**
   * 새 닉네임. 1자 이상 50자 이하이며 위반하면 400 INVALID_NICKNAME 이다
   * @example "강혁"
   */
  nickname?: string | null;
  /**
   * 키(cm). 100 이상 250 이하
   * @format int32
   * @example 170
   */
  heightCm?: number | null;
  /**
   * 몸무게(kg). 20 이상 300 이하
   * @format int32
   * @example 60
   */
  weightKg?: number | null;
  /** 운동 경력 */
  experienceLevel?: "UNDER_ONE_YEAR" | "ONE_TO_THREE_YEARS" | "OVER_THREE_YEARS";
  /**
   * 강화 부위 코드. reinforcementLevel 과 **함께** 보내야 한다
   * @example "BACK"
   */
  reinforcementBodyPartCode?: "BACK" | "ABDOMEN" | "PELVIS";
  /**
   * 강화 난이도 1(하)·2(중)·3(상). reinforcementBodyPartCode 와 **함께** 보내야 한다
   * @format int32
   * @example 1
   */
  reinforcementLevel?: number | null;
}

/** 회원 프로필 */
export interface MemberProfileResponse {
  /**
   * 회원 식별자
   * @format int64
   * @example 1
   */
  memberId?: number;
  /**
   * 닉네임. 카카오 프로필 제공에 동의하지 않으면 null 이다
   * @example "강혁"
   */
  nickname?: string | null;
  /**
   * 키(cm). 온보딩 전이면 null 이다
   * @format int32
   * @example 170
   */
  heightCm?: number | null;
  /**
   * 몸무게(kg). 온보딩 전이면 null 이다
   * @format int32
   * @example 60
   */
  weightKg?: number | null;
  /** 운동 경력. 온보딩 전이면 null 이다 */
  experienceLevel?: "UNDER_ONE_YEAR" | "ONE_TO_THREE_YEARS" | "OVER_THREE_YEARS";
  /**
   * 회원이 고른 강화 부위. 진단 결과 뒤에 고른다. 고르기 전이면 null 이다
   * @example "BACK"
   */
  reinforcementBodyPartCode?: "BACK" | "ABDOMEN" | "PELVIS";
  /**
   * 강화 난이도. 1(하)·2(중)·3(상). 고르기 전이면 null 이다
   * @format int32
   * @example 1
   */
  reinforcementLevel?: number | null;
}

/** 이번 주 하루 */
export interface AchievementDayResponse {
  /**
   * 날짜(Asia/Seoul)
   * @format date
   * @example "2026-08-10"
   */
  date?: string;
  /**
   * 그날 세션을 하나라도 완료했는지
   * @example true
   */
  achieved?: boolean;
}

/** 연속 달성 현황 */
export interface AchievementResponse {
  /**
   * 오늘까지 이어진 연속 달성 일수. **오늘 아직 안 했어도 끊기지 않는다** — 어제까지 이어져 있으면 그 값을 유지한다. 어제도 없으면 0 이다
   * @format int32
   * @example 5
   */
  currentStreakDays?: number;
  /**
   * 이번 주에 달성한 날 수. days 의 achieved 개수와 같다
   * @format int32
   * @example 5
   */
  weeklyAchievedCount?: number;
  /** 이번 주 월요일부터 일요일까지 7 개. 오늘 이후 날짜도 achieved=false 로 실린다 */
  days?: AchievementDayResponse[];
}

/** 부위 */
export interface BodyPartResponse {
  /**
   * 부위 코드. 진단 결과 뒤 강화 부위 선택 화면의 선택지다
   * @example "BACK"
   */
  bodyPartCode?: "BACK" | "ABDOMEN" | "PELVIS";
  /**
   * 표시용 이름
   * @example "등"
   */
  name?: string;
}

/** 운영 목록용 운동 요약 */
export interface ExerciseSummaryResponse {
  /**
   * 운동 식별자
   * @format int64
   * @example 101
   */
  exerciseId?: number;
  /**
   * 운동 이름
   * @example "턱 당기기"
   */
  name?: string;
  /**
   * 대표 이미지 asset 키. **URL 이 아니다** — 파일은 프론트가 갖고 키로 매핑한다
   * @example "exercise/cat-cow"
   */
  imageAssetKey?: string | null;
  /**
   * 영상 포스터 프레임 URL. **imageAssetKey 와 달리 그대로 열리는 URL 이다** — 목록에서 그림을 확인할 때 쓴다. videoUrl 과 달리 서명도 만료도 없는 seed 값이라 외부 호출이 없다
   * @example "https://exercise-api.ymove.app/thumbnail/cat-cow-pose.jpg"
   */
  thumbnailUrl?: string | null;
  /**
   * 권장 세트 수. 시간으로 수행하는 운동이면 null 이다
   * @format int32
   * @example 3
   */
  defaultSetCount?: number | null;
  /**
   * 세트당 권장 반복 수. 시간으로 수행하는 운동이면 null 이다
   * @format int32
   * @example 10
   */
  defaultRepCount?: number | null;
  /**
   * 권장 수행 시간(초). 횟수로 수행하는 운동이면 null 이다
   * @format int32
   * @example 30
   */
  defaultDurationSeconds?: number | null;
  /**
   * 운동 강도(MET). kcal 은 회원 몸무게의 함수라 catalog 가 계산하지 않는다
   * @example 2.5
   */
  metValue?: number | null;
  /**
   * 난이도. 감수 전 데이터라 아직 값 집합을 고정하지 않았다
   * @example "EASY"
   */
  difficulty?: string | null;
  /**
   * 코스 스텝에 표시하는 분류. 감수 전 데이터라 아직 값 집합을 고정하지 않았다
   * @example "가동성 웜업"
   */
  category?: string | null;
}

/** 운영 목록용 코스 템플릿 */
export interface CourseTemplateResponse {
  /**
   * 코스 템플릿 식별자
   * @format int64
   * @example 1
   */
  templateId?: number;
  /**
   * 이 코스가 겨냥하는 목표 자세 식별자
   * @format int64
   * @example 1
   */
  targetPoseId?: number;
  /**
   * 목표 자세 이름. catalog 에서 찾지 못하면 빈 문자열이다 — 도메인 간 FK 가 없어 seed 가 앞서갈 수 있다
   * @example "낙타자세"
   */
  targetPoseName?: string;
  /**
   * 코스 이름
   * @example "낙타자세 정복하기"
   */
  name?: string;
  /**
   * 추천 사유. 온보딩에서 한 번 보여주는 문구다
   * @example "등과 골반 근육 강화에 집중해 보세요"
   */
  recommendationReason?: string | null;
  /**
   * 스텝 수
   * @format int32
   * @example 7
   */
  stepCount?: number;
  /**
   * 스텝에 편성된 운동 수의 합
   * @format int32
   * @example 7
   */
  exerciseCount?: number;
  /** 스텝 목록. 스텝 순서대로다 */
  steps?: CourseTemplateStepResponse[];
}

/** 코스 템플릿 스텝의 운동 */
export interface CourseTemplateStepExerciseResponse {
  /**
   * 운동 식별자
   * @format int64
   * @example 101
   */
  exerciseId?: number;
  /**
   * 운동 이름. catalog 에서 찾지 못하면 빈 문자열이다
   * @example "턱 당기기"
   */
  name?: string;
  /**
   * 대표 이미지 asset 키. URL 이 아니다
   * @example "exercise/cat-cow"
   */
  imageAssetKey?: string | null;
  /**
   * 운동 분류
   * @example "가동성 웜업"
   */
  category?: string | null;
  /**
   * 스텝 안에서의 표시 순서. 1 부터다
   * @format int32
   * @example 1
   */
  displayOrder?: number;
  /**
   * 수행 시간(초). 횟수로 수행하는 운동이면 null 이다
   * @format int32
   * @example 120
   */
  durationSeconds?: number | null;
  /**
   * 세트 수. 시간으로 수행하는 운동이면 null 이다
   * @format int32
   * @example 3
   */
  setCount?: number | null;
}

/** 코스 템플릿 스텝 */
export interface CourseTemplateStepResponse {
  /**
   * 스텝 순서. 1 부터다
   * @format int32
   * @example 1
   */
  stepOrder?: number;
  /** 이 스텝의 운동. 아직 편성되지 않았으면 빈 배열이다 */
  exercises?: CourseTemplateStepExerciseResponse[];
}

/** 코스 개요. 스텝과 운동을 함께 싣는다 */
export interface CourseDetailResponse {
  /**
   * 코스 식별자
   * @format int64
   * @example 20
   */
  courseId?: number;
  /**
   * 목표 자세 식별자
   * @format int64
   * @example 3
   */
  targetPoseId?: number;
  /**
   * 목표 자세 이름
   * @example "낙타 자세"
   */
  targetPoseName?: string;
  /** 목표 자세 이미지 asset 키. 개요 상단 히어로에 쓴다. URL 이 아니다 */
  targetPoseImageAssetKey?: string | null;
  /**
   * 코스 이름
   * @example "낙타자세 정복하기"
   */
  name?: string;
  /** 코스 추천 이유 */
  recommendationReason?: string | null;
  /**
   * 완료한 스텝 수
   * @format int32
   * @example 1
   */
  completedStepCount?: number;
  /**
   * 전체 스텝 수
   * @format int32
   * @example 6
   */
  totalStepCount?: number;
  /**
   * 운동 개수
   * @format int32
   * @example 6
   */
  exerciseCount?: number;
  /**
   * 세트 합계
   * @format int32
   * @example 6
   */
  totalSetCount?: number;
  /**
   * 예상 수행 시간(초). 운동 하나라도 시간을 모르면 null 이고 0 이 아니다
   * @format int32
   * @example 900
   */
  estimatedDurationSeconds?: number | null;
  /**
   * 예상 칼로리. 계산할 수 없으면 null 이다
   * @format int32
   * @example 69
   */
  estimatedKcal?: number | null;
  /** 스텝. stepOrder 오름차순이다 */
  steps?: CourseStepResponse[];
}

/** 코스 스텝의 운동 하나 */
export interface CourseStepExerciseResponse {
  /**
   * 스텝 운동 식별자
   * @format int64
   * @example 51
   */
  courseStepExerciseId?: number;
  /**
   * 운동 식별자. 운동 가이드 조회에 그대로 쓴다
   * @format int64
   * @example 7
   */
  exerciseId?: number;
  /**
   * 운동 이름
   * @example "캣카우"
   */
  name?: string;
  /**
   * 운동 이미지 asset 키. 코스 순서 카드의 썸네일이다. URL 이 아니다
   * @example "exercise/cat-cow"
   */
  imageAssetKey?: string | null;
  /**
   * 분류. 값 집합이 아직 고정되지 않았다
   * @example "가동성 웜업"
   */
  category?: string | null;
  /**
   * 표시 순서
   * @format int32
   * @example 1
   */
  displayOrder?: number;
  /**
   * 수행 시간(초). catalog 기본값까지 반영된 값이다
   * @format int32
   * @example 120
   */
  durationSeconds?: number | null;
  /**
   * 세트 수. catalog 기본값까지 반영된 값이다
   * @format int32
   * @example 1
   */
  setCount?: number | null;
  /**
   * 예상 칼로리. 계산할 수 없으면 null 이다
   * @format int32
   * @example 6
   */
  estimatedKcal?: number | null;
}

/** 코스 스텝 하나 */
export interface CourseStepResponse {
  /**
   * 스텝 식별자
   * @format int64
   * @example 31
   */
  courseStepId?: number;
  /**
   * 스텝 순서. 1 부터다
   * @format int32
   * @example 1
   */
  stepOrder?: number;
  /**
   * 완료 여부
   * @example false
   */
  completed?: boolean;
  /**
   * 완료 시각. 아직이면 null 이다
   * @format date-time
   */
  completedAt?: string | null;
  /** 이 스텝의 운동. displayOrder 오름차순이다 */
  exercises?: CourseStepExerciseResponse[];
}

/** 오늘의 코스. 진행 중인 코스다 */
export interface TodayCourseResponse {
  /**
   * 코스 식별자
   * @format int64
   * @example 20
   */
  courseId?: number;
  /**
   * 목표 자세 식별자
   * @format int64
   * @example 3
   */
  targetPoseId?: number;
  /**
   * 목표 자세 이름
   * @example "낙타 자세"
   */
  targetPoseName?: string;
  /** 목표 자세 이미지 asset 키. URL 이 아니다 */
  targetPoseImageAssetKey?: string | null;
  /**
   * 목표 자세 레벨. 회원이 고른 난이도와 같다. catalog 에서 자세를 찾지 못하면 null 이다
   * @format int32
   * @example 1
   */
  targetPoseLevel?: number | null;
  /**
   * 코스 이름
   * @example "낙타자세 정복하기"
   */
  name?: string;
  /** 코스 추천 이유. 감수 문구다 */
  recommendationReason?: string | null;
  /**
   * 다음에 수행할 스텝 순서. 다 했으면 null 이다
   * @format int32
   * @example 2
   */
  currentStepOrder?: number | null;
  /**
   * 완료한 스텝 수
   * @format int32
   * @example 1
   */
  completedStepCount?: number;
  /**
   * 전체 스텝 수
   * @format int32
   * @example 6
   */
  totalStepCount?: number;
  /**
   * 운동 개수
   * @format int32
   * @example 6
   */
  exerciseCount?: number;
  /**
   * 세트 합계
   * @format int32
   * @example 6
   */
  totalSetCount?: number;
  /**
   * 예상 수행 시간(초). 운동 하나라도 시간을 모르면 null 이고 0 이 아니다
   * @format int32
   * @example 900
   */
  estimatedDurationSeconds?: number | null;
  /**
   * 예상 칼로리. 몸무게나 MET 이 없으면 null 이고 0 이 아니다
   * @format int32
   * @example 69
   */
  estimatedKcal?: number | null;
  /**
   * 오늘 이 코스를 완주했는지. true 면 화면은 완료 상태 홈을 그린다
   * @example false
   */
  completed?: boolean;
  tomorrowPreview?: TomorrowCoursePreviewResponse | null;
}

/** 내일 운동 미리보기. 오늘의 코스를 완주했을 때만 내려온다 */
export interface TomorrowCoursePreviewResponse {
  /**
   * 목표 자세 식별자
   * @format int64
   * @example 4
   */
  targetPoseId?: number;
  /**
   * 목표 자세 이름
   * @example "비둘기 자세"
   */
  targetPoseName?: string;
  /** 목표 자세 이미지 asset 키. URL 이 아니다 */
  targetPoseImageAssetKey?: string | null;
  /**
   * 이 자세의 부위. 오늘의 코스와 같은 부위다. **코스 추천 호출에 그대로 쓴다**
   * @example "BACK"
   */
  bodyPartCode?: "BACK" | "ABDOMEN" | "PELVIS";
  /**
   * 난이도. **코스 추천의 level 로 그대로 쓴다**
   * @format int32
   * @example 2
   */
  level?: number;
  /**
   * 코스 이름
   * @example "비둘기자세 정복하기"
   */
  name?: string;
  /** 코스 추천 이유. 감수 문구다 */
  recommendationReason?: string | null;
  /**
   * 전체 스텝 수
   * @format int32
   * @example 6
   */
  totalStepCount?: number;
  /**
   * 운동 개수
   * @format int32
   * @example 6
   */
  exerciseCount?: number;
  /**
   * 세트 합계
   * @format int32
   * @example 6
   */
  totalSetCount?: number;
  /**
   * 예상 수행 시간(초). 운동 하나라도 시간을 모르면 null 이고 0 이 아니다
   * @format int32
   * @example 900
   */
  estimatedDurationSeconds?: number | null;
  /**
   * 예상 칼로리. 몸무게나 MET 이 없으면 null 이고 0 이 아니다
   * @format int32
   * @example 72
   */
  estimatedKcal?: number | null;
}

/** 자세 도전 현황 한 줄 */
export interface TargetPoseProgressItem {
  /**
   * 목표 자세 식별자
   * @format int64
   * @example 3
   */
  targetPoseId?: number;
  /**
   * 목표 자세 이름
   * @example "낙타자세"
   */
  targetPoseName?: string;
  /** 목표 자세 이미지 asset 키 */
  targetPoseImageAssetKey?: string | null;
  /**
   * 이 자세가 속한 부위. 화면의 섹션 구분이다
   * @example "BACK"
   */
  bodyPartCode?: "BACK" | "ABDOMEN" | "PELVIS";
  /**
   * 난이도 단계. 부위 안에서 작을수록 쉽다
   * @format int32
   * @example 1
   */
  level?: number;
  /**
   * 이 자세의 코스 식별자. 아직 시작하지 않았으면 null 이다
   * @format int64
   * @example 20
   */
  courseId?: number | null;
  /**
   * 이번 회차에서 완료한 스텝 수. **화면의 `3 / 4` 가 아니다.** 아직 시작하지 않았으면 null 이다
   * @format int32
   * @example 3
   */
  completedStepCount?: number | null;
  /**
   * 이 코스의 전체 스텝 수. 아직 시작하지 않았으면 null 이다
   * @format int32
   * @example 4
   */
  totalStepCount?: number | null;
  /**
   * 완주 횟수 = 붙은 도장 수. **화면의 `3 / 4` 의 분자다.** 코스를 한 번 완주할 때마다 하나씩 오른다. 아직 시작하지 않았으면 null 이고 0 이 아니다
   * @format int32
   * @example 3
   */
  acquiredStampCount?: number | null;
  /**
   * 완성에 필요한 완주 횟수. 화면의 `3 / 4` 의 분모다
   * @format int32
   * @example 4
   */
  requiredStampCount?: number;
  /**
   * 완성 여부. 완주 횟수를 다 채웠는지다. 시작하지 않았으면 false 다
   * @example false
   */
  completed?: boolean;
}

/** 자세 도전 현황 */
export interface TargetPoseProgressResponse {
  /**
   * 서비스가 제공하는 자세 전체 개수. 화면의 "전체" 칩이다
   * @format int32
   * @example 9
   */
  totalCount?: number;
  /**
   * 시작했고 아직 완성하지 않은 자세 수. 화면의 "도전 중" 칩이다
   * @format int32
   * @example 3
   */
  inProgressCount?: number;
  /**
   * 완성한 자세 수. 화면의 "완성" 칩이다
   * @format int32
   * @example 2
   */
  completedCount?: number;
  /** 부위·레벨 순으로 정렬된 자세 목록. **부위 섹션의 노출 순서는 `GET /screening/body-parts` 가 정한다.** `completed` 파라미터를 주면 이 목록만 걸러지고 위의 집계 셋은 그대로다 */
  targetPoses?: TargetPoseProgressItem[];
}

/** 온보딩 그리드용 목표 자세 요약 */
export interface TargetPoseSummaryResponse {
  /**
   * 목표 자세 식별자
   * @format int64
   * @example 1
   */
  targetPoseId?: number;
  /**
   * 자세 이름
   * @example "다운독"
   */
  name?: string;
  /**
   * 자세 이미지 asset 키. 파일은 프론트가 정적으로 갖는다
   * @example "pose/down_dog"
   */
  imageAssetKey?: string | null;
  /**
   * 이 자세가 겨냥하는 부위 코드
   * @example "BACK"
   */
  bodyPartCode?: "BACK" | "ABDOMEN" | "PELVIS";
  /**
   * 난이도 단계. 작을수록 쉽다
   * @format int32
   * @example 1
   */
  level?: number;
}

/** 운동·자세가 쓰는 근육 하나 */
export interface MuscleResponse {
  /**
   * 근육 코드
   * @example "UPPER_TRAPEZIUS"
   */
  muscleCode?: string;
  /**
   * 표시용 근육 이름
   * @example "상부 승모근"
   */
  name?: string;
  /**
   * 이 근육이 속한 부위 코드
   * @example "BACK"
   */
  bodyPartCode?: "BACK" | "ABDOMEN" | "PELVIS";
  /**
   * 앞쪽 근육맵 하이라이트 asset 키. 뒤에만 보이는 근육이면 null 이다. URL 이 아니라 안정된 키다
   * @example "muscle/upper_trapezius_front"
   */
  frontHighlightAssetKey?: string | null;
  /**
   * 뒤쪽 근육맵 하이라이트 asset 키. 앞에만 보이는 근육이면 null 이다
   * @example "muscle/upper_trapezius_back"
   */
  backHighlightAssetKey?: string | null;
  /**
   * 이 근육을 어떻게 쓰는가
   * @example "STRETCH"
   */
  role?: "STRETCH" | "STRENGTHEN";
  /**
   * 화면 표시 순서. 작을수록 먼저다
   * @format int32
   * @example 1
   */
  displayOrder?: number;
}

/** 목표 자세 상세 */
export interface TargetPoseDetailResponse {
  /**
   * 목표 자세 식별자
   * @format int64
   * @example 1
   */
  targetPoseId?: number;
  /**
   * 자세 이름
   * @example "다운독"
   */
  name?: string;
  /**
   * 자세 이미지 asset 키. URL 이 아니라 안정된 키이고 이미지 파일은 프론트가 정적으로 갖는다
   * @example "pose/down_dog"
   */
  imageAssetKey?: string | null;
  /**
   * 이 자세가 겨냥하는 부위 코드. screening 소유 어휘다
   * @example "BACK"
   */
  bodyPartCode?: "BACK" | "ABDOMEN" | "PELVIS";
  /**
   * 난이도 단계. 작을수록 쉽다
   * @format int32
   * @example 1
   */
  level?: number;
  /** 이 자세가 쓰는 근육 목록 */
  muscles?: MuscleResponse[];
}

/** 운동 가이드 화면 전체 */
export interface ExerciseDetailResponse {
  /**
   * 운동 식별자
   * @format int64
   * @example 1
   */
  exerciseId?: number;
  /**
   * 운동 이름
   * @example "턱 당기기"
   */
  name?: string;
  /**
   * 대표 이미지 asset 키. **URL 이 아니다** — 파일은 프론트가 갖고 키로 매핑한다
   * @example "exercise/cat-cow"
   */
  imageAssetKey?: string | null;
  /**
   * 재생 영상 URL. 소스가 YMove 라 우리가 파일을 갖지 않는다. **연동 전까지 항상 null 이다**
   * @example "https://ymove.example.com/v/cat-cow.mp4"
   */
  videoUrl?: string | null;
  thumbnailUrl?: string | null;
  /**
   * 권장 세트 수. 시간으로 수행하는 운동이면 null 이다
   * @format int32
   * @example 3
   */
  defaultSetCount?: number | null;
  /**
   * 세트당 권장 반복 수. 시간으로 수행하는 운동이면 null 이다
   * @format int32
   * @example 10
   */
  defaultRepCount?: number | null;
  /**
   * 권장 수행 시간(초). 횟수로 수행하는 운동이면 null 이다
   * @format int32
   * @example 30
   */
  defaultDurationSeconds?: number | null;
  /**
   * 운동 강도(MET). kcal 은 회원 몸무게의 함수인데 몸무게는 member 소유라 서버가 계산하지 않는다
   * @example 2.5
   */
  metValue?: number | null;
  /**
   * 난이도. 감수 전 데이터라 아직 값 집합을 고정하지 않았다
   * @example "EASY"
   */
  difficulty?: string | null;
  /**
   * 코스 스텝에 표시하는 분류. 감수 전 데이터라 아직 값 집합을 고정하지 않았다
   * @example "가동성 웜업"
   */
  category?: string | null;
  /**
   * 수행 시 주의사항
   * @example "목에 통증이 오면 즉시 멈춘다"
   */
  cautionNote?: string | null;
  /** 근육맵 탭에 쓰는 근육 목록 */
  muscles?: MuscleResponse[];
  /** 음성 큐잉 대본. displayOrder 오름차순이다 */
  voiceCues?: VoiceCueResponse[];
}

/** 음성 큐 한 줄 */
export interface VoiceCueResponse {
  /**
   * 재생 순서. 작을수록 먼저다
   * @format int32
   * @example 1
   */
  displayOrder?: number;
  /**
   * 재생 시작 지점(초). 타임코드가 확정되기 전이면 null 이고, 그때는 displayOrder 순차 재생으로 읽는다
   * @format int32
   * @example 0
   */
  startOffsetSeconds?: number | null;
  /**
   * 재생 종료 지점(초). 유지 구간이 없는 큐에서는 null 이다
   * @format int32
   * @example 5
   */
  endOffsetSeconds?: number | null;
  /**
   * 읽어줄 문장
   * @example "턱을 뒤로 당겨 이중 턱을 만듭니다"
   */
  content?: string;
}

/** 모든 실패 응답의 공통 포맷. 클라이언트는 HTTP 상태가 아니라 code 로 분기한다 */
export interface ApiErrorResponse {
  /**
   * 분기에 쓰는 에러 코드
   * @example "MEMBER_NOT_FOUND"
   */
  code?: string;
  /**
   * 사람이 읽는 설명. 그대로 노출해도 되는 문장이다
   * @example "회원을 찾을 수 없습니다"
   */
  message?: string;
}
