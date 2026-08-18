# ADR-0004. 홈 화면 오늘의 코스 API 연동

- 상태: 결정됨
- 날짜: 2026-08-18
- 맥락 소유: `pages/home`, `entities/course`

## 맥락

`pages/home/ui/HomePage.tsx`는 `TodayWorkoutSummary`/`CourseProgress`를 전부 목데이터(`MOCK_WORKOUT`, `MOCK_COURSE_PROGRESS`)로 그리고 있었다. 실제 서버 스펙(`GET /courses/today`, `TodayCourseResponse`)을 붙이며 아래 세 가지가 코드만 보고는 정할 수 없어 사용자와 확인했다.

- `targetPoseImageAssetKey`는 스웨거상 "URL이 아니다 / 파일은 프론트가 정적으로 갖는다"고만 되어 있고, 인증이 필요한 `/catalog/target-poses`로만 실제 값을 확인할 수 있는데 로그인 정보가 없어 실제 값을 확인하지 못했다. 스펙의 예시값(`"pose/down_dog"`, 영문 슬러그)은 이 레포의 기존 정적 이미지 파일명(`휠.png`, `낙타.png` 등 한글)과 형식이 다르다.
- `GET /courses/today`는 진행 중인 코스도 오늘 완주한 코스도 없으면 404(`IN_PROGRESS_COURSE_NOT_FOUND`)를 내려주는데, 이때 화면이 어떻게 반응해야 하는지가 정해져 있지 않았다.
- `estimatedDurationSeconds`/`estimatedKcal`은 계산 불가 시 `0`이 아니라 `null`이 내려오는데, 기존 UI(칩)는 숫자가 항상 있다고 가정하고 있었다.

## 결정

### 1. ~~이미지 매핑 키는 `targetPoseImageAssetKey`가 아니라 `targetPoseName`(한글 자세명)을 쓴다~~ → **후속: `imageAssetKey` 기준으로 전환**

처음엔 `assetKey` 실값을 확인할 수 없어 `targetPoseName`(한글 자세명)을 키로 썼다. 이후 테스트 토큰으로 `GET /catalog/target-poses`(dev)를 직접 조회해 실값을 확인했다 — `"target-pose/camel"`처럼 `target-pose/` 접두사가 붙은 영문 슬러그였고, 9개 목표 자세 모두 값이 채워져 있었다. 반면 이름 기반 매핑은 실제로 깨졌다: 카탈로그의 진짜 이름은 `"반 보트"`/`"사이드 플랭크"`처럼 중간에 띄어쓰기가 들어가는데, 로컬 매핑 테이블 키(`반보트`/`사이드플랭크`)와 자세 접미사만 떼는 정규화로는 이 띄어쓰기를 못 잡아서 폴백 이미지로 빠졌다.

그래서 `entities/course`의 `getPoseImageSrc`를 `imageAssetKey: string | null`을 받는 함수로 바꾸고, 매핑 테이블도 확인된 9개 `target-pose/*` 키 기준으로 다시 만들었다(`pose-images.ts`). 로컬에 없는 `업독`(`target-pose/upward-facing-dog`)과, 카탈로그에 없는 기존 `활` 이미지 파일은 매핑에서 뺐다(파일 자체는 지우지 않았다).

`PoseTipCard` 문구 조회(`normalizePoseName`)는 여전히 이름 기반이라 `entities/course/model/lib.ts`로 옮기고, 접미사 제거에 더해 중간 띄어쓰기도 제거하도록 넓혔다 — 같은 띄어쓰기 문제가 문구 조회에도 있었기 때문이다.

### 2. `/courses/today` 404는 리다이렉트하지 않고, 홈 화면 구조는 그대로 두고 값만 `-`로 표기한다

처음엔 스웨거 설명("화면은 추천으로 보낸다")을 그대로 따라 `courseRecommendation`으로 즉시 리다이렉트했다. 실제 서버로 붙여서 테스트해 보니(진행 중인 코스가 없는 테스트 계정) 홈 화면 자체에 접근을 못 해 테스트 흐름이 막혔다. 별도 빈 상태 카드(`HomeEmptyCourseCard`)로 한 번 바꿨다가, 다시 "UI는 그대로 두고 값만 `-`로" 요청을 받아 최종적으로는 리다이렉트도 별도 빈 카드도 없이 **기존 카드 구성을 그대로 유지하고 데이터가 없는 자리만 `-`로 채우는 쪽**으로 정했다.

- `TodayCourseCard`의 `workout` prop이 `TodayWorkoutSummary | null`을 받는다. `null`이면 운동/세트/kcal 칩이 `-`로, `DurationBadge`가 빈 링 + `-분`으로, 이미지가 폴백(`FALLBACK_POSE_IMAGE`)으로 표시된다.
- `CourseProgressCard`의 `progress` prop이 `CourseProgress | null`을 받는다. `null`이면 `current`/`total`이 `-`로, 진행바가 0%로 표시된다.
- `DurationBadge`(`shared/ui/duration-badge`)와 `SummaryCard`도 `minutes: number | null`을 받도록 함께 바뀌었다 — 숫자 링 UI라 "-" 표기를 링 자체가 아니라 중앙 텍스트로만 처리한다.
- `TodayCourseCard`의 CTA는 코스가 있으면 `dailyRoutine`으로, 없으면 `courseRecommendation`으로 보낸다(문구·위치는 동일, 목적지만 갈린다).

### 3. `estimatedDurationSeconds`/`estimatedKcal`이 `null`이면 칩에 `-` 플레이스홀더를 표시한다

칩 자체를 숨기지 않는다. 위치·개수가 고정된 레이아웃을 유지하고, 값만 `-`로 대체한다.

### 4. 코스 진행도(`CourseProgress`)는 `completedStepCount`/`totalStepCount`/`completed`를 그대로 매핑한다

`TodayCourseResponse`가 이미 `entities/course`의 `CourseProgress`(`current`/`total`) 및 `isCourseCompleted` 판정과 1:1로 맞아떨어져 별도 변환 로직이 필요 없다.

### 5. `PoseTipCard` 문구는 계속 프론트 소유로 남긴다

백엔드 응답에 팁 문구 필드 자체가 없다. 기존 `POSE_TIP_MESSAGES` 하드코딩 테이블은 유지하고, 조회 키만 목데이터 대신 API의 `targetPoseName`으로 교체한다.

## 결과

- `entities/course`에 `imageAssetKey → 이미지 asset` 매핑 테이블이 있다. 매핑되지 않은 키(또는 `null`)는 폴백 이미지로 처리한다. 홈/데일리 루틴/자세 도전 현황 모두 이 함수를 공유한다.
- 홈 화면은 진행 중/오늘 완주 코스가 없어도 동일한 레이아웃으로 접근 가능하다. 자동 리다이렉트 없이, `TodayCourseCard`의 CTA를 눌러야 추천 화면으로 이동한다.
- 운동(exercise) 이미지는 `exercise/*` 네임스페이스라 이 매핑 테이블(`target-pose/*`)에 없어 항상 폴백으로 빠진다 — 운동 이미지 에셋이 생기면 별도 테이블로 분리한다.
