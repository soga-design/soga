import type { NextApiRequest, NextApiResponse } from "next";
import { request } from "undici";
import { setTokenCookie } from "utils/cookies";

const GET_GITHUB_ACCESS_TOKEN_URL =
  "https://github.com/login/oauth/access_token";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  try {
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
    const { access_token, ...otherInfo } = await body.json();

    if (access_token) {
      setTokenCookie(res, access_token);
      res.redirect("/");
    } else {
      throw new Error(`Didn't get token, get ${JSON.stringify(otherInfo)}`);
    }
  } catch (e) {
    console.log(e);
    // TODO error handle
  }
}
