import { NextPage } from "next";
import { useTranslation } from "react-i18next";
import { AdminLayout } from "../../../layouts/AdminLayout";
import { MainLayout } from "../../../layouts/MainLayout";
import React from "react";
import { Container } from "@mui/material";
import AdminStats from "../../../modules/admin/pages/admin-stats/AdminStats";

export const Index: NextPage = () => {
    const { t } = useTranslation();

    return (
        <MainLayout title={t("Admin panel")}>
            <AdminLayout>
                <Container maxWidth="xl">
                    <AdminStats />
                </Container>
            </AdminLayout>
        </MainLayout>
    );
};
export default Index;
