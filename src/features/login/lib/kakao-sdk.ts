declare global {
  interface Window {
    Kakao?: {
      init: (key: string) => void;
      isInitialized: () => boolean;
      Auth: {
        authorize: (options: { redirectUri: string; throughTalk?: boolean }) => void;
      };
    };
  }
}

function getInitializedKakao() {
  if (!window.Kakao) {
    throw new Error("카카오 SDK가 로드되지 않았습니다.");
  }
  if (!window.Kakao.isInitialized()) {
    window.Kakao.init(import.meta.env.VITE_KAKAO_JS_KEY);
  }
  return window.Kakao;
}

export function requestKakaoLogin(redirectUri: string): void {
  getInitializedKakao().Auth.authorize({ redirectUri, throughTalk: false });
}
