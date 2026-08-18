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
