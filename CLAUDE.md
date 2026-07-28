# CLAUDE.md

이 레포에서 Claude Code로 작업할 때 지켜야 할 규칙. 전체 파이프라인 설명은 [project_guidelines.md](./project_guidelines.md) 참고.

## 작업 흐름

```
grill-with-docs (요구사항 정렬) → to-spec (이슈 생성) → /start-work {이슈번호} (브랜치 생성)
→ implement (seam별 tdd 반복, 완료 후 code-review 인계) → /ship (typecheck → PR 생성)
```

- 이슈가 이미 명확하면 `grill-with-docs` 단계는 짧게 하거나 생략해도 된다.
- 이슈 하나가 seam 하나 수준으로 아주 작으면 `implement` 대신 `tdd`를 직접 불러도 되지만, 그 경우 `code-review` 인계는 직접 챙긴다.
- **이슈가 발행되면 바로 이어서 `/start-work {이슈번호}`를 실행한다.** (`to-spec`은 이슈만 만들고 브랜치는 만들지 않는다.)

## 레포 구조 원칙

`app → pages → features → entities → shared` 순서만 사용한다 (FSD 전체가 아니라 이 중 필요한 일부만 채택).

- 상위 레이어는 하위 레이어만 참조한다 (예: `features`는 `entities`/`shared`를 참조 가능, 그 반대는 불가).
- `features` 끼리, `entities` 끼리 직접 참조하지 않는다 (같은 레이어 간 참조 금지).
- 바깥에서는 `features/{도메인}/index.ts`, `entities/{도메인}/index.ts`처럼 각 슬라이스의 public API(`index.ts`)를 통해서만 가져간다.
- `entities`에는 특정 기능에 종속되지 않는 도메인 객체(예: `user`, `product`)를 둔다. 여러 feature가 공유하는 데이터 모델·타입·기본 UI가 여기 해당한다.
- 새 UI를 만들기 전에 `shared/ui`에 있는지 먼저 확인한다.
- `widgets`는 쓰지 않는다.

## Agent skills

### Issue tracker

GitHub Issues. `gh` CLI로 생성/조회/코멘트/라벨/닫기 처리. 자세한 내용은 `docs/agents/issue-tracker.md` 참고.

### Domain docs

single-context. 루트의 `CONTEXT.md` + `docs/adr/`. 자세한 내용은 `docs/agents/domain.md` 참고.
