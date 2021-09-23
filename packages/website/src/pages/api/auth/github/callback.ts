import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { setTokenCookie } from "utils/cookies";

const GET_GITHUB_ACCESS_TOKEN_URL =
  "https://github.com/login/oauth/access_token";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { code } = req.query;
    const {
      data: { access_token },
    } = await axios.post(
      GET_GITHUB_ACCESS_TOKEN_URL,
      {
        client_id: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      },
      {
        headers: {
          Accept: "application/json",
        },
      }
    );
    if (access_token) {
      setTokenCookie(res, access_token);
      res.redirect("/");
    } else {
      // TODO error handle
    }
  } catch (e) {
    // TODO error handle
  }
}
