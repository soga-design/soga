import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { Endpoints } from "@octokit/types";
import { getTokenCookie } from "../utils/cookies";

type User = Endpoints["GET /user"]["response"]["data"];
type Gists = Endpoints["GET /gists/public"]["response"]["data"];
type CreateGistParams = Endpoints["POST /gists"]["parameters"];
type CreateGistResponse = Endpoints["POST /gists"]["response"]["data"];
type UpdateGistParams = Endpoints["PATCH /gists/{gist_id}"]["parameters"];
type UpdateGistResponse =
  Endpoints["PATCH /gists/{gist_id}"]["response"]["data"];

const GITHUB_API_URL = "https://api.github.com/";
const GIST_PER_PAGE = 100;

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
      query: (page = 1) =>
        `/gists/public?page=${page}&per_page=${GIST_PER_PAGE}`,
    }),
    createGist: build.mutation<CreateGistResponse, CreateGistParams>({
      query: (params) => ({
        url: "/gists",
        method: "POST",
        body: JSON.stringify(params),
      }),
    }),
    updateGist: build.mutation<UpdateGistResponse, UpdateGistParams>({
      query: ({ gist_id, ...params }) => ({
        url: `/gists/${gist_id}`,
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
