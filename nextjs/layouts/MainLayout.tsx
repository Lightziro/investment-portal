import React, { Fragment, useEffect } from "react";
import Head from "next/head";
import { PortalNavBar } from "../components/smart/nav-bars/portal-nav-bar/PortalNavBar";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { getUser } from "../redux/actions/userActions";
interface MainLayout {
    title: string;
    showNavBar?: boolean;
}
export const MainLayout: React.FC<MainLayout> = ({
    children,
    title,
    showNavBar = true,
}) => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getUser());
    }, []);
    return (
        <Fragment>
            <Head>
                <meta charSet="utf-8" />
                <title>{title} | Investment-Hub</title>
            </Head>
            {showNavBar && <PortalNavBar />}
            <div className="wrapper-site">
                <div className="page-wrapper">{children}</div>
            </div>
        </Fragment>
    );
};
