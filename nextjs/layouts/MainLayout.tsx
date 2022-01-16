import React, { useEffect, Fragment } from "react";
import Head from "next/head";
import { useDispatch } from "react-redux";
import { getUser } from "../redux/actions/userActions";
interface MainLayout {
    title: string;
}
export const MainLayout: React.FC<MainLayout> = ({ title, children }) => {
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
            {children}
        </Fragment>
    );
};
