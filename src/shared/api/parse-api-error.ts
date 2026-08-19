import type { ApiErrorResponse } from "./generated/data-contracts";

export function parseApiError(error: unknown): ApiErrorResponse | undefined {
  return (error as { error?: ApiErrorResponse } | undefined)?.error;
}
