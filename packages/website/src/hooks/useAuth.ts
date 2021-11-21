import { destroyTokenCookie, getTokenCookie } from "utils/cookies";
import { useGetUserQuery } from "services/github";
import { useState } from "react";

const GITHUB_AUTH_URL = "https://github.com/login/oauth/authorize";
const GITHUB_SCOPE = "read:user,gist";

const useAuth = () => {
  const [isLogin, setIsLogin] = useState(!!getTokenCookie());
  const { data: user, isLoading } = useGetUserQuery(undefined, {
    skip: !isLogin,
  });
  const login = () => {
    const params = {
      client_id: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID || "",
      scope: GITHUB_SCOPE,
    };
    window.location.href = `${GITHUB_AUTH_URL}?${new URLSearchParams(
      params
    ).toString()}`;
  };
  const logout = () => {
    destroyTokenCookie();
    setIsLogin(!!getTokenCookie());
  };
  return {
    login,
    isLoading,
    isLogin,
    user,
    logout,
  };
};

export default useAuth;
