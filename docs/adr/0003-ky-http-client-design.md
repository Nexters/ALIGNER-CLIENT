# ADR-0003. ky 기반 HTTP 클라이언트 설계

- 상태: 결정됨
- 날짜: 2026-08-15
- 맥락 소유: `shared/api`

## 맥락

`shared/api/client.ts`에 ky 인스턴스 틀만 있고 실제로 쓰는 곳은 아직 없다(그린필드).

- 서버 에러 응답 스펙은 아직 확정되지 않았다.
- 인증은 카카오 로그인이다. 인가 코드를 서버에 넘기면 서버가 자체 JWT를 발급해 응답 바디의 `accessToken`으로 내려준다. 이 로그인 요청은 토큰 없이 호출하는 유일한 엔드포인트다.

## 결정

### 1. `baseUrl` 옵션을 그대로 쓴다

이 레포는 `ky@2.0.2`를 쓰는데, v2에서 `prefixUrl`은 `prefix`로 이름이 바뀌었고 `baseUrl`이 표준 URL 해석을 따르는 옵션으로 새로 생겼다. `client.ts`의 `baseUrl`은 오타가 아니라 이미 맞는 옵션이다.

### 2. base URL은 환경변수 하나(`VITE_API_BASE_URL`)로만 관리

별도 상수나 별도 ky 인스턴스를 만들지 않는다. 코드는 항상 `import.meta.env.VITE_API_BASE_URL` 하나만 읽고, 환경별 값은 `.env.*`/배포 설정에서 주입한다.

### 3. 인증 토큰은 `localStorage`에 저장하고 `beforeRequest` 훅으로 헤더에 주입한다

- 처음엔 `sessionStorage`로 결정했으나, 탭/브라우저를 닫으면 로그인이 풀려 매번 재로그인해야 하는 불편 때문에 `localStorage`로 바꿨다. XSS로 토큰이 노출될 경우 만료(현재 14일, 리프레시 토큰 없음)까지 계속 쓰일 수 있다는 트레이드오프는 감수한다. 탭 간 로그아웃 동기화(`storage` 이벤트 구독)는 하지 않는다 — 다른 탭은 다음 요청이 401을 받을 때 `sessionExpiry` 훅으로 `/login`에 보내지는 것으로 충분하다고 본다.
- `shared/api/access-token.ts` — `getAccessToken()`/`setAccessToken(token)`/`isAuthenticated()`를 노출한다. 로그인 로직은 `accessToken`을 받아 `setAccessToken`만 호출하면 되고, 로그아웃은 `setAccessToken(null)`. 라우터 가드·UI 분기는 `isAuthenticated()`만 쓰고 토큰 값은 다루지 않는다.
- `shared/api/hooks/auth-header.ts` — `BeforeRequestHook`. 토큰이 있으면 `Authorization: Bearer <token>` 헤더를 붙인다.
- `client.ts`의 `hooks.beforeRequest`에 이 훅 하나만 연결한다. `afterResponse`(401 처리)·`beforeRetry`·`beforeError`는 요구사항이 없어 비워둔다.

### 4. 에러는 ky의 `HTTPError`를 그대로 노출한다

`beforeError`에서 커스텀 에러 클래스로 변환하지 않는다. 호출부에서 필요하면 `error.response.json()`으로 직접 파싱한다.

### 5. 호출부에는 `get`/`post`/`put`/`patch`/`delete` 헬퍼 함수 세트를 `api`라는 이름으로 노출한다

ky 인스턴스(`apiClient`)는 export하지 않고, `shared/api/index.ts`가 `api`만 public API로 내보낸다.

```ts
api.get<Course[]>("courses/today");
api.post<Course>("courses", { json: payload });
```

## 결과

- `shared/api` 바깥에는 `api.get/post/put/patch/delete`, `setAccessToken`, `isAuthenticated`만 노출된다.
- 401 처리(재로그인 유도, 토큰 갱신)와 `beforeError` 변환은 요구사항이 나오면 재검토한다.
