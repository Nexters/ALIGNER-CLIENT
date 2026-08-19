# swagger-typescript-api 생성 클라이언트의 transport로 기존 ky 인스턴스를 재사용한다

`swagger-typescript-api`로 카카오 로그인 API를 포함한 스펙 기반 클라이언트를 생성하면서, 내부 HTTP 실행기를 axios나 기본 `fetch` 대신 기존 `shared/api/client.ts`의 `ky` 인스턴스(`apiClient`)를 `customFetch`로 주입해 쓰기로 했다. `ky` 인스턴스는 `fetch`와 동일한 시그니처로 호출 가능해 그대로 연결할 수 있다.

인증 헤더 첨부(`beforeRequest`)와 세션 만료 처리(`afterResponse`)를 `apiClient` 한 곳의 훅으로만 구현하고, 생성된 모든 API 클래스가 자동으로 그 효과를 받도록 하기 위함이다(훅 자체는 [0003](./0003-ky-http-client-design.md)에서 정의). axios를 새로 들이면 재현해야 할 인터셉터 로직이 두 군데로 갈라지고, 기본 `fetch`를 쓰면 매 API 클래스마다 인증/에러 처리를 반복해야 했다.

생성된 클라이언트는 `response.ok`를 직접 보고 자체적으로 에러를 던지도록 설계돼 있어([`http-client.ts`](../../src/shared/api/generated/http-client.ts) 참고), ky가 먼저 `HTTPError`를 던지면 그 로직이 실행되지 못한다. 그래서 `apiClient`를 그대로 쓰지 않고 `apiClient.extend({ throwHttpErrors: false })`로 파생 인스턴스를 만들어 `customFetch`에 넣는다. `extend`는 훅을 그대로 물려받으므로 인증 헤더·세션 만료 처리는 이 파생 인스턴스에도 동일하게 적용되고, `shared/api`의 다른 소비자(`api.get/post/...`)는 ky의 기본 `throwHttpErrors` 동작을 그대로 유지한다.

## 후속 결정: public API에 태그별 클라이언트도 노출한다

[0003](./0003-ky-http-client-design.md)의 결정 5는 `shared/api` 바깥에 `api.get/post/...`만 노출하기로 했었다. 그런데 `entities/member`, `features/login`, `features/screening-flow`처럼 이미 정해진 요청/응답 타입이 있는 도메인 자원은 `api.get<T>("members/me")`보다 생성된 `membersApi.getMyProfile()` 쪽이 타입도 안전하고 스펙 변경에도 자동으로 맞는다. 그래서 `shared/api/index.ts`가 `authApi`/`membersApi`/`screeningApi`/`coursesApi`(그리고 공용 에러 파서 `parseApiError`)도 함께 노출하도록 넓혔다. `api.*` 헬퍼는 생성된 클라이언트가 없는 임시/일회성 호출에 계속 쓴다.
