import React from "react";
import App from "next/app";
import Head from "next/head";
import "bootstrap/dist/css/bootstrap.min.css";
import { wrapper } from "../redux/store/Store";
import "../styles/main.scss";
import "antd/dist/antd.css";
import "react-loading-skeleton/dist/skeleton.css";

class MyApp extends App {
    render() {
        const { Component, pageProps } = this.props;

        return <Component {...pageProps} />;
    }
}

export default wrapper.withRedux(MyApp);

// export default wrapper.withRedux(MyApp);
