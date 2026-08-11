# CONTEXT

이 레포에서 쓰는 도메인 용어집. 새 용어가 생기거나 기존 용어의 정의가 바뀔 때 `grill-with-docs`(`domain-modeling`)가 이 문서를 갱신한다.

## 용어

| 용어 | 정의 | 비고 |
| ---- | ---- | ---- |
| Indicator | 다단계 플로우에서 현재 몇 번째 단계인지 보여주는 세그먼트 진행 표시. 채워진 칸 수 = 현재 단계 | `shared/ui/indicator`. 단계 수는 `total`로 가변 |
| OptionItem | 사용자가 여러 선택지 중 하나를 고를 때 쓰는 원형 이미지 아이템. 선택 여부는 부모가 소유한다 | `shared/ui/option-item`. 나열 컨테이너는 쓰는 쪽(feature)에서 만든다 |
| TextField | 값을 크게 표시하며 입력받는 단일 라인 입력 필드 | `shared/ui/text-field`. 구현 예정 |

