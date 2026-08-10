# ADR-0001. shared/ui 공통 컴포넌트 작성 컨벤션

- 상태: 결정됨
- 날짜: 2026-08-07
- 맥락 소유: `shared/ui`

## 맥락

`src/shared/ui`가 비어 있는 상태에서 첫 공통 컴포넌트 3종(Indicator, OptionItem, TextField)을 구현하게 됐다. 여기서 정하는 배치·작성 방식이 앞으로 추가되는 모든 공통 컴포넌트의 표준이 된다.

기존 레포에는 `src/pages/home/ui/HomePage.tsx`처럼 PascalCase 파일이 있지만, 공통 컴포넌트는 페이지 컴포넌트와 성격이 다르다.

## 결정

### 배치

- `src/shared/ui/{component}/` — **컴포넌트별 폴더**, 폴더명은 **kebab-case**.
- 폴더 안 컴포넌트 파일은 **PascalCase** (`Radio.tsx`, `Indicator.tsx`).
- 폴더마다 **배럴(`index.ts`)을 둔다.** 외부에서는 배럴을 통해서만 가져간다.
  ```ts
  import { Indicator } from "@/shared/ui/indicator";
  ```
- 이 규칙은 `shared/ui`에만 적용된다. `features/{도메인}`, `entities/{도메인}` 슬라이스는 CLAUDE.md대로 계속 `index.ts` public API를 유지한다 — 동일한 패턴이라 특별히 다를 것은 없다.

### 작성

- **default export**를 쓴다 (`export default function Indicator(...) {}`), 배럴에서 `export { default as Indicator } from "./Indicator"`로 이름을 붙여 재노출한다.
- public prop 타입을 `export interface XxxProps extends ...` 형태로 파일 안에서 명시적으로 노출하고, 배럴에서 `export type`으로 같이 재노출한다. 가능하면 네이티브 엘리먼트 props를 상속한다.
- `React.forwardRef`는 쓰지 않는다. React 19에서 `ref`는 일반 prop이므로 props로 직접 받는다.
- 클래스 병합은 기존 `@/shared/lib/cn`을 쓴다.
- 토큰에 없는 치수의 임의값은 **rem**으로 쓴다 (`w-[4.4rem]`처럼) — `html { font-size: 62.5% }`라 1rem = 10px이며, `radio`/`button`이 이미 이 표기를 쓰고 있다.

### API 설계 원칙

- 하위 컴포넌트를 3개 이상 감춰야 하거나 `title`/`suffix`처럼 반복 구조가 명확할 때만 convenience prop을 만든다. 그 외에는 composition을 유지한다.
- **하나의 시각적 affix 자리에 generic prop과 semantic prop을 동시에 열지 않는다.** (예: `suffix`를 열었으면 `unit` prop을 따로 만들지 않는다.)
- `rootProps` 같은 escape hatch는 실제 사용성이 분명할 때만 추가한다.

## 결과

- `shared/ui`에 추가되는 모든 공통 컴포넌트가 동일한 폴더 구조를 따른다.
