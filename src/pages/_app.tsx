import '../style/global.css';
import { useState } from 'react';
import { AppProps } from 'next/app';
import { createMuiTheme, createStyles, makeStyles, Theme } from '@material-ui/core';
import Head from 'next/head';
import { useSelector, useStore } from 'react-redux';
import { RootState, StoreType, wrapper } from '../redux/store';
import { useCustomInterceptors } from '../utils/axios';
import { useSyncViewed } from '../redux/manga/utils';
import { useThemeHooks } from '../redux/theme/utils';
import { Box, Container, LinearProgress, ThemeProvider } from '@material-ui/core';
import { Header } from '../components/Header';
import { useRouter } from 'next/router';
import { useCustomEventListeners } from '../utils/customListeners';
import { useNeedSpinner } from '../redux/progressBar/utils';
import CssBaseline from '@material-ui/core/CssBaseline';

type StyleProps = { minHeight: string };

// We can't access local theme as it's passed only to children of ThemeProvider
const useStyles = (theme: Theme) =>
  makeStyles<Theme, StyleProps>(() =>
    createStyles({
      box: {
        minHeight: ({ minHeight }) => minHeight,
        padding: theme.spacing(0),
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
      },
      main: {
        position: 'relative',
        padding: 0,
        paddingBottom: '1rem',
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        minHeight: ({ minHeight }) => minHeight,
      },
      readerMain: {
        position: 'relative',
        padding: 0,
        color: theme.palette.text.primary,
        minHeight: ({ minHeight }) => minHeight,
      },
      progress: {
        position: 'absolute',
        width: '100%',
      },
    })
  );

function WrappedApp({ Component, pageProps }: AppProps) {
  const store = useStore() as StoreType;
  const themeState = useSelector((state: RootState) => state.theme);
  const router = useRouter();
  const { viewed: lastVisited } = useSelector((state: RootState) => state.manga);

  const generateTheme = () => createMuiTheme({ palette: themeState.palettes[themeState.mode] });
  const [theme, setTheme] = useState(generateTheme());
  const classes = useStyles(theme)({
    minHeight: '100vh',
  });

  useCustomEventListeners();
  useCustomInterceptors(store);
  useSyncViewed(store, lastVisited);
  useThemeHooks({ store, themeState, setTheme, generateTheme });
  const needSpinner = useNeedSpinner();

  return (
    <>
      <CssBaseline />
      <Head>
        <title>
          Sora
          {process.env.NODE_ENV === 'development' ? ' DEV' : ''}
        </title>
        <meta
          name="viewport"
          id="viewport"
          content="width=device-width, viewport-fit=cover, initial-scale=1, user-scalable=0"
        />
        <meta name="apple-mobile-web-app-capable" content="yes"></meta>
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent"></meta>
        <meta name="theme-color" content={theme.palette.primary.main} />
      </Head>

      <ThemeProvider theme={theme}>
        <Box className={classes.box}>
          {!/^\/read/.test(router.asPath) ? (
            <>
              <Header />
              <Container maxWidth="md" component="main" className={classes.main}>
                {needSpinner && <LinearProgress className={classes.progress} />}
                <Component {...pageProps} />
              </Container>
            </>
          ) : (
            // We don't want to render spinner (and probably Container in the future) when in reader mode
            <Container maxWidth="md" component="main" className={classes.readerMain}>
              <Component {...pageProps} />
            </Container>
          )}
        </Box>
      </ThemeProvider>

      <Head>
        {/* Leave OG tag priority to the component */}
        <meta property="og:title" content="Sora reader" />
        <meta property="og:image" content="/icon-512x512.png" />
      </Head>
    </>
  );
}

export default wrapper.withRedux(WrappedApp);
