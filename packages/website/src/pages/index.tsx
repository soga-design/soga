import type { NextPage } from "next";
import { getTokenCookie } from "../utils/cookies";
import { useGetUserQuery } from "../services/github";

const GITHUB_AUTH_URL = "https://github.com/login/oauth/authorize";
const GITHUB_SCOPE = "read:user,gist";

const Home: NextPage = () => {
  const isLogin = !!getTokenCookie();
  const { data, isLoading } = useGetUserQuery(undefined, { skip: !isLogin });

  const login = () => {
    window.location.href = `${GITHUB_AUTH_URL}?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}&scope=${GITHUB_SCOPE}`;
  };
  if (!isLogin) {
    return <button onClick={login}>Login with GitHub</button>;
  }
  if (isLoading) {
    return <div>Loading</div>;
  }
  return <div>Login in with {data?.login}</div>;
};

export default Home;
