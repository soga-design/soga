import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { Endpoints } from "@octokit/types";
import { getTokenCookie } from "utils/cookies";

export type User = Endpoints["GET /user"]["response"]["data"];
export type Gists = Endpoints["GET /gists"]["response"]["data"];
export type CreateGistParams = Endpoints["POST /gists"]["parameters"];
export type CreateGistResponse = Endpoints["POST /gists"]["response"]["data"];
export type UpdateGistParams =
  Endpoints["PATCH /gists/{gist_id}"]["parameters"];
export type UpdateGistResponse =
  Endpoints["PATCH /gists/{gist_id}"]["response"]["data"];

export const GITHUB_API_URL = "https://api.github.com/";
export const GIST_PER_PAGE = 100;

export const githubApi = createApi({
  reducerPath: "github",
  baseQuery: fetchBaseQuery({
    baseUrl: GITHUB_API_URL,
    prepareHeaders: (headers) => {
      const token = getTokenCookie();
      if (!token) {
        throw new Error("Needs Authorization");
      }
      headers.set("Authorization", `token ${token}`);
      return headers;
    },
  }),
  endpoints: (build) => ({
    getUser: build.query<User, void>({
      query: () => "user",
    }),
    getGists: build.query<Gists, number | void>({
      query: (page = 1) => `gists?page=${page}&per_page=${GIST_PER_PAGE}`,
    }),
    createGist: build.mutation<CreateGistResponse, CreateGistParams>({
      query: (params) => ({
        url: "gists",
        method: "POST",
        body: JSON.stringify(params),
      }),
    }),
    updateGist: build.mutation<UpdateGistResponse, UpdateGistParams>({
      query: ({ gist_id, ...params }) => ({
        url: `gists/${gist_id}`,
        method: "PATCH",
        body: JSON.stringify(params),
      }),
    }),
  }),
});

export const {
  useGetUserQuery,
  useGetGistsQuery,
  useCreateGistMutation,
  useUpdateGistMutation,
} = githubApi;
