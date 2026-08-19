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

import type { ApiErrorResponse, KakaoLoginRequest, KakaoLoginResponse } from "./data-contracts";
import { ContentType, HttpClient } from "./http-client";
import type { RequestParams } from "./http-client";

export class Auth<SecurityDataType = unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  /**
   * @description `Kakao.Auth.authorize()` 로 받은 인가 코드를 넘기면 서버가 액세스 토큰으로 교환하고 사용자를 확인한 뒤 회원을 찾거나 만들고 자체 JWT 를 발급한다. **토큰 없이 호출하는 유일한 엔드포인트다.** 응답의 accessToken 을 Authorize 에 넣고 나머지 API 를 호출한다. 인가 코드는 1 회용이라 같은 값으로 재시도하면 401 이다.
   *
   * @tags 인증
   * @name Login
   * @summary 카카오 로그인
   * @request POST:/auth/kakao
   */
  login = (data: KakaoLoginRequest, params: RequestParams = {}) =>
    this.http.request<KakaoLoginResponse, ApiErrorResponse>({
      path: `/auth/kakao`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
}
