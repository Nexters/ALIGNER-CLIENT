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
  ApiErrorResponse,
  CourseDetailResponse,
  RecommendCourseRequest,
  RecommendCourseResponse,
  TargetPoseProgressResponse,
  TodayCourseResponse,
} from "./data-contracts";
import { ContentType, HttpClient } from "./http-client";
import type { RequestParams } from "./http-client";

export class Courses<SecurityDataType = unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  /**
   * @description 강화할 부위와 난이도로 코스를 만든다. **난이도가 곧 목표 자세의 레벨**이고 자세 하나가 코스 하나다. 자세 식별자와 원인 코드를 요청에 넣지 않는다 — 자세는 서버가 catalog 에서 찾고, 원인은 서버가 최신 진단에서 찾아 스냅샷으로 남긴다. **진단 결과에 없는 부위도 받는다.** 코스는 추천이라 회원이 「자세 도전 현황」에서 아무 자세나 골라 시작할 수 있고, 그 경우 원인 스냅샷만 비어 있다. **멱등하다.** 같은 자세의 코스가 이미 있으면 새로 만들지 않고 그 코스를 돌려준다. **완주한 코스는 여기서 다시 열린다** — 스텝이 처음 상태로 돌아가 다음 회차가 시작된다. 진행 중인 코스는 초기화되지 않고, 이미 완성한 자세(도장 4 개)도 다시 열리지 않는다.
   *
   * @tags 코스
   * @name Recommend
   * @summary 코스 추천
   * @request POST:/courses
   * @secure
   */
  recommend = (data: RecommendCourseRequest, params: RequestParams = {}) =>
    this.http.request<RecommendCourseResponse, ApiErrorResponse>({
      path: `/courses`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description 스텝과 그 스텝의 운동을 함께 내린다. 수행 시간·세트는 catalog 기본값까지 반영한 값이다.
   *
   * @tags 코스
   * @name GetCourseDetail
   * @summary 코스 개요
   * @request GET:/courses/{courseId}
   * @secure
   */
  getCourseDetail = (courseId: number, params: RequestParams = {}) =>
    this.http.request<CourseDetailResponse, ApiErrorResponse>({
      path: `/courses/${courseId}`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description 홈 카드다. **"오늘의 코스" 는 진행 중인 코스의 다른 이름**이고 일자 개념이 없다. 진행 중인 코스가 여럿이면 가장 최근에 추천된 것이다. **오늘 완주한 코스도 오늘의 코스다** — 완주 직후에도 404 가 아니라 `completed: true` 로 내려온다. 그때만 「내일 운동 미리보기」(`tomorrowPreview`)가 함께 실린다. 미리보기는 **같은 부위에서 아직 4 번 완수하지 못한 자세 중 무작위 하나**이고, 저장하지 않지만 같은 날 같은 회원에게는 같은 자세가 나온다. 그 부위를 모두 완성했으면 null 이다. 미리보기 카드를 눌렀을 때는 `courseId` 가 아니라 `bodyPartCode` · `level` 로 코스 추천을 호출한다.
   *
   * @tags 코스
   * @name GetTodayCourse
   * @summary 오늘의 코스
   * @request GET:/courses/today
   * @secure
   */
  getTodayCourse = (params: RequestParams = {}) =>
    this.http.request<TodayCourseResponse, ApiErrorResponse>({
      path: `/courses/today`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description **서비스가 제공하는 핀포즈 전체**가 나온다. 회원이 시작한 코스만이 아니다 — 코스는 추천이라 아직 시작하지 않은 자세도 목록에 있고, 그 경우 `courseId` · `completedStepCount` · `totalStepCount` · `acquiredStampCount` 가 **null** 이다 (`0 / 4` 가 아니다). **`acquiredStampCount / requiredStampCount` 가 화면의 `3 / 4`** 이고 그 자세의 코스를 완주한 횟수다 — `completedStepCount / totalStepCount`(이번 회차의 스텝 진행도)와 다른 값이고, 4 회를 채워야 `completed` 다. 루트의 집계 셋은 `completed` 필터와 무관하게 언제나 전체 기준이라 칩 세 개를 한 번에 그릴 수 있다. `completed=true` 로 거르면 프로필의 "완수한 자세 목록" 이 된다 — 별도 API 를 만들지 않는다.
   *
   * @tags 코스
   * @name GetTargetPoseProgress
   * @summary 자세 도전 현황
   * @request GET:/courses/progress/target-poses
   * @secure
   */
  getTargetPoseProgress = (
    query?: {
      /**
       * true 면 완성한 자세만, false 면 완성하지 않은 자세만. 생략하면 전체다. 집계는 이 값과 무관하다
       * @example true
       */
      completed?: boolean;
    },
    params: RequestParams = {},
  ) =>
    this.http.request<TargetPoseProgressResponse, ApiErrorResponse>({
      path: `/courses/progress/target-poses`,
      method: "GET",
      query: query,
      secure: true,
      ...params,
    });
}
