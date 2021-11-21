import { setCookie, parseCookies, destroyCookie } from "nookies";
import type { NextApiResponse } from "next";
import { Theme } from "../constants";

const TOKEN_NAME = "github_access_token";
const TOKEN_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

const THEME_NAME = "theme";

export const setTokenCookie = (res: NextApiResponse, token: string) => {
  setCookie({ res }, TOKEN_NAME, token, {
    maxAge: TOKEN_MAX_AGE,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    sameSite: "lax",
  });
};

export const getTokenCookie = () => parseCookies()?.[TOKEN_NAME];
export const destroyTokenCookie = () => destroyCookie(null, TOKEN_NAME);

export const setThemeCookie = (mode: Theme) =>
  setCookie({}, THEME_NAME, mode, {
    path: "/",
  });

export const getThemeCookie = () => parseCookies()?.[THEME_NAME] as Theme;
