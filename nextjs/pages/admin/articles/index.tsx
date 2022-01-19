import { MainLayout } from "../../../layouts/MainLayout";
import { AdminLayout } from "../../../layouts/AdminLayout";
import { useTranslation } from "react-i18next";
import { Icon } from "@iconify/react";
import { Button, Container, Divider, Stack, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { ArticleListAdmin } from "../../../modules/admin/components/article-list-admin/ArticleListAdmin";
import { fetchArticlesAdminList } from "../../../redux/actions/admin/adminArticleActions";

const ArticlesAdminPage = () => {
    const { t } = useTranslation();
    const router = useRouter();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchArticlesAdminList(0));
    }, []);
    return (
        <MainLayout title={t("Investment ideas")}>
            <AdminLayout>
                <Container maxWidth="xl">
                    <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                        mb={2}
                    >
                        <Typography variant="h4" gutterBottom>
                            Stats articles
                        </Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<Icon icon="ant-design:plus-outlined" />}
                            onClick={() =>
                                router.push("/admin/articles/create-article")
                            }
                        >
                            Create article
                        </Button>
                    </Stack>
                    <Divider />
                    <ArticleListAdmin />
                </Container>
            </AdminLayout>
        </MainLayout>
    );
};
export default ArticlesAdminPage;
