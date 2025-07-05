import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/main.scss";
import "react-loading-skeleton/dist/skeleton.css";
import "../../nextjs/config/i18next";
import { Provider } from "react-redux";
import { SnackbarAlert } from "../components/smart/snackbar-alert/SnackbarAlert";
import { clientStore } from "../redux/store/Store";
import "suneditor/dist/css/suneditor.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider } from "antd";

const MyApp = ({ Component, pageProps }) => {
    return (
        <Provider store={clientStore}>
            <AntdRegistry>
                <ConfigProvider
                    theme={{
                        token: {
                            colorPrimary: "#1890ff",
                            borderRadius: 6,
                        },
                    }}
                >
                    <Component {...pageProps} />
                    <SnackbarAlert />
                </ConfigProvider>
            </AntdRegistry>
        </Provider>
    );
};
export default MyApp;
