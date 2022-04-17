import { MainLayout } from "../../../layouts/MainLayout";
import { AdminLayout } from "../../../layouts/AdminLayout";
import { useTranslation } from "react-i18next";
import { Container, Divider } from "@mui/material";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { HeaderSection } from "../../../modules/admin/components/header-section/HeaderSection";
import { fetchEntityList } from "../../../redux/actions/adminActions";
import { AdminArticlesList } from "../../../modules/admin/sections/articles/admin-articles-list/AdminArticlesList";
import { Entity } from "../../../ts/enums/other.enums";

const ArticlesAdminPage = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchEntityList(Entity.Article, 0));
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
export default ArticlesAdminPage;
