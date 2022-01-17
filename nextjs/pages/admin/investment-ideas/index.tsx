import { NextPage } from "next";
import { MainLayout } from "../../../layouts/MainLayout";
import { AdminLayout } from "../../../layouts/AdminLayout";
import { useTranslation } from "react-i18next";

const InvestmentIdeas: NextPage = () => {
    const { t } = useTranslation();
    return (
        <MainLayout title={t("Investment ideas")}>
            <AdminLayout>Aga</AdminLayout>
        </MainLayout>
    );
};
export default InvestmentIdeas;
