# 개발 파이프라인 설계

팀이 Claude Code를 같은 방식으로 쓰기 위한 운영 가이드.
각자 작업해도 결과물이 한 사람이 짠 것처럼 보이는 게 목표다.

skill은 Matt Pocock의 엔지니어링 스킬 모음에서 그대로 가져와 사용한다. Matt Pocock은 전 Vercel 엔지니어이자 Total TypeScript를 만든 TypeScript 교육자로, "vibe coding이 아닌 진짜 엔지니어링"을 표방하며 공개한 `.claude` 디렉토리가 TypeScript 커뮤니티에서 널리 채택되며 주목받고 있다. 패키지를 설치하면 Claude Code가 알아서 불러 쓴다.

## 기본 원칙

- 작업 전에 먼저 레포의 문서와 기존 코드를 본다.
- 한 번에 한 작업만 한다.
- 애매한 요구는 바로 구현하지 말고 먼저 정렬한다.
- 결정은 말로만 두지 않고 `CONTEXT.md`나 ADR에 남긴다 (에이전트가 작업 중 초안을 만들고 사람이 확인).
- **스킬과 커맨드는 다르다.** `grill-with-docs`, `to-spec`, `tdd`는 스킬 — 이름을 언급하면 호출된다. `/start-work`, `/ship`은 우리가 만든 슬래시 커맨드 — 타이핑해서 실행한다.

## 전체 흐름

```
아이디어 / 요청
  → grill-with-docs (요구사항·용어 정렬)
  → to-spec → GitHub Issue 생성
  → [추가] /start-work {이슈번호} → gh issue develop --checkout (이슈 연결 브랜치 생성)
  → /implement (seam별로 tdd 루프 반복, 커밋마다 pre-commit이 스테이징 파일만 검사)
      └ 완료되면 자체 code-review로 인계 (Standards/Spec 두 축 점검)
  → [추가] /ship → 전체 typecheck → gh pr create (Closes #이슈번호 자동 포함)
  → CodeRabbit 리뷰 (ESLint 자동 실행) + CI (typecheck)
  → review / approve → merge (develop 머지 시 이슈 자동 close)
```

이슈가 이미 명확하면 정렬 단계를 짧게 하고 바로 구현해도 된다. 이슈 하나가 seam 하나 정도로 아주 작을 땐 `/implement` 대신 `tdd`를 직접 불러도 되지만, 그 경우 `code-review` 인계를 직접 챙겨야 한다.

`to-spec`과 `/implement` 모두 PR을 열어주지 않는다. 브랜치 생성(`/start-work`)과 typecheck·PR 생성(`/ship`)은 별도 커맨드(`.claude/commands/`)로 자동화한다.

## 어떤 스킬을 언제 쓰나

| 스킬                       | 언제 쓰나                                                 | 이유                                                                                                                    |
| -------------------------- | --------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `setup-matt-pocock-skills` | 레포를 처음 세팅할 때 1회                                 | 이슈 트래커, 도메인 문서, 작업 규칙의 기준점을 정한다.                                                                  |
| `grill-with-docs`          | 새 기능 시작, 요구사항이 애매할 때, 설계 선택이 필요할 때 | 코드/문서/도메인 용어를 먼저 맞춰서 엇나간 구현을 막는다.                                                               |
| `to-spec`                  | 정렬한 내용을 이슈로 남길 때                              | 대화 내용을 작업 단위로 고정한다. 템플릿·브랜치 생성은 커스터마이징 필요 (아래 참고)                                    |
| `implement`                | 실제 구현할 때                                            | 티켓을 seam 단위로 나눠 tdd 루프를 반복하고, 끝나면 자체 code-review로 인계한다. 구현 도중 tdd를 직접 부를 필요가 없다. |

## 우리가 만들 커맨드

