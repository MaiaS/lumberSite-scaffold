import "../styles/index.css";
import { ThemeProvider } from "theme-ui";
import theme from "../src/utils/theme";
import Layout from "../src/components/Layout";
import { useEffect, useState } from "react";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    console.log(pageProps);
  }, []);
  const getLayout = Component.getLayout || ((page) => page);
  return (
    <ThemeProvider theme={theme}>
      {getLayout(<Component {...pageProps} />)}
    </ThemeProvider>
  );
}

export default MyApp;
