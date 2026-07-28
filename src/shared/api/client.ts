import ky from "ky";

export const apiClient = ky.create({
  baseUrl: import.meta.env.VITE_API_BASE_URL,
  timeout: 10_000,
});
