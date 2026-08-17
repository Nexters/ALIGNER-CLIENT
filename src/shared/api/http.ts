import { apiClient } from "./client";
import { Auth } from "./generated/Auth";
import { HttpClient } from "./generated/http-client";
import { Members } from "./generated/Members";

const customFetch: typeof fetch = (input, init) => apiClient(input as string, init);

const http = new HttpClient({
  baseUrl: "",
  customFetch,
  baseApiParams: {
    format: "json",
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  },
});

export const authApi = new Auth(http);
export const membersApi = new Members(http);
