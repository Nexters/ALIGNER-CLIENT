# Frontend Conventions

React/Next.js 성능 best practice는 `.claude/skills/vercel-react-best-practices`(Vercel Engineering 제공, 8개 카테고리 70개 규칙)를 기본으로 따른다. React/Next.js 코드를 작성·리뷰·리팩터링할 때 자동으로 트리거되는 model-invoked 스킬이라 따로 호출할 필요는 없다. 그 위에 이 팀에서 추가로 정한 규칙만 여기에 적는다 — 스킬에 이미 있는 내용을 다시 옮겨적지 않는다.

## 레포 구조 (FSD 일부 채택)

`app → pages → features → entities → shared` 순서만 쓴다. 자세한 원칙은 [CLAUDE.md](../../CLAUDE.md#레포-구조-원칙) 참고.

- 상위 레이어는 하위 레이어만 참조 (역방향 참조 금지)
- `features` 끼리, `entities` 끼리 직접 참조 금지
- 외부에서는 각 슬라이스의 `index.ts`(public API)만 통해 접근 — `features/{도메인}/index.ts`, `entities/{도메인}/index.ts`
- `entities`는 특정 feature에 종속되지 않는 도메인 객체(데이터 모델, 타입, 여러 feature가 공유하는 기본 UI)를 둔다
- 새 UI는 `shared/ui`에 있는지 먼저 확인
- `widgets`는 쓰지 않음

## 추가 규칙

아직 없음. 팀에서 합의된 규칙이 생기면 이 아래에 추가한다.
