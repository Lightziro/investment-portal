import React, { Fragment } from "react";
import Head from "next/head";
import { PortalNavBar } from "../components/smart/nav-bars/portal-nav-bar/PortalNavBar";
interface MainLayout {
    title: string;
}
export const MainLayout: React.FC<MainLayout> = ({ children, title }) => {
    return (
        <Fragment>
            <Head>
                <meta charSet="utf-8" />
                <title>{title} | Investment-Hub</title>
            </Head>
            <PortalNavBar />
            <div className="wrapper-site">
                <div className="page-wrapper">{children}</div>
            </div>
        </Fragment>
    );
};
