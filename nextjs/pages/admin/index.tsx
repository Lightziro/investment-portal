import { NextPage } from "next";
import { AdminLayout } from "../../layouts/AdminLayout";
import { MainLayout } from "../../layouts/MainLayout";
import { useTranslation } from "react-i18next";
import { Container } from "@mui/material";
import { AdminCardStats } from "../../modules/admin/components/admin-card-stats/AdminCardStats";

export const Index: NextPage = () => {
    const { t } = useTranslation();
    return (
        <MainLayout title={t("Admin panel")}>
            <AdminLayout>ss</AdminLayout>
        </MainLayout>
    );
};
export default Index;
