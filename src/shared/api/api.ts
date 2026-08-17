import type { Input, Options } from "ky";
import { apiClient } from "./client";

export const api = {
  get: <T>(url: Input, options?: Options) => apiClient.get(url, options).json<T>(),
  post: <T>(url: Input, options?: Options) => apiClient.post(url, options).json<T>(),
  put: <T>(url: Input, options?: Options) => apiClient.put(url, options).json<T>(),
  patch: <T>(url: Input, options?: Options) => apiClient.patch(url, options).json<T>(),
  delete: <T>(url: Input, options?: Options) => apiClient.delete(url, options).json<T>(),
};
