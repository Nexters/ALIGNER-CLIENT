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

### 1. 이미지 매핑 키는 `targetPoseImageAssetKey`가 아니라 `targetPoseName`(한글 자세명)을 쓴다

`assetKey`는 nullable인 데다 실제 값 형식을 검증할 수 없었다. 반면 `targetPoseName`은 응답에서 항상 내려오는 필수 문자열이고, 기존 `POSE_TIP_MESSAGES` 테이블도 이미 같은 한글 자세명을 키로 쓰고 있어 `src/shared/assets/imgs/*.png` 파일명과 그대로 맞아떨어진다. `entities/course`에 자세명 → 이미지 매핑 테이블을 새로 만들고, 매핑에 없는 자세명은 폴백 이미지(`yoga-1.png`)를 쓴다.

실제 `assetKey` 값과 명명 규칙이 확인되면(로그인 후 `/catalog/target-poses` 조회 등) 이 매핑을 `assetKey` 기준으로 옮기는 걸 재검토한다.

### 2. `/courses/today` 404는 리다이렉트하지 않고 홈 화면 자체에 빈 상태로 보여준다

처음엔 스웨거 설명("화면은 추천으로 보낸다")을 그대로 따라 `courseRecommendation`으로 즉시 리다이렉트했다. 실제 서버로 붙여서 테스트해 보니(진행 중인 코스가 없는 테스트 계정), 사용자가 홈 화면 자체에 접근하지 못하고 계속 추천 화면으로 튕기는 게 오히려 테스트/개발 흐름을 막는다는 걸 확인해 뒤집었다.

`HomeEmptyCourseCard`(`pages/home/ui/HomeEmptyCourseCard.tsx`)를 새로 만들어 `TodayCourseCard` 자리에 조건부로 렌더링한다. `CourseProgressCard`/`PoseTipCard`는 코스 데이터가 있을 때만 보이고, `PoseChallengeRow`는 코스 유무와 무관하게 항상 보인다. 이 빈 상태는 Figma 디자인이 없어 임시로 카드 크기만 맞추고 만들었다 — 실제 디자인이 나오면 교체한다.

### 3. `estimatedDurationSeconds`/`estimatedKcal`이 `null`이면 칩에 `-` 플레이스홀더를 표시한다

칩 자체를 숨기지 않는다. 위치·개수가 고정된 레이아웃을 유지하고, 값만 `-`로 대체한다.

### 4. 코스 진행도(`CourseProgress`)는 `completedStepCount`/`totalStepCount`/`completed`를 그대로 매핑한다

`TodayCourseResponse`가 이미 `entities/course`의 `CourseProgress`(`current`/`total`) 및 `isCourseCompleted` 판정과 1:1로 맞아떨어져 별도 변환 로직이 필요 없다.

### 5. `PoseTipCard` 문구는 계속 프론트 소유로 남긴다

백엔드 응답에 팁 문구 필드 자체가 없다. 기존 `POSE_TIP_MESSAGES` 하드코딩 테이블은 유지하고, 조회 키만 목데이터 대신 API의 `targetPoseName`으로 교체한다.

## 결과

- `entities/course`에 `targetPoseName → 이미지 asset` 매핑 테이블이 새로 생긴다. 매핑되지 않은 이름은 폴백 이미지로 처리한다.
- 홈 화면은 진행 중/오늘 완주 코스가 없어도 `HomeEmptyCourseCard`로 접근 가능하다. 추천 화면 이동은 그 카드의 CTA를 눌러야 일어난다(자동 리다이렉트 없음).
- `targetPoseImageAssetKey` 실값 확인 및 매핑 기준 전환은 후속 이슈로 남는다.
