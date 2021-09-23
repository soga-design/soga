import { serialize, parse } from "cookie";
import type { NextApiResponse } from "next";

const TOKEN_NAME = "github_access_token";

export const MAX_AGE = 60 * 60 * 24 * 30; // 30 days

export function setTokenCookie(res: NextApiResponse, token: string) {
  const cookie = serialize(TOKEN_NAME, token, {
    maxAge: MAX_AGE,
    expires: new Date(Date.now() + MAX_AGE * 1000),
    secure: process.env.NODE_ENV === "production",
    path: "/",
    sameSite: "lax",
  });

  res.setHeader("Set-Cookie", cookie);
}

export function getTokenCookie() {
  if (typeof document === "undefined") return undefined;
  return parse(document.cookie || "")[TOKEN_NAME];
}
