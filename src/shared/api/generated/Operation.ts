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
  CourseTemplateResponse,
  ExerciseSummaryResponse,
} from "./data-contracts";
import { HttpClient } from "./http-client";
import type { RequestParams } from "./http-client";

export class Operation<SecurityDataType = unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  /**
   * @description 적재된 운동을 식별자 순으로 전부 내린다. **페이징이 없다** — 운동은 감수 seed 로만 늘어나고 지금 29 행이다. 근육·음성 큐·주의사항은 싣지 않는다. 하나를 자세히 볼 때는 GET /catalog/exercises/{exerciseId} 다.
   *
   * @tags 운영 — 운동
   * @name GetExercises
   * @summary 운동 전체 조회
   * @request GET:/operation/exercises
   * @secure
   */
  getExercises = (params: RequestParams = {}) =>
    this.http.request<ExerciseSummaryResponse[], ApiErrorResponse>({
      path: `/operation/exercises`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description 적재된 코스 템플릿을 식별자 순으로 전부 내린다. 스텝과 스텝에 편성된 운동을 함께 싣는다. **페이징이 없다** — 템플릿은 핀포즈 하나에 하나라 상한이 자세 개수(현재 9)다. 자세 이름·운동 이름은 catalog 에서 붙이고, 찾지 못하면 예외가 아니라 빈 문자열이다.
   *
   * @tags 운영 — 코스
   * @name GetCourseTemplates
   * @summary 코스 템플릿 전체 조회
   * @request GET:/operation/course-templates
   * @secure
   */
  getCourseTemplates = (params: RequestParams = {}) =>
    this.http.request<CourseTemplateResponse[], ApiErrorResponse>({
      path: `/operation/course-templates`,
      method: "GET",
      secure: true,
      ...params,
    });
}
