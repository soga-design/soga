import type { NextPage } from "next";
import Link from "next/link";
import { getTokenCookie } from "utils/cookies";
import { useGetUserQuery } from "services/github";
import { useGetAllGists } from "hooks/useGetAllGists";

const GITHUB_AUTH_URL = "https://github.com/login/oauth/authorize";
const GITHUB_SCOPE = "read:user,gist";

const Home: NextPage = () => {
  const isLogin = !!getTokenCookie();

  const { data: user, isLoading: isLoadingUser } = useGetUserQuery(undefined, {
    skip: !isLogin,
  });
  const { gists, isLoading: isLoadingGist } = useGetAllGists();

  const login = () => {
    window.location.href = `${GITHUB_AUTH_URL}?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}&scope=${GITHUB_SCOPE}`;
  };
  if (!isLogin) {
    return <button onClick={login}>Login with GitHub</button>;
  }
  if (isLoadingUser || isLoadingGist) {
    return <div>Loading</div>;
  }

  return (
    <div>
      Login in with {user?.login}
      <div>
        {gists.map(({ name, id }) => (
          <div key={id}>
            <Link href={`/edit/${id}`}>{name}</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
