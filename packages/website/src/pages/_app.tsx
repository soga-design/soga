import { Provider } from "react-redux";
import type { AppProps } from "next/app";
import { NextPage } from "next";

import { store } from "../store";

const MyApp: NextPage<AppProps> = ({ Component, pageProps }) => {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
};

export default MyApp;
