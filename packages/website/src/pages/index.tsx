import type { NextPage } from "next";
import { Box } from "components/Box";
import { ReactNode } from "react";
import useTheme from "hooks/useTheme";
import useAuth from "hooks/useAuth";
import { Theme } from "../constants";

const Home: NextPage = () => {
  const { theme, setTheme } = useTheme();
  const { isLogin, user, isLoading, login, logout } = useAuth();
  const switchTheme = () =>
    setTheme(theme === Theme.Light ? Theme.Dark : Theme.Light);

  let content: ReactNode = null;

  if (isLoading) {
    content = "Loading...";
  } else if (!isLogin) {
    content = (
      <button type="button" onClick={login}>
        Login
      </button>
    );
  } else if (user) {
    content = (
      <div>
        <p>Hello, {user.login}</p>
        <button type="button" onClick={logout}>
          Logout
        </button>
      </div>
    );
  }
  return (
    <div>
      <button type="button" onClick={switchTheme}>
        Switch Theme
      </button>
      <Box background="backgroundPrimary" color="textPrimary">
        {content}
      </Box>
    </div>
  );
};

export default Home;
