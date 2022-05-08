import { NextPage } from "next";
import { MainLayout } from "../../layouts/MainLayout";
import { useTranslation } from "react-i18next";
import RecoveryUserPage from "../../modules/authorization/pages/recovery/RecoveryUserPage";

const RecoveryUser: NextPage = () => {
    const { t } = useTranslation();
    return (
        <MainLayout title={t("Changing password")}>
            <RecoveryUserPage />
        </MainLayout>
    );
};
export default RecoveryUser;
