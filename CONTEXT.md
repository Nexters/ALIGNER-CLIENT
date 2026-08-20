# CONTEXT

이 레포에서 쓰는 도메인 용어집. 새 용어가 생기거나 기존 용어의 정의가 바뀔 때 `grill-with-docs`(`domain-modeling`)가 이 문서를 갱신한다.

## 용어

| 용어 | 정의 | 비고 |
| ---- | ---- | ---- |
| Indicator | 다단계 플로우에서 현재 몇 번째 단계인지 보여주는 세그먼트 진행 표시. 채워진 칸 수 = 현재 단계 | `shared/ui/indicator`. 단계 수는 `total`로 가변 |
| OptionItem | 사용자가 여러 선택지 중 하나를 고를 때 쓰는 원형 이미지 아이템. 선택 여부는 부모가 소유한다 | `shared/ui/option-item`. 나열 컨테이너는 쓰는 쪽(feature)에서 만든다 |
| NumberField | 숫자를 크게 표시하며 입력받는 단일 라인 입력 필드. suffix로 단위 표시, error로 에러 상태 외부 제어 | `shared/ui/number-field` |
| TextField | 자유 텍스트(한글/영문/숫자 등)를 입력받는 단일 라인 입력 필드. NumberField와 달리 숫자로 필터링하지 않고, 가운데 정렬이 아닌 왼쪽 정렬. error로 에러 상태 외부 제어 | `shared/ui/text-field` |
| ProgressRingItem | 원형 이미지 둘레를 진행 비율만큼 링으로 칠하고, 아래에 이름과 배지를 붙이는 아이템. `current=0`은 미시작(링·배지 없음), `current=total`은 완료 강조 | `shared/ui/progress-ring-item`. 단계 수는 `total`로 가변, 배지 문구는 외부 주입 |
| SequenceItem | 좌측 순번 배지 + 점선 연결선, 우측 정보 카드로 이루어진 목록 한 줄. 순서가 있는 항목을 세로로 나열할 때 쓴다 | `shared/ui/sequence-item`. 마지막 줄은 `isLast`로 연결선을 숨긴다 |
| Member | 카카오 로그인으로 식별·생성되는 회원 도메인 객체. 닉네임·키·몸무게·운동 경력 등 온보딩 정보를 갖는다. 온보딩 전에는 해당 필드가 null | `entities/member`. _Avoid_: User, 사용자, Account |
| 목표 자세 | 코스가 최종적으로 완성을 노리는 자세 | |
| 코스 (Course) | 목표 자세 1개를 위해 구성된 동작 묶음 | |
| 세션 (Session) | 코스를 처음부터 끝까지 한 번 실행하는 단위. 완료 후에도 재조회 가능한 리소스다 | |
| 동작 (Exercise) | 코스를 구성하는 개별 운동 | |
| 완료 리포트 | 세션 완료 직후 노출되는 결과 화면 | 세션-7 |
| 핀포즈 | 코스 스텝 중 정지 자세를 붙잡고 있는(홀드하는) 동작. 체감 기록 화면(세션-6)이 "오늘 이거 어땠어요?"로 묻는 대상이다 | 한 코스 안에 여러 번 나올 수 있다(중간 체크포인트 홀드 + 최종 목표 자세 등). "이 핀포즈가 코스의 목표 자세와 같은 것인지" 판별하는 필드는 아직 없다 — `pages/complete`, `docs/adr/0007-*` |
| 파이어로그 | **두 가지 뜻으로 쓰인다.** ① 9개 목표 자세 중 하나(골반 레벨 3, Fire log pose)를 가리키는 고유명사. ② API 스펙 문서·UI 카피에서 "도장 진행도 카드/섹션"을 가리키는 일반 명칭으로도 쓰인다(예: "파이어로그 카드", "파이어로그 `acquiredStampCount`/`requiredStampCount`") — 이 경우 특정 자세와 무관하다 | 코드에서 두 의미를 헷갈리지 않게 주의. _Avoid_: 어느 뜻인지 안 밝히고 그냥 "파이어로그"라고만 쓰기 |
| 도장 (스탬프) | 목표 자세 하나를 완성하려면 그 자세를 겨냥한 코스를 4번 완주해야 하는데, 완주할 때마다 하나씩 쌓이는 카운트. `N / 4회`로 표시 | API: `acquiredStampCount`/`requiredStampCount`(분자/분모), `stampAcquired`(이번 호출로 새로 붙었는지). `entities/pose`(자세 도전 현황)와 `pages/complete`(완료 리포트)가 같은 개념을 각자 매핑해 쓴다 |
