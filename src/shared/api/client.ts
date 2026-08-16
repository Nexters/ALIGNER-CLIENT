import ky from "ky";
import { authHeader } from "./hooks/auth-header";

export const apiClient = ky.create({
  baseUrl: import.meta.env.VITE_API_BASE_URL,
  timeout: 10_000,
  hooks: {
    beforeRequest: [authHeader],
  },
});
