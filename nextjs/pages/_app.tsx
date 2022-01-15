import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/main.scss";
import "antd/dist/antd.css";
import "react-loading-skeleton/dist/skeleton.css";
import "../../nextjs/config/i18next";
import { Provider, useDispatch } from "react-redux";
import { SnackbarAlert } from "../components/smart/snackbar-alert/SnackbarAlert";
import App from "next/app";
import { clientStore, serverStore, wrapper } from "../redux/store/Store";
import { getInitUser } from "../redux/utils/store.utils";
import { UserStore } from "../ts/types/redux/store.types";
import { GetServerSideProps } from "next";
import { getUser } from "../redux/actions/userActions";

const MyApp = ({ Component, pageProps }): App => {
    return (
        <Provider store={clientStore}>
            <Component {...pageProps} />
            {/*<SnackbarAlert />*/}
        </Provider>
    );
};
export default MyApp;
// export const getServerSideProps = async (ctx) => {
//     const user: UserStore = await getInitUser(ctx.ctx.req);
//     return {
//         props: {
//             user,
//         },
//     };
// };
// MyApp.getInitialProps = async (ctx) => {
//     const initialProps = App.getInitialProps(ctx);
//     if (!process.browser) {
//         if (!process.initialState) {
//             process.initialState = {};
//         }
//
//         console.log("SET USER", user);
//         console.log("BASICK", process.initialState);
//         process.initialState.user = user;
//     }
//     return { ...initialProps };
// };
