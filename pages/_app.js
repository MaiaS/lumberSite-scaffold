import '../styles/index.css'
import {ThemeProvider} from 'theme-ui';
import theme from '../src/utils/theme';
import Layout from '../src/components/Layout';


function MyApp({ Component, pageProps }) {
  
  return <ThemeProvider theme={theme}>
    <Layout>
  <Component {...pageProps} />
  </Layout>
  </ThemeProvider>
}

export default MyApp
