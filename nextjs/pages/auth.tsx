import { NextPage } from "next";
import React, { useEffect } from "react";
import { StoreData } from "../ts/types/redux/store.types";
import Router from "next/router";
import { LoginPage } from "../modules/authorization/pages/login/LoginPage";
import { useRootSelector } from "../hooks/useTypeSelector";
import { MainLayout } from "../layouts/MainLayout";

const Auth: NextPage = () => {
    const { fetch, data } = useRootSelector((store: StoreData) => store.user);
    useEffect(() => {
        if (fetch && data) {
            Router.push("/");
        }
    }, [fetch, data]);
    return (
        <MainLayout title="Авторизация">
            <LoginPage />
        </MainLayout>
    );
};

export default Auth;
