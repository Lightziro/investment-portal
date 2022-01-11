import React, { Fragment } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/main.scss";
import "antd/dist/antd.css";
import "react-loading-skeleton/dist/skeleton.css";
import "../../nextjs/config/i18next";
import { Provider } from "react-redux";
import { SnackbarAlert } from "../components/smart/snackbar-alert/SnackbarAlert";
import App from "next/app";
import { initStore } from "../ts/types/redux/store.init";
import { clientStore, serverStore } from "../redux/store/Store";
import { getInitUser, getListNews } from "../redux/utils/store.utils";
import { MainStore, UserStore } from "../ts/types/redux/store.types";

const MyApp = ({ Component, pageProps, state }): App => {
    return (
        <Provider
            store={
                process.browser
                    ? clientStore
                    : serverStore(process.initialState)
            }
        >
            <Component {...pageProps} />
            <SnackbarAlert />
        </Provider>
    );
};
export default MyApp;
MyApp.getInitialProps = async (ctx) => {
    const initialProps = App.getInitialProps(ctx);
    console.log("IS INIT PROPS", { ...initialProps });
    if (!process.browser) {
        const user: UserStore = await getInitUser(ctx.ctx.req);
        process.initialState = { user };
        return { ...initialProps, state: user };
    }
    return { ...initialProps };
};
