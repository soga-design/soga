import type { AppProps } from "next/app";
import ThemeProvider from "components/ThemeProvider";
import { Provider as ReduxProvider } from "react-redux";
import { getThemeCookie } from "utils/cookies";
import store from "../store";

const MyApp = ({ Component, pageProps }: AppProps) => (
  <ReduxProvider store={store}>
    <ThemeProvider theme={getThemeCookie()}>
      <Component {...pageProps} />
    </ThemeProvider>
  </ReduxProvider>
);

export default MyApp;
