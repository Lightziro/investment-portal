import React, { useEffect } from "react";
import App from "next/app";
import "bootstrap/dist/css/bootstrap.min.css";
import { wrapper } from "../redux/store/Store";
import "../styles/main.scss";
import "antd/dist/antd.css";
import "react-loading-skeleton/dist/skeleton.css";
import "../../nextjs/config/i18next";

function MyApp(props) {
    const { Component, pageProps } = props;

    return <Component {...pageProps} />;
}
export default wrapper.withRedux(MyApp);
