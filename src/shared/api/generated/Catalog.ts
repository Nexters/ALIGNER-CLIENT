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
  ExerciseDetailResponse,
  TargetPoseDetailResponse,
  TargetPoseSummaryResponse,
} from "./data-contracts";
import { HttpClient } from "./http-client";
import type { RequestParams } from "./http-client";

export class Catalog<SecurityDataType = unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  /**
   * @description 요약 목록이다. 근육을 싣지 않는다 — 그리드는 이름과 썸네일만 그린다. **bodyPartCode 를 생략하면 전체 핀포즈가 나간다.** 온보딩 그리드가 부위를 먼저 묻지 않고 전체를 펼쳐 보여주므로 그쪽이 기본이다. bodyPartCode 는 screening 이 소유한 어휘이고 값 집합은 BACK · ABDOMEN · PELVIS 셋이다. 그 밖의 값을 주면 빈 배열이 아니라 400 BAD_REQUEST 다.
   *
   * @tags 카탈로그 — 목표 자세
   * @name GetTargetPoses
   * @summary 목표 자세 목록
   * @request GET:/catalog/target-poses
   * @secure
   */
  getTargetPoses = (
    query?: {
      /**
       * 부위 코드
       * @example "BACK"
       */
      bodyPartCode?: "BACK" | "ABDOMEN" | "PELVIS";
    },
    params: RequestParams = {},
  ) =>
    this.http.request<TargetPoseSummaryResponse[], ApiErrorResponse>({
      path: `/catalog/target-poses`,
      method: "GET",
      query: query,
      secure: true,
      ...params,
    });
  /**
   * @description 자세 하나와 그 자세가 쓰는 근육을 함께 내린다.
   *
   * @tags 카탈로그 — 목표 자세
   * @name GetTargetPose
   * @summary 목표 자세 상세 조회
   * @request GET:/catalog/target-poses/{targetPoseId}
   * @secure
   */
  getTargetPose = (targetPoseId: number, params: RequestParams = {}) =>
    this.http.request<TargetPoseDetailResponse, ApiErrorResponse>({
      path: `/catalog/target-poses/${targetPoseId}`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description 근육맵과 음성 큐를 포함한 운동 가이드 화면 전체를 한 번에 내린다. 칼로리는 회원 몸무게의 함수라 catalog 가 계산하지 않고 metValue 만 내린다. 재생 URL 과 썸네일은 아직 없다 — YMove 연동은 후속 작업이다.
   *
   * @tags 카탈로그 — 운동
   * @name GetExercise
   * @summary 운동 상세 조회
   * @request GET:/catalog/exercises/{exerciseId}
   * @secure
   */
  getExercise = (exerciseId: number, params: RequestParams = {}) =>
    this.http.request<ExerciseDetailResponse, ApiErrorResponse>({
      path: `/catalog/exercises/${exerciseId}`,
      method: "GET",
      secure: true,
      ...params,
    });
}
