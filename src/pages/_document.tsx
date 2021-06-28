import Document, {
  Head, Html, Main, NextScript,
} from 'next/document';
import React from 'react';
import { ServerStyleSheets } from '@material-ui/styles';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="ru">

        <Head>
          <meta charSet="utf-8" />
          <meta name="referrer" content="no-referrer" />
          <link rel="manifest" href="/manifest.json" />
          <link rel="icon" href="/favicon.ico" />
          <link rel="apple-touch-icon" href="/favicon.ico" />
          <link rel="stylesheet" href={'https://fonts.googleapis.com/css?family=Roboto&display=swap'} />
        <link rel="stylesheet" href={'https://fonts.googleapis.com/css?family=Montserrat&display=swap'} />
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>

      </Html>
    );
  }
}

// https://github.com/mui-org/material-ui/blob/master/examples/nextjs/pages/_document.js#L29
MyDocument.getInitialProps = async (ctx) => {
  const sheets = new ServerStyleSheets();
  const originalRenderPage = ctx.renderPage;

  ctx.renderPage = () => originalRenderPage({
    enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
  });

  const initialProps = await Document.getInitialProps(ctx);

  return {
    ...initialProps,
    // Styles fragment is rendered after the app and page rendering finish.
    styles: [
      ...React.Children.toArray(initialProps.styles),
      sheets.getStyleElement()],
  };
};

export default MyDocument;
