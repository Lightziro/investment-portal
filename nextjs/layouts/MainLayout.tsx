import React, { useEffect, Fragment } from "react";
import Head from "next/head";
import { useDispatch } from "react-redux";
import { getUser } from "../redux/actions/userActions";
import { useRootSelector } from "../hooks/useTypeSelector";
import useAuh from "../hooks/useAuh";
interface MainLayout {
    title: string;
    children: React.ReactNode;
}
export const MainLayout: React.FC<MainLayout> = ({ title, children }) => {
    const dispatch = useDispatch();
    const { fetch } = useRootSelector((state) => state.user);
    const {} = useAuh();
    // useEffect(() => {
    //     if (!fetch) {
    //         dispatch(getUser());
    //     }
    // }, []);
    return (
        <Fragment>
            <Head>
                <meta charSet="utf-8" />
                <title>{title} | Investment-Hub</title>
            </Head>
            {fetch && children}
        </Fragment>
    );
};
