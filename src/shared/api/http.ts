import { apiClient } from "./client";
import { Auth } from "./generated/Auth";
import { Catalog } from "./generated/Catalog";
import { Courses } from "./generated/Courses";
import { HttpClient } from "./generated/http-client";
import { Members } from "./generated/Members";
import { Screening } from "./generated/Screening";
import { Sessions } from "./generated/Sessions";

const generatedClientFetch = apiClient.extend({ throwHttpErrors: false });
const customFetch: typeof fetch = (input, init) => generatedClientFetch(input as string, init);

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
export const screeningApi = new Screening(http);
export const coursesApi = new Courses(http);
export const catalogApi = new Catalog(http);
export const sessionsApi = new Sessions(http);
