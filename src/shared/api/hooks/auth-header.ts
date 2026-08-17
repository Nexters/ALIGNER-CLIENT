import type { BeforeRequestHook } from "ky";
import { getAccessToken } from "../access-token";

export const authHeader: BeforeRequestHook = ({ request }) => {
  const token = getAccessToken();
  if (!token) return;

  request.headers.set("Authorization", `Bearer ${token}`);
};
