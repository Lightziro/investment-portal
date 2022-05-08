import { NextPage } from "next";
import React, { useEffect } from "react";
import { StoreData } from "../ts/types/redux/store.types";
import Router from "next/router";
import { useRootSelector } from "../hooks/useTypeSelector";
import { MainLayout } from "../layouts/MainLayout";
import { ForgotPasswordPage } from "../modules/authorization/pages/forgot-password/ForgotPasswordPage";
import { useTranslation } from "react-i18next";

const ForgotPassword: NextPage = () => {
    const { t } = useTranslation();
    const { fetch, data } = useRootSelector((store: StoreData) => store.user);
    useEffect(() => {
        if (fetch && data) {
            Router.push("/");
        }
    }, [fetch, data]);
    if (!fetch) {
        return null;
    }
    return (
        <MainLayout title={t("Password Recovery")}>
            <ForgotPasswordPage />
        </MainLayout>
    );
};

export default ForgotPassword;
