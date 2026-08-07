# SVG 아이콘은 codegen 스크립트로만 컴포넌트화한다

Vite 생태계에서는 보통 `vite-plugin-svgr`로 `import Foo from "./foo.svg?react"`처럼 즉석 import를 지원하지만, 이 레포는 `@svgr/core` 기반 커스텀 스크립트(`pnpm generate:icons`)로 `src/shared/assets/icons/`의 SVG를 읽어 `src/shared/ui/icons/`에 실제 `.tsx` 파일을 생성하고 git에 커밋하는 방식을 택했다. 생성된 컴포넌트 코드가 PR diff로 그대로 리뷰되고, `shared/ui/icons`가 아이콘의 단일 출처(single source of truth)로 남게 하기 위함이다. 이에 따라 `?react` 즉석 import 경로는 지원하지 않는다 — 아이콘을 쓰려면 반드시 codegen 스크립트를 거쳐야 한다.

스크립트는 실행할 때마다 `shared/ui/icons/`를 clean 후 전량 재생성한다(원본 SVG 삭제 시 stale 산출물이 남지 않도록). `shared/assets/icons/mono/`(단색, `currentColor` 치환)와 `multicolor/`(원본 색상 유지)를 구분해 SVGR 옵션을 다르게 적용하지만, 산출물은 `shared/ui/icons/index.ts` 배럴 하나로 합쳐 재export하므로 사용하는 쪽은 이 구분을 신경 쓸 필요가 없다.
