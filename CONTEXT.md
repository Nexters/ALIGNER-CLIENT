# CONTEXT

이 레포에서 쓰는 도메인 용어집. 새 용어가 생기거나 기존 용어의 정의가 바뀔 때 `grill-with-docs`(`domain-modeling`)가 이 문서를 갱신한다.

## 용어

| 용어 | 정의 | 비고 |
| ---- | ---- | ---- |
| Indicator | 다단계 플로우에서 현재 몇 번째 단계인지 보여주는 세그먼트 진행 표시. 채워진 칸 수 = 현재 단계 | `shared/ui/indicator`. 단계 수는 `total`로 가변 |
| OptionItem | 사용자가 여러 선택지 중 하나를 고를 때 쓰는 원형 이미지 아이템. 선택 여부는 부모가 소유한다 | `shared/ui/option-item`. 나열 컨테이너는 쓰는 쪽(feature)에서 만든다 |
| NumberField | 숫자를 크게 표시하며 입력받는 단일 라인 입력 필드. suffix로 단위 표시, error로 에러 상태 외부 제어 | `shared/ui/number-field` |
| ProgressRingItem | 원형 이미지 둘레를 진행 비율만큼 링으로 칠하고, 아래에 이름과 배지를 붙이는 아이템. `current=0`은 미시작(링·배지 없음), `current=total`은 완료 강조 | `shared/ui/progress-ring-item`. 단계 수는 `total`로 가변, 배지 문구는 외부 주입 |
| SequenceItem | 좌측 순번 배지 + 점선 연결선, 우측 정보 카드로 이루어진 목록 한 줄. 순서가 있는 항목을 세로로 나열할 때 쓴다 | `shared/ui/sequence-item`. 마지막 줄은 `isLast`로 연결선을 숨긴다 |

