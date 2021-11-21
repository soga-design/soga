import { Theme } from "../constants";

type ColorKey = keyof typeof lightThemeColor;

const lightThemeColor = {
  textPrimary: "#000",
  backgroundPrimary: "#fff",
};
const darkThemeColor: Record<ColorKey, string> = {
  textPrimary: "#fff",
  backgroundPrimary: "#000",
};

const colors = {
  [Theme.Light]: lightThemeColor,
  [Theme.Dark]: darkThemeColor,
};

const tokens = {
  colors,
};

export default tokens;