| 커맨드 (예시로 작성)     | 하는 일                                                                           |
| ------------------------ | --------------------------------------------------------------------------------- |
| `/start-work {이슈번호}` | `gh issue develop {이슈번호} --checkout` — 이슈에 연결된 브랜치를 만들고 체크아웃 |
| `/ship`                  | 전체 typecheck → `gh pr create` (`Closes #이슈번호`, `--assignee @me` 자동 포함)  |

### 브랜치 네이밍

`<prefix>/issue-{이슈번호}` — 이슈 번호는 끝에 붙인다.

- `feat/issue-1`, `fix/issue-2`
- prefix는 이슈 라벨로 정한다: `bug` 라벨이면 `fix`, 그 외에는 `feat`.

`CONTEXT.md`/ADR은 새 용어가 생기거나 중요한 설계 결정을 내렸을 때 쓴다. 둘 다 작업의 부산물이지, 별도 문서 작업 자체가 목표는 아니다.

## 세팅 체크리스트 (레포당 1회)

- [ ] `docs/agents/issue-tracker.md`가 GitHub로 설정돼 있는지 확인 (로컬 `.scratch/`로 잡혀 있으면 이슈가 팀원과 공유 안 됨 → `/setup-matt-pocock-skills` 재실행 또는 이 파일 직접 수정)
- [ ] `.claude/skills/to-spec/SKILL.md`의 내장 템플릿을 우리 `.github/ISSUE_TEMPLATE/` 형식으로 교체
- [ ] `.claude/commands/start-work.md`, `.claude/commands/ship.md` 작성
- [ ] `CLAUDE.md`에 "이슈 발행 직후 `/start-work {이슈번호}` 실행" 규칙 추가
- [ ] `/ship`에 `-assignee @me`, 브랜치명에서 파싱한 `Closes #이슈번호` 포함되는지 확인
- [ ] `.github/CODEOWNERS`에 팀원 전체 등록 (PR 작성자는 자동 제외되고 나머지에게 리뷰 요청)

> `to-spec`이 스펙 발행 후 자동으로 붙이는 `ready-for-agent` 라벨은 `triage` 스킬(안 씀) 없이는 그냥 참고용 표시일 뿐, 별다른 자동화는 없다.

## 파일/폴더 구조

```
/
├── .claude/
│   ├── CLAUDE.md
│   ├── commands/
│   │   ├── start-work.md
│   │   └── ship.md
│   └── skills/
├── .github/
│   ├── CODEOWNERS              # 리뷰어 자동 등록
│   ├── ISSUE_TEMPLATE/         # to-spec이 따라야 할 형식
│   ├── pull_request_template.md
│   └── workflows/ci.yml        # 타입체크만
├── .husky/pre-commit
├── CONTEXT.md                  # 용어집
├── docs/
│   ├── adr/                    # 결정 기록
│   ├── agents/                 # 이슈 트래커/도메인 문서 위치 설정
│   ├── conventions/frontend.md # Vercel best practices 위에 얹는 팀 규칙
│   └── design/design-system.md # Figma ↔ 코드 대응표
├── src/
│   ├── app/ pages/ features/ entities/
│   └── shared/{api,config,hooks,lib,ui}/
└── styles/globals.css
```

## 레포 구조 원칙

지금 구조는 FSD(Feature-Sliced Design)를 통째로 가져온 게 아니라, 필요하다고 판단한 일부만 뽑아온 것이다.

```
app → pages → features → entities → shared
```

- 상위 레이어는 하위 레이어만 참조한다 (역방향 참조 금지).
- features 끼리, entities 끼리 직접 참조하지 않는다 (같은 레이어 간 참조 금지).
- 바깥에서는 가능한 한 `features/{도메인}/index.ts`, `entities/{도메인}/index.ts`만 통해 가져간다.
- `entities`는 특정 feature에 종속되지 않는 도메인 객체(데이터 모델, 타입, 여러 feature가 공유하는 기본 UI)를 둔다.
- UI는 먼저 `shared/ui`에 있는지 확인한다.
- `widgets` 은 쓰지 않는다.
