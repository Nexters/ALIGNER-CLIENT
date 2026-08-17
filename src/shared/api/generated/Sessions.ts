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

import type {
  AchievementResponse,
  ApiErrorResponse,
  CompleteSessionRequest,
  RecordPerceivedResultRequest,
  SessionResponse,
  StartSessionRequest,
} from "./data-contracts";
import { ContentType, HttpClient } from "./http-client";
import type { RequestParams } from "./http-client";

export class Sessions<SecurityDataType = unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  /**
   * @description 코스 스텝 하나를 수행할 세션을 연다. 스텝 구성을 복사해 수행 기록의 뼈대를 만들어 두고, 완료 요청이 그 값을 채운다. **이미 완료한 스텝으로도 다시 시작할 수 있다.**
   *
   * @tags 세션
   * @name Start
   * @summary 세션 시작
   * @request POST:/sessions
   * @secure
   */
  start = (data: StartSessionRequest, params: RequestParams = {}) =>
    this.http.request<SessionResponse, ApiErrorResponse>({
      path: `/sessions`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description "오늘 파이어로그, 어땠어요?" 화면의 3 지선다다. **기록만 한다** — `TOO_HARD` 를 보내도 서버가 코스를 바꾸거나 자세를 내리지 않는다. 어떤 자세로 옮길지는 아직 정해지지 않았고, 지금은 화면이 이 값을 보고 부위·난이도 재선택(`POST /courses`)으로 보낸다. **다시 답할 수 있다** — 잘못 누른 것을 고치지 못하게 막을 이유가 없다.
   *
   * @tags 세션
   * @name RecordPerceivedResult
   * @summary 핀포즈 직후 체감 기록
   * @request POST:/sessions/{sessionId}/perceived-result
   * @secure
   */
  recordPerceivedResult = (
    sessionId: number,
    data: RecordPerceivedResultRequest,
    params: RequestParams = {},
  ) =>
    this.http.request<SessionResponse, ApiErrorResponse>({
      path: `/sessions/${sessionId}/perceived-result`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description 수행 결과를 저장하고 **코스 진행도에 반영한다.** 응답의 `courseProgress` 가 반영 결과다. 요청에 없는 운동은 수행하지 않은 것으로 남는다 — 부분 완료가 정상이다. **멱등하다.** 같은 요청이 재시도돼도 진행도가 두 번 오르지 않고 도장도 한 번만 붙는다. 재시도로 들어온 호출에서는 `stampAcquired` 가 false 다. `courseProgress` 에 완료 리포트가 쓰는 값이 다 들어 있다 — 헤더의 자세 이름·부위·난이도와 **파이어로그 `acquiredStampCount / requiredStampCount`**(그 자세를 완주한 횟수)까지다. 자세를 방금 완성했는지는 `targetPoseCompleted && stampAcquired` 로 판단한다.
   *
   * @tags 세션
   * @name Complete
   * @summary 세션 완료
   * @request POST:/sessions/{sessionId}/complete
   * @secure
   */
  complete = (sessionId: number, data: CompleteSessionRequest, params: RequestParams = {}) =>
    this.http.request<SessionResponse, ApiErrorResponse>({
      path: `/sessions/${sessionId}/complete`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description 세션 복구에 쓴다. 앱이 죽었다 돌아오면 이 API 로 현재 상태를 다시 그린다. 응답 형태가 시작·완료와 같다.
   *
   * @tags 세션
   * @name GetSession
   * @summary 세션 조회
   * @request GET:/sessions/{sessionId}
   * @secure
   */
  getSession = (sessionId: number, params: RequestParams = {}) =>
    this.http.request<SessionResponse, ApiErrorResponse>({
      path: `/sessions/${sessionId}`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description 운동 완료 리포트의 "5일 연속 달성 중 · 이번 주 5 / 7" 과 요일 체크다. **날짜는 `Asia/Seoul` 기준**이고, 하루에 세션을 여러 번 해도 그날은 하루로 센다. **오늘 아직 안 했어도 연속이 끊기지 않는다** — 어제까지 이어져 있으면 그 값을 유지한다.
   *
   * @tags 세션
   * @name GetAchievement
   * @summary 연속 달성 현황
   * @request GET:/sessions/achievements
   * @secure
   */
  getAchievement = (params: RequestParams = {}) =>
    this.http.request<AchievementResponse, ApiErrorResponse>({
      path: `/sessions/achievements`,
      method: "GET",
      secure: true,
      ...params,
    });
}
