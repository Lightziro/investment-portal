import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/main.scss";
import "antd/dist/antd.css";
import "react-loading-skeleton/dist/skeleton.css";
import "../../nextjs/config/i18next";
import { Provider } from "react-redux";
import { SnackbarAlert } from "../components/smart/snackbar-alert/SnackbarAlert";
import { clientStore } from "../redux/store/Store";
import "suneditor/dist/css/suneditor.min.css";

const MyApp = ({ Component, pageProps }) => {
    return (
        <Provider store={clientStore}>
            <Component {...pageProps} />
            <SnackbarAlert />
        </Provider>
    );
};
export default MyApp;
