# ADR-0005. 데일리 루틴(코스 상세) API 연동

- 상태: 결정됨
- 날짜: 2026-08-18
- 맥락 소유: `pages/daily-routine`

## 맥락

홈 화면(ADR-0004)에서 "오늘 운동 시작하기"를 누르면 `pages/daily-routine`으로 이동해 코스의 "코스 순서" 목록을 보여준다. 지금까지는 `MOCK_EXERCISES`(6개 고정 목데이터)를 그렸는데, 실제 서버 스펙(`GET /courses/{courseId}`, `CourseDetailResponse`)을 붙이면서 코드만 봐서는 정할 수 없는 것들이 있었다.

- 홈에서 코스 상세로 어떤 식별자를 넘겨야 하는지: `ROUTES.dailyRoutine`(`/daily-routine`)과 `ROUTES.dailyRoutineExercise`(`/daily-routine/:exerciseId`)가 이미 같은 `/daily-routine` 아래 동적 세그먼트를 쓰고 있어, `courseId`를 경로 파라미터로 얹으면 두 라우트가 겹친다.
- `CourseDetailResponse`의 스텝(`steps`)과 "코스 순서" 목록의 운동 한 줄은 1:1이 아니다. 한 스텝(`courseStepId`)에 운동(`exercises`)이 여럿 달릴 수 있다. 기존 목데이터는 우연히 스텝 수와 운동 수가 같아서(6개) 이 구조가 드러나지 않았다.
- 운동 개별 이미지(`imageAssetKey`, 예: `"exercise/cat-cow"`)를 로컬에서 매핑할 에셋이 아예 없다(자세 이미지만 `shared/assets/imgs/`에 있다).
- `Exercise.difficulty`(난이도) 필드가 API 응답에 없다.

## 결정

### 1. `courseId`는 쿼리 파라미터로 넘긴다

`toDailyRoutinePath(courseId)` → `"/daily-routine?courseId=20"`. 경로 파라미터로 만들면 `/daily-routine/:exerciseId`(운동 상세)와 겹치므로, 라우트 구조를 바꾸는 대신 쿼리로 우회한다. `DailyRoutinePage`는 `useSearchParams()`로 읽는다. `courseId`가 없거나 유효하지 않으면(현재는 `NaN` 체크 없이 `Number()` 결과를 그대로 씀 — 홈의 CTA를 거치지 않고 직접 URL을 조작하는 경우는 고려하지 않았다) 로딩과 마찬가지로 빈 화면을 그린다.

### 2. "코스 순서" 목록은 스텝이 아니라 운동 단위로 펼친다

`mapCourseDetailResponse`가 `steps`를 `stepOrder` 오름차순 → 각 스텝의 `exercises`를 `displayOrder` 오름차순으로 정렬해 평평한 배열(`exercises: DailyRoutineExerciseRowView[]`)로 만든다. 한 스텝의 운동 여러 개는 같은 `courseStepId`/`completed`를 공유하는 여러 줄이 된다. 화면에 매기는 번호(`step` prop)는 서버의 `stepOrder`가 아니라 이 배열의 인덱스+1이다 — 사용자에게는 "몇 번째 운동인지"가 중요하지, 서버 내부의 스텝 그룹핑은 드러나지 않는다.

운동이 없는 스텝(`exercises: []`)은 목록에서 제외한다.

### 3. "활성 줄"은 첫 미완료 운동, 모두 완료했으면 마지막 운동이다

`SequenceItem`의 `active`(진행 중인 줄 강조)를 위해, 평평하게 편 목록에서 `completed === false`인 첫 줄의 인덱스를 쓴다. 전부 완료했으면 마지막 줄, 표시할 운동이 하나도 없으면 `null`이다.

### 4. 운동 이미지는 자세 이미지와 같은 폴백 전략을 재사용한다

`entities/course`의 `getPoseImageSrc`를 운동 이름(`exercise.name`)에도 그대로 쓴다. 매핑 테이블에 없는 이름(사실상 전부, 지금 테이블은 자세 이름만 있다)은 자연히 폴백 이미지로 빠진다. 운동 전용 이미지 에셋이 생기면 별도 매핑 테이블로 분리한다.

### 5. `difficulty`(난이도)는 이 화면에 없으므로 옮기지 않는다

"코스 순서" 목록(`SequenceItem`)은 애초에 난이도를 표시하지 않는다(운동 상세 페이지만 표시한다). `ExerciseDetailPage`는 이번 범위에서 다루지 않고 계속 `MOCK_EXERCISES`를 쓴다 — 운동 가이드(`GET /catalog/exercises/{exerciseId}`)와 난이도 데이터가 필요한 별도 작업으로 남긴다.

## 결과

- `pages/daily-routine/api/`에 `types.ts`/`get-course.ts`/`use-course.ts`/`map-course.ts`가 새로 생긴다. 순수 함수인 `mapCourseDetailResponse`만 단위 테스트를 남긴다.
- `ROUTES.dailyRoutineExercise`로의 이동은 여전히 `MOCK_EXERCISES` 기반 `ExerciseDetailPage`를 가리킨다 — 실제 `exerciseId`로 눌러도 목데이터에 없는 id라 빈 화면이 뜬다. 운동 상세 연동은 후속 이슈다.
- CTA("운동 시작하기")는 완료 여부만 반영하고, 실제 운동 수행 플로우 라우팅은 여전히 TODO다(기존과 동일).
