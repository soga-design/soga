import ThemeContext from "contexts/theme";
import { FC, useEffect, useMemo, useState } from "react";
import { setThemeCookie } from "utils/cookies";
import { Theme, THEME_ATTRIBUTE } from "../../constants";

interface Props {
  theme?: Theme;
}

const ThemeProvider: FC<Props> = ({
  theme: defaultTheme = Theme.Light,
  children,
}) => {
  const [theme, setTheme] = useState(defaultTheme);

  useEffect(() => {
    const root = document.querySelector(":root");
    root?.setAttribute(THEME_ATTRIBUTE, theme);
  }, [theme]);

  const value = useMemo(
    () => ({
      theme,
      setTheme: (newTheme: Theme) => {
        setTheme(newTheme);
        setThemeCookie(newTheme);
      },
    }),
    [theme]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export default ThemeProvider;
