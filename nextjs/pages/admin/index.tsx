import { NextPage } from "next";
import { AdminLayout } from "../../layouts/AdminLayout";
import { MainLayout } from "../../layouts/MainLayout";
import { useTranslation } from "react-i18next";

export const Index: NextPage = () => {
    const { t } = useTranslation();
    return (
        <MainLayout title={t("Admin panel")}>
            <AdminLayout>
                <span>Test</span>
            </AdminLayout>
        </MainLayout>
    );
};
export default Index;
