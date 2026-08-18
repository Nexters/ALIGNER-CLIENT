const ACCESS_TOKEN_KEY = "accessToken";

export const getAccessToken = () => sessionStorage.getItem(ACCESS_TOKEN_KEY);

export const setAccessToken = (token: string | null) => {
  if (!token) {
    sessionStorage.removeItem(ACCESS_TOKEN_KEY);
    return;
  }

  sessionStorage.setItem(ACCESS_TOKEN_KEY, token);
};

export const isAuthenticated = () => getAccessToken() !== null;
