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
  BodyPartResponse,
  ScreeningResultResponse,
  SubmitScreeningRequest,
} from "./data-contracts";
import { ContentType, HttpClient } from "./http-client";
import type { RequestParams } from "./http-client";

export class Screening<SecurityDataType = unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  /**
   * @description 고른 자세와 체감을 넘기면 서버가 분기 규칙으로 원인을 판별해 저장하고 결과를 그대로 돌려준다. **제출과 판별이 한 요청에서 끝난다.** 쉬웠던 자세와 어려웠던 자세를 각각 최대 4 개까지 담을 수 있고, 같은 자세를 두 번 넣을 수 없다. **부위를 넣지 않는다** — 강화할 부위는 이 응답의 원인을 보고 다음 화면에서 고른다.
   *
   * @tags 자가 스크리닝
   * @name Submit
   * @summary 자세 체감 제출과 원인 판별
   * @request POST:/screening/results
   * @secure
   */
  submit = (data: SubmitScreeningRequest, params: RequestParams = {}) =>
    this.http.request<ScreeningResultResponse, ApiErrorResponse>({
      path: `/screening/results`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description 회원이 가장 최근에 받은 진단이다. 진단한 적이 없으면 404 다 — 화면은 이때 온보딩으로 보낸다.
   *
   * @tags 자가 스크리닝
   * @name GetLatestResult
   * @summary 최신 진단 결과 조회
   * @request GET:/screening/results/latest
   * @secure
   */
  getLatestResult = (params: RequestParams = {}) =>
    this.http.request<ScreeningResultResponse, ApiErrorResponse>({
      path: `/screening/results/latest`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description 진단 결과를 본 뒤 **강화할 부위를 고르는 화면**의 선택지다. 판별된 원인의 부위만이 아니라 전체 부위를 내린다 — 회원은 분석 결과에 없는 부위도 고를 수 있다. 진단 제출(`POST /screening/results`)에는 부위를 넣지 않는다.
   *
   * @tags 자가 스크리닝
   * @name GetBodyParts
   * @summary 부위 목록 조회
   * @request GET:/screening/body-parts
   * @secure
   */
  getBodyParts = (params: RequestParams = {}) =>
    this.http.request<BodyPartResponse[], ApiErrorResponse>({
      path: `/screening/body-parts`,
      method: "GET",
      secure: true,
      ...params,
    });
}
