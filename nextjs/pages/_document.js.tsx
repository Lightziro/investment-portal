import * as React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";
import createEmotionServer from "@emotion/server/create-instance";
import createEmotionCache from "../utils/create-emotion-cache";
import { ServerStyleSheets } from "@material-ui/core/styles";

export default class MyDocument extends Document {
    render() {
        return (
            <Html lang="en">
                <Head>
                    <link
                        rel="stylesheet"
                        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
                    />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

// MyDocument.getInitialProps = async (ctx) => {
//     const sheets = new ServerStyleSheets();
//     const originalRenderPage = ctx.renderPage;
//
//     ctx.renderPage = () =>
//         originalRenderPage({
//             enhanceApp: (WrappedComponent) => (props) =>
//                 sheets.collect(<WrappedComponent {...props} />),
//         });
//
//     const initialProps = await Document.getInitialProps(ctx);
//
//     return {
//         ...initialProps,
//         styles: [
//             ...React.Children.toArray(initialProps.styles),
//             sheets.getStyleElement(),
//         ],
//     };
// };
