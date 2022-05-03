import { NextPage } from "next";
import { AdminLayout } from "../../layouts/AdminLayout";
import { MainLayout } from "../../layouts/MainLayout";
import { useTranslation } from "react-i18next";
import { useRootSelector } from "../../hooks/useTypeSelector";
import Router from "next/router";
import { useEffect } from "react";

export const Index: NextPage = () => {
    const { t } = useTranslation();
    const { fetch, data } = useRootSelector((state) => state.user);

    useEffect(() => {
        if (fetch && (!data?.user_id || data?.role !== "admin")) {
            Router.push("/");
        }
    }, [data, fetch]);
    return (
        <MainLayout title={t("Admin panel")}>
            {data && <AdminLayout>ss</AdminLayout>}
        </MainLayout>
    );
};
export default Index;
