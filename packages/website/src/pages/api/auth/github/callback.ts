import type { NextApiRequest, NextApiResponse } from "next";
import { request } from "undici";
import { setTokenCookie } from "utils/cookies";

const GET_GITHUB_ACCESS_TOKEN_URL =
  "https://github.com/login/oauth/access_token";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const { code } = req.query;
  const { body } = await request(GET_GITHUB_ACCESS_TOKEN_URL, {
    method: "POST",
    body: JSON.stringify({
      client_id: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code,
    }),
    headers: {
      "content-type": "application/json",
      Accept: "application/json",
    },
  });
  const { access_token: accessToken, ...otherInfo } = await body.json();

  if (accessToken) {
    setTokenCookie(res, accessToken);
    res.redirect("/");
  } else {
    // TODO: error handle
    throw new Error(`Didn't get token, get ${JSON.stringify(otherInfo)}`);
  }
}
