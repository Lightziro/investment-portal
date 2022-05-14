import { MainLayout } from "../../../layouts/MainLayout";
import { AdminLayout } from "../../../layouts/AdminLayout";
import { useTranslation } from "react-i18next";
import { Container } from "@mui/material";

const CreateCompany = () => {
    const { t } = useTranslation();

    return (
        <MainLayout title={t("Companies")}>
            <AdminLayout>
                <Container maxWidth="sm">Basick</Container>
            </AdminLayout>
        </MainLayout>
    );
};
export default CreateCompany;
