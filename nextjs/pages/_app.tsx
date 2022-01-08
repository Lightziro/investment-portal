import React, { Fragment } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/main.scss";
import "antd/dist/antd.css";
import "react-loading-skeleton/dist/skeleton.css";
import "../../nextjs/config/i18next";
import { Provider } from "react-redux";
import { SnackbarAlert } from "../components/smart/snackbar-alert/SnackbarAlert";
import App from "next/app";
import getInitialState from "../redux/utils/store.utils";
import { initStore } from "../ts/types/redux/store.init";
import { clientStore, serverStore } from "../redux/store/Store";

const MyApp = ({ Component, pageProps, state }): App => {
    return (
        <Provider
            store={
                process.browser
                    ? clientStore
                    : serverStore({ ...initStore, ...state })
            }
        >
            <Fragment>
                <Component {...pageProps} />
                <SnackbarAlert />
            </Fragment>
        </Provider>
    );
};
MyApp.getInitialProps = async function (ctx) {
    const initialProps = App.getInitialProps(ctx);
    if (!process.browser) {
        const init = await getInitialState(ctx.ctx.req);
        process.initialState = init;
        return { ...initialProps, ...{ state: init } };
    }
    return { ...initialProps };
};
export default MyApp;
