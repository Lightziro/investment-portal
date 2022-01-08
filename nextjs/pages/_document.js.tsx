import * as React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
    static async getInitialProps(ctx) {
        process.next = {
            url: ctx.req.url,
        };

        const initialProps = await Document.getInitialProps(ctx);

        initialProps.head.initialState = process.initialState;

        return initialProps;
    }
    render() {
        const json = JSON.stringify(this.props.head.initialState);

        function createMarkup() {
            return { __html: `window.serverStoreState = ${json};` };
        }
        return (
            <Html lang="en">
                <Head>
                    <link
                        rel="stylesheet"
                        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
                    />
                </Head>
                <script dangerouslySetInnerHTML={createMarkup()} />
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}
