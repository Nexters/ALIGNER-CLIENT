# swagger-typescript-api 생성 클라이언트의 transport로 기존 ky 인스턴스를 재사용한다

`swagger-typescript-api`로 카카오 로그인 API를 포함한 스펙 기반 클라이언트를 생성하면서, 내부 HTTP 실행기를 axios나 기본 `fetch` 대신 기존 `shared/api/client.ts`의 `ky` 인스턴스(`apiClient`)를 `customFetch`로 주입해 쓰기로 했다. `ky` 인스턴스는 `fetch`와 동일한 시그니처로 호출 가능해 그대로 연결할 수 있다.

인증 헤더 첨부(`beforeRequest`)와 토큰 만료 시 처리(`afterResponse`)를 `apiClient` 한 곳의 훅으로만 구현하고, 생성된 모든 API 클래스가 자동으로 그 효과를 받도록 하기 위함이다. axios를 새로 들이면 재현해야 할 인터셉터 로직이 두 군데로 갈라지고, 기본 `fetch`를 쓰면 매 API 클래스마다 인증/에러 처리를 반복해야 했다.
