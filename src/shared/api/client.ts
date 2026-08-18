import ky from "ky";
import { authHeader } from "./hooks/auth-header";
import { sessionExpiry } from "./hooks/session-expiry";

export const apiClient = ky.create({
  baseUrl: import.meta.env.VITE_API_BASE_URL,
  timeout: 10_000,
  hooks: {
    beforeRequest: [authHeader],
    afterResponse: [sessionExpiry],
  },
});
