# ADR-0006. 자세 도전 현황 API 연동

- 상태: 결정됨
- 날짜: 2026-08-18
- 맥락 소유: `pages/pose-challenge`, `entities/pose`

## 맥락

`pages/pose-challenge/ui/PoseChallengePage.tsx`가 `MOCK_POSES` 14개를 하드코딩해 그리고 있었다. 실제 스펙(`GET /courses/progress/target-poses`, `GET /screening/body-parts`)을 붙이며 정리한 것들.

- 부위 섹션 라벨("등"/"복부"/"골반")과 노출 순서는 스펙상 `GET /screening/body-parts`가 정한다(인증 불필요, "화면 노출 순서로 정렬된다"). `courses/progress/target-poses`의 `bodyPartCode`는 `BACK`/`ABDOMEN`/`PELVIS` 코드일 뿐 표시용 한글 라벨이 아니라서, 두 API를 함께 불러 조인해야 한다.
- 기존 `getPoseStatus`는 `current`/`total` 수치만으로 idle/inProgress/completed를 추론했다. 실제 응답은 `courseId`(코스 시작 여부)와 `completed`를 명시적으로 내려주므로, 그걸 그대로 쓰는 게 더 정확하다 — 특히 "시작 안 함"은 `acquiredStampCount`가 `0`이 아니라 `null`로 내려온다는 스펙 문구를 그대로 반영했다.

## 결정

### 1. `GET /screening/body-parts` + `GET /courses/progress/target-poses`를 각각 `useQuery`로 불러 순수 함수로 조인한다

`pages/pose-challenge/api/`에 두 엔드포인트 훅(`useBodyParts`, `useTargetPoseProgress`)을 따로 두고, `mapPoseChallengeProgress(progress, bodyParts)`가 부위 목록 순서대로 그룹을 만들고 각 그룹 안에 해당 `bodyPartCode`의 자세를 채운다. 두 응답이 모두 도착하기 전엔(`isPending`) 화면을 그리지 않는다.

### 2. 도전 상태(`idle`/`inProgress`/`completed`)는 서버 필드로 직접 판정한다

`entities/pose.PoseChallenge`에 `status: PoseChallengeStatus` 필드를 추가했다. `completed === true`면 `completed`, `courseId === null`이면(코스를 시작 안 함) `idle`, 그 외엔 `inProgress`다. `current`/`total`로 역산하던 이전 방식은 버렸다.

### 3. 이미지는 홈 화면과 같은 폴백 전략(`getPoseImageSrc`)을 재사용한다

`targetPoseName`으로 조회하고, 매핑에 없으면 폴백 이미지를 쓴다(ADR-0004와 동일한 이유 — `targetPoseImageAssetKey` 실값을 확인할 수 없다).

### 4. 필터 탭("전체"/"도전 중"/"완성")의 집계 숫자는 응답 루트의 `totalCount`/`inProgressCount`/`completedCount`를 그대로 쓴다

스펙이 "루트의 집계 셋은 `completed` 필터와 무관하게 언제나 전체 기준"이라고 명시해서, 필터링된 목록에서 다시 세지 않는다. `completed` 쿼리 파라미터는 서버가 제공하지만, "도전 중" 필터는 서버에 대응 파라미터가 없어 세 탭 모두 클라이언트에서 `status`로 거른다(항상 필터 없이 전체를 한 번만 불러온다).

## 결과

- `entities/pose.PoseChallenge`에 `status` 필드가 추가돼 타입이 바뀌었다(다른 소비처 없음).
- `pages/pose-challenge/api/`에 `types.ts`/`get-body-parts.ts`/`get-target-pose-progress.ts`/`use-pose-challenge-progress.ts`/`map-pose-challenge.ts`가 새로 생긴다. 순수 함수인 `mapPoseChallengeProgress`만 단위 테스트를 남긴다.
- `targetPoseImageAssetKey` 실값 확인 및 매핑 기준 전환(ADR-0004의 후속 과제)이 이 화면에도 그대로 적용된다.
