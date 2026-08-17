# 인증 토큰을 localStorage에 저장한다

카카오 로그인(`POST /auth/kakao`)으로 발급받은 accessToken을 `localStorage`에 저장하기로 했다. `sessionStorage`나 인메모리 저장은 새로고침·탭 재실행마다 로그인이 풀려, 만료까지 14일(리프레시 토큰 없음)인 토큰 수명과 맞지 않는다.

httpOnly 쿠키보다 XSS에 더 노출된다는 트레이드오프가 있지만, 이 레포는 SSR 없는 순수 SPA(Vite)이고 백엔드가 리프레시 토큰 없이 단일 accessToken만 발급하는 구조라 쿠키 기반 설계로 얻는 이점이 적다. 모바일 웹 앱 특성상 세션이 자주 끊기는 쪽이 더 큰 UX 비용이라 판단해 `localStorage`를 택했다.
