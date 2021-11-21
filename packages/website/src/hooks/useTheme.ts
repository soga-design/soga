import { useContext } from "react";
import ThemeContext from "contexts/theme";

const useTheme = () => useContext(ThemeContext);

export default useTheme;
