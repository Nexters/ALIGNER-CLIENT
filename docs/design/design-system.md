# Design System

Figma ↔ 코드 대응표. Figma 컴포넌트/토큰이 어떤 `shared/ui` 컴포넌트 또는 `styles/` 토큰(컬러는 `tokens/colors.css`, 타이포그래피는 `tokens/typography.css`, spacing은 `tokens/spacing.css`, 전역 레이아웃/리셋은 `layout.css`)과 대응하는지 여기에 기록한다.

## 컴포넌트 대응표

| Figma 컴포넌트 | 코드 위치 | 비고 |
| -------------- | --------- | ---- |
| Indicator ([482:7011](https://www.figma.com/design/T2upW8lruemIBSEwLZ6Lpc/web_%ED%94%84%EB%A0%99_%EB%94%94%EC%9E%90%EC%9D%B8-%EC%9E%91%EC%97%85%EB%B0%A9?node-id=482-7011&m=dev)) | `shared/ui/indicator` | 세그먼트형 단계 진행 표시. `total`(필수)로 칸 수 가변, `current=0`은 미시작 |
| status=Default/active ([452:5885](https://www.figma.com/design/T2upW8lruemIBSEwLZ6Lpc/web_%ED%94%84%EB%A0%99_%EB%94%94%EC%9E%90%EC%9D%B8-%EC%9E%91%EC%97%85%EB%B0%A9?node-id=452-5885&m=dev)) | `shared/ui/option-item` | 원형 이미지 + 라벨 선택 아이템. Figma의 이름과 달리 `OptionItem`으로 명명 |
| text field ([459:9086](https://www.figma.com/design/T2upW8lruemIBSEwLZ6Lpc/web_%ED%94%84%EB%A0%99_%EB%94%94%EC%9E%90%EC%9D%B8-%EC%9E%91%EC%97%85%EB%B0%A9?node-id=459-9086&m=dev)) | `shared/ui/text-field` | Default/focussed/filled. 구현 예정 |

## 토큰 대응표

### Color / Gray

| Figma 토큰 | CSS 변수 | 비고 |
| ---------- | -------- | ---- |
| `cool gray/5` | `--color-gray-5` | |
| `cool gray/7` | `--color-gray-7` | |
| `cool gray/10` | `--color-gray-10` | |
| `cool gray/20` | `--color-gray-20` | |
| `cool gray/30` | `--color-gray-30` | |
| `cool gray/40` | `--color-gray-40` | |
| `cool gray/50` | `--color-gray-50` | |
| `cool gray/60` | `--color-gray-60` | |
| `cool gray/70` | `--color-gray-70` | |
| `cool gray/80` | `--color-gray-80` | |
| `cool gray/90` | `--color-gray-90` | |
| `cool gray/95` | `--color-gray-95` | |
| `cool gray/96` | `--color-gray-96` | |
| `cool gray/97` | `--color-gray-97` | |
| `cool gray/98` | `--color-gray-98` | |
| `cool gray/99` | `--color-gray-99` | |

### Color / Primary

| Figma 토큰 | CSS 변수 | 비고 |
| ---------- | -------- | ---- |
| `primary/50` | `--color-primary-50` | |
| `primary/100` | `--color-primary-100` | |
| `primary/200` | `--color-primary-200` | |
| `primary/300` | `--color-primary-300` | |
| `primary/400` | `--color-primary-400` | |
| `primary/500` | `--color-primary-500` | |
| `primary/700` | `--color-primary-700` | |
| `primary/800` | `--color-primary-800` | |
| `primary/900` | `--color-primary-900` | |
| `primary/950` | `--color-primary-950` | |

### Color / Secondary

| Figma 토큰 | CSS 변수 | 비고 |
| ---------- | -------- | ---- |
| `secondary/50` | `--color-secondary-50` | |
| `secondary/100` | `--color-secondary-100` | |
| `secondary/200` | `--color-secondary-200` | |
| `secondary/300` | `--color-secondary-300` | |
| `secondary/400` | `--color-secondary-400` | |
| `secondary/500` | `--color-secondary-500` | |
| `secondary/600` | `--color-secondary-600` | |
| `secondary/700` | `--color-secondary-700` | |
| `secondary/800` | `--color-secondary-800` | |
| `secondary/900` | `--color-secondary-900` | |
| `secondary/950` | `--color-secondary-950` | |

### Color / Tertiary

| Figma 토큰 | CSS 변수 | 비고 |
| ---------- | -------- | ---- |
| `tertiary/50` | `--color-tertiary-50` | |
| `tertiary/100` | `--color-tertiary-100` | |
| `tertiary/200` | `--color-tertiary-200` | |
| `tertiary/300` | `--color-tertiary-300` | |
| `tertiary/400` | `--color-tertiary-400` | |
| `tertiary/500` | `--color-tertiary-500` | |
| `tertiary/600` | `--color-tertiary-600` | |
| `tertiary/700` | `--color-tertiary-700` | |
| `tertiary/800` | `--color-tertiary-800` | |
| `tertiary/900` | `--color-tertiary-900` | |
| `tertiary/950` | `--color-tertiary-950` | |

### Color / Error

| Figma 토큰 | CSS 변수 | 비고 |
| ---------- | -------- | ---- |
| `error` | `--color-error` | |

### Color / White

| Figma 토큰 | CSS 변수 | 비고 |
| ---------- | -------- | ---- |
| `white` | `--color-white` | |

### Color / Black

| Figma 토큰 | CSS 변수 | 비고 |
| ---------- | -------- | ---- |
| `black` | `--color-black` | `overlay/dim`의 베이스로 사용 |

### Color / Semantic

| Figma 토큰 | CSS 변수 | 비고 |
| ---------- | -------- | ---- |
| `bg/base` | `--color-bg-base` | |
| `bg/surface` | `--color-bg-surface` | |
| `bg/muted` | `--color-bg-muted` | |
| `bg/inverse` | `--color-bg-inverse` | |
| `ink/strong` | `--color-ink-strong` | |
| `ink/base` | `--color-ink-base` | |
| `ink/muted` | `--color-ink-muted` | |
| `ink/inverse` | `--color-ink-inverse` | |
| `ink/error` | `--color-ink-error` | |
| `accent/base` | `--color-accent-base` | |
| `accent/strong` | `--color-accent-strong` | |
| `accent/subtle` | `--color-accent-subtle` | |
| `border/base` | `--color-border-base` | |
| `border/strong` | `--color-border-strong` | |
| `media/placeholder` | `--color-media-placeholder` | |
| `overlay/dim` | `--color-overlay-dim` | black 45% |

### Typography

폰트 패밀리(`Font/SUIT`)는 `@theme`의 CSS 변수(`--font-sans`)로 노출되지만, 사이즈 토큰들은 `@utility` 커스텀 디렉티브로 정의된 CSS 클래스다 (변수 아님 — `tailwind-merge`가 `--text-*` 커스텀 토큰을 컬러 유틸리티로 오인해서 `cn()` 합성 시 삭제되는 문제가 있어 `text-*` 네임스페이스를 쓰지 않기로 함).

| Figma 토큰 | CSS 변수/클래스 | 비고 |
| ---------- | -------- | ---- |
| `Font/SUIT` | `--font-sans` | CSS 변수 |
| `Large Title/Emphasized` | `typo-large-title-emphasized` | CSS 클래스 |
| `Title1/Emphasized` | `typo-title-1-emphasized` | CSS 클래스 |
| `Title2/Regular` | `typo-title-2-regular` | CSS 클래스 |
| `Title2/Emphasized` | `typo-title-2-emphasized` | CSS 클래스 |
| `Title2.5/Regular` | `typo-title-2-5-regular` | CSS 클래스 |
| `Title2.5/Emphasized` | `typo-title-2-5-emphasized` | CSS 클래스 |
| `Title3/Regular` | `typo-title-3-regular` | CSS 클래스 |
| `Title3/Emphasized` | `typo-title-3-emphasized` | CSS 클래스 |
| `Headline/Regular` | `typo-headline-regular` | CSS 클래스 |
| `Headline/Emphasized` | `typo-headline-emphasized` | CSS 클래스 |
| `body/Regular` | `typo-body-regular` | CSS 클래스 |
| `body/Emphasized` | `typo-body-emphasized` | CSS 클래스 |
| `Subheadline/Regular` | `typo-subheadline-regular` | CSS 클래스 |
| `Subheadline/Emphasized` | `typo-subheadline-emphasized` | CSS 클래스 |
| `Footnote/Regular` | `typo-footnote-regular` | CSS 클래스 |
| `Footnote/Emphasized` | `typo-footnote-emphasized` | CSS 클래스 |
| `Caption1/Regular` | `typo-caption-1-regular` | CSS 클래스 |
| `Caption1/Emphasized` | `typo-caption-1-emphasized` | CSS 클래스 |
| `Caption2/Regular` | `typo-caption-2-regular` | CSS 클래스 |
| `Caption2/Emphasized` | `typo-caption-2-emphasized` | CSS 클래스 |

### Spacing

4px(4-Point grid) 배수, 상황에 따라 2px 배수 허용.

| Figma 토큰 | CSS 변수 | 비고 |
| ---------- | -------- | ---- |
| `Spacing-0` | `--spacing-0` | 0px |
| `Spacing-1` | `--spacing-1` | 2px |
| `Spacing-2` | `--spacing-2` | 4px |
| `Spacing-3` | `--spacing-3` | 8px |
| `Spacing-4` | `--spacing-4` | 12px |
| `Spacing-5` | `--spacing-5` | 16px |
| `Spacing-6` | `--spacing-6` | 20px |
| `Spacing-7` | `--spacing-7` | 24px |
| `Spacing-8` | `--spacing-8` | 32px |
| `Spacing-9` | `--spacing-9` | 40px |
| `Spacing-10` | `--spacing-10` | 48px |
