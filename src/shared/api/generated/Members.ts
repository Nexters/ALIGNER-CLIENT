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
  MemberProfileResponse,
  UpdateMemberProfileRequest,
} from "./data-contracts";
import { ContentType, HttpClient } from "./http-client";
import type { RequestParams } from "./http-client";

export class Members<SecurityDataType = unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  /**
   * @description 토큰의 회원 식별자로 조회한다. 다른 회원을 조회하는 경로는 없다.
   *
   * @tags 회원
   * @name GetMyProfile
   * @summary 내 프로필 조회
   * @request GET:/members/me
   * @secure
   */
  getMyProfile = (params: RequestParams = {}) =>
    this.http.request<MemberProfileResponse, ApiErrorResponse>({
      path: `/members/me`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description **행을 지우지 않는다.** 운동 기록을 보존하기로 했고 그 기록이 회원 식별자로 붙어 있어서, 남는 개인정보인 카카오 식별자만 지우고 탈퇴 표시를 남긴다. 이후 이 회원은 모든 조회에서 없는 것으로 취급된다 — 아직 만료되지 않은 토큰으로 호출해도 404 다. 같은 카카오 계정으로 다시 가입할 수 있지만 **새 회원**이 되며 이전 기록은 이어지지 않는다.
   *
   * @tags 회원
   * @name Withdraw
   * @summary 회원탈퇴
   * @request DELETE:/members/me
   * @secure
   */
  withdraw = (params: RequestParams = {}) =>
    this.http.request<void, ApiErrorResponse>({
      path: `/members/me`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * @description **보낸 필드만 바뀐다.** 온보딩(경력 · 키·몸무게 · 강화 부위·난이도)과 프로필 편집이 이 API 하나를 같이 쓴다 — 온보딩 전용 API 는 없다. 보내지 않은 필드는 그대로 유지되며, null 을 보내도 값이 지워지지 않는다. 강화 부위와 난이도는 **함께** 보내야 한다. 프로필 이미지는 카카오가 소유하므로 서버가 수정하지 않는다. 수정된 프로필 전체를 돌려준다.
   *
   * @tags 회원
   * @name UpdateMyProfile
   * @summary 내 프로필 수정
   * @request PATCH:/members/me
   * @secure
   */
  updateMyProfile = (data: UpdateMemberProfileRequest, params: RequestParams = {}) =>
    this.http.request<MemberProfileResponse, ApiErrorResponse>({
      path: `/members/me`,
      method: "PATCH",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
}
