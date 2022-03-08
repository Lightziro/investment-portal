import { NextPage } from "next";
import { MainLayout } from "../../layouts/MainLayout";
import { PortalLayout } from "../../layouts/PortalLayout";
import { useTranslation } from "react-i18next";

const AllArticle: NextPage = () => {
    const { t } = useTranslation();
    return (
        <MainLayout title={t("Articles")}>
            <PortalLayout>Aga</PortalLayout>
        </MainLayout>
    );
};
export default AllArticle;
