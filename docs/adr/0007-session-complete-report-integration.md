# ADR-0007. 세션·완료 리포트 API 연동

- 상태: 결정됨
- 날짜: 2026-08-19
- 맥락 소유: `pages/complete`, `entities/session`

## 맥락

#37에서 완료 리포트(세션-7)·핀포즈 체감 기록(세션-6) 화면 UI를 먼저 구현했고, 값은 하드코딩된 mock/상수로 채워져 있었다. 실제 세션 데이터로 연동하며 확인·결정한 것들.

- `GET /sessions/{sessionId}`의 `courseProgress`는 백엔드 수정 전엔 세션이 `COMPLETED`여도 항상 `null`이었다 — 실제로는 `POST /complete` 응답에만 실렸다. 백엔드가 이를 고쳐 새로 완료되는 세션은 GET에도 `courseProgress`가 채워지지만, 이미 완료된 과거 세션은 소급 반영되지 않는다. 그래서 코드는 여전히 `courseProgress`를 nullable로 방어한다.
- 핀포즈 캡처 영상(`videoUrl`)은 `GET /catalog/exercises/{exerciseId}`에만 있고, YMove 연동 전엔 항상 `null`이라고 스펙에 명시돼 있었다. 연동이 완료된 걸 실측으로 확인해 그대로 연결했다.
- `swagger-typescript-api` 생성 클라이언트(`Sessions`, 이미 있던 `Catalog`)가 존재하는데 `shared/api/index.ts`엔 아직 안 열려 있었다.

## 결정

### 1. `shared/api`에 `sessionsApi` 배선, 페이지 API 레이어는 생성 클라이언트만 쓴다

`api.get/post`(ky 헬퍼) 대신 `sessionsApi.getSession/complete/recordPerceivedResult/getAchievement`, `catalogApi.getExercise`를 쓴다. 응답 타입도 손으로 다시 적지 않고 `@/shared/api/generated/data-contracts`를 그대로 쓴다(ADR-0004 후속 결정과 동일한 이유).

### 2. `useSession`은 `entities/session`으로, 나머지는 `pages/complete`에 둔다

`GET /sessions/{sessionId}`는 스펙상 "세션 복구용"이라 아직 없는 세션 플레이어 화면도 재사용할 게 확실해서 엔티티로 뺐다. 반면 핀포즈 운동을 찾는 `findPinPoseExerciseId`, 리포트 문구 포맷팅(`mapSessionReport`), 연속 달성(`useAchievements`), 체감 기록 제출(`useRecordPerceivedResult`)은 지금 쓰는 곳이 `CompletePage` 하나뿐이라 그 파일/페이지 안에 둔다 — 플레이어가 실제로 생기면 그때 필요한 것만 다시 옮긴다(아직 없는 소비처를 위해 미리 분리하지 않는다).

### 3. `CompletePage`는 세션이 `COMPLETED`된 뒤에만 진입한다고 가정하고, `perceivedResult` 유무로만 분기한다

`status`를 따로 보지 않는다 — 이 라우트로 오는 경로가 전부 완료 이후이기 때문이다. 분기는 `!data.perceivedResult`(체감 기록 화면) / 그 외(리포트 화면) 둘뿐이다. `TOO_HARD` 응답 시 부위·난이도 재선택으로 보내는 분기(스펙에 언급됨)는 MVP 이후로 미뤘다 — 지금은 어떤 답을 선택해도 기록만 하고 리포트로 전환한다.

### 4. 핀포즈 운동은 세션의 `exerciseRecords`에서 `displayOrder`가 가장 큰(마지막) 것으로 찾는다

처음엔 `category === "핀포즈"` 문자열 매칭으로 찾았는데, `category`가 스펙상 값 집합이 아직 고정되지 않은 자유 텍스트라 서버가 문구를 바꾸면 깨지는 문제가 있어 위치 기반으로 바꿨다. 지금까지 실측한 데이터(코스 1, 코스 5)는 스텝 하나에 운동이 항상 1개뿐이라 이 방식이 안전하지만, **스텝에 운동이 여러 개일 때도 핀포즈가 항상 마지막인지는 검증되지 않았다** — `CompletePage.tsx`의 `findPinPoseExerciseId`에 TODO로 남겨뒀다. 다른 신호(핀포즈를 직접 가리키는 식별자·플래그)가 `SessionResponse`에 없어 지금은 이 방법뿐이고, 백엔드에 확인 중이다.

### 5. `poseName`은 `courseProgress.targetPoseName`을 쓰고, 코스당 핀포즈가 하나뿐이라고 가정한다

실측해보니 한 코스 안에 핀포즈가 여러 번 나올 수 있다(예: 중간 체크포인트 홀드 + 최종 목표 자세, 둘 다 `category: "핀포즈"`). `courseProgress.targetPoseName`은 코스의 최종 목표 자세 이름이라, 마지막이 아닌 핀포즈 세션에서 이 페이지에 진입하면 제목(자세 이름)과 영상(그 세션의 핀포즈)이 서로 다른 자세를 가리킬 수 있다. 지금은 "세션 플레이어가 코스의 마지막 핀포즈에서만 이 페이지로 보낸다"는 진입 전제로 막아뒀다 — 코드가 검증하진 않는다. 이 핀포즈가 코스의 목표 자세와 같은 건지 판별할 필드가 있는지 백엔드에 확인 중이다.

## 결과

- `src/entities/session/`(`useSession`, `sessionQueryKey`, `Session` 타입) 신설.
- `src/pages/complete/ui/CompletePage.tsx`에 `findPinPoseExerciseId`, `src/pages/complete/api/`에 `map-session.ts`(순수 매핑 함수), `use-achievements.ts`, `use-exercise.ts`, `use-record-perceived-result.ts`, `types.ts`(`PerceivedResult`)가 새로 생긴다.
- `map-session.ts`의 부위/난이도 라벨(`BODY_PART_LABELS`/`LEVEL_LABELS`)이 `screening-flow`/`exercise-detail`과 중복된다 — `entities/course`로 통합할 과제로 코드에 TODO를 남겼다.
- `pages/exercise-detail`의 `GET /catalog/exercises/{id}` 호출은 아직 구버전 ky 패턴 그대로다 — 생성 클라이언트로 정리하는 건 후속 과제.
