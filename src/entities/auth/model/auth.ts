import { clearAccessToken, getAccessToken, setAccessToken } from "@/shared/api/token";

export function isAuthenticated(): boolean {
  return getAccessToken() !== null;
}

export function login(accessToken: string): void {
  setAccessToken(accessToken);
}

export function logout(): void {
  clearAccessToken();
}
