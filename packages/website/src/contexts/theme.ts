import { createContext } from "react";
import { Theme } from "../constants";

interface ThemeContextValue {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const defaultContextValue = {
  theme: Theme.Light,
  setTheme: () => {},
};

const ThemeContext = createContext<ThemeContextValue>(defaultContextValue);

export default ThemeContext;
