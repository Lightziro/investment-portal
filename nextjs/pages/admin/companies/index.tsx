import { MainLayout } from "../../../layouts/MainLayout";
import { AdminLayout } from "../../../layouts/AdminLayout";
import { useTranslation } from "react-i18next";
import { Container, Divider } from "@mui/material";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { HeaderSection } from "../../../modules/admin/components/header-section/HeaderSection";
import { fetchEntityList } from "../../../redux/actions/adminActions";
import { AdminEntity } from "../../../redux/ts/enums/admin/admin.enum";
import { AdminArticlesList } from "../../../modules/admin/sections/articles/admin-articles-list/AdminArticlesList";

const Companies = () => {
    // TODO: Create companies crud
    const { t } = useTranslation();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchEntityList(AdminEntity.Company, 0));
    }, []);
    return (
        <MainLayout title={t("Investment ideas")}>
            <AdminLayout>
                <Container maxWidth="xl">
                    <HeaderSection
                        urlRedirect="/admin/articles/create-article"
                        textButton="Create article"
                        previewText="Stats articles"
                    />
                    <Divider />
                    <AdminArticlesList />
                </Container>
            </AdminLayout>
        </MainLayout>
    );
};
export default Companies;
