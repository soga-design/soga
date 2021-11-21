import {
  createGlobalTheme,
  createGlobalThemeContract,
} from "@vanilla-extract/css";
import tokens from "./token";
import { Theme, THEME_ATTRIBUTE } from "../constants";

const makeColorScheme = (mode: Theme) => {
  const colors = tokens.colors[mode];
  return {
    colors,
  };
};

const getVarName = (_value: string | null, path: string[]) =>
  path.join("-").replace(".", "_").replace("/", "__");

const modeTokens = makeColorScheme(Theme.Light);
const modeVars = createGlobalThemeContract(modeTokens, getVarName);

createGlobalTheme(
  `[${THEME_ATTRIBUTE}="${Theme.Light}"]`,
  modeVars,
  modeTokens
);
createGlobalTheme(
  `[${THEME_ATTRIBUTE}="${Theme.Dark}"]`,
  modeVars,
  makeColorScheme(Theme.Dark)
);

export default modeVars;
