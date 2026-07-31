# Design System

Figma ↔ 코드 대응표. Figma 컴포넌트/토큰이 어떤 `shared/ui` 컴포넌트 또는 `styles/` 토큰(컬러는 `colors.css`, 타이포그래피는 `typography.css`, 그 외는 `globals.css`)과 대응하는지 여기에 기록한다.

## 컴포넌트 대응표

| Figma 컴포넌트 | 코드 위치 | 비고 |
| -------------- | --------- | ---- |
| | | 아직 반영된 컴포넌트 없음 |

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
| `accent/base` | `--color-accent-base` | |
| `accent/strong` | `--color-accent-strong` | |
| `accent/subtle` | `--color-accent-subtle` | |
| `border/base` | `--color-border-base` | |
| `border/strong` | `--color-border-strong` | |
| `media/placeholder` | `--color-media-placeholder` | |
| `overlay/dim` | `--color-overlay-dim` | black 45% |

### Typography

| Figma 토큰 | CSS 변수 | 비고 |
| ---------- | -------- | ---- |
| `Large Title/Emphasized` | `--text-large-title-emphasized` | |
| `Title1/Emphasized` | `--text-title-1-emphasized` | |
| `Title2/Regular` | `--text-title-2-regular` | |
| `Title2/Emphasized` | `--text-title-2-emphasized` | |
| `Title3/Regular` | `--text-title-3-regular` | |
| `Title3/Emphasized` | `--text-title-3-emphasized` | |
| `Headline/Regular` | `--text-headline-regular` | |
| `Headline/Emphasized` | `--text-headline-emphasized` | |
| `body/Regular` | `--text-body-regular` | |
| `body/Emphasized` | `--text-body-emphasized` | |
| `Subheadline/Regular` | `--text-subheadline-regular` | |
| `Subheadline/Emphasized` | `--text-subheadline-emphasized` | |
| `Footnote/Regular` | `--text-footnote-regular` | |
| `Footnote/Emphasized` | `--text-footnote-emphasized` | |
| `Caption1/Regular` | `--text-caption-1-regular` | |
| `Caption1/Emphasized` | `--text-caption-1-emphasized` | |
| `Caption2/Regular` | `--text-caption-2-regular` | |
| `Caption2/Emphasized` | `--text-caption-2-emphasized` | |

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
