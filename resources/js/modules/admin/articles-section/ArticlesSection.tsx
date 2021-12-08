import React, { useEffect, useState } from "react";
import { Button, Container, Divider, Stack, Typography } from "@mui/material";
import { Icon } from "@iconify/react";
import { CreateArticle } from "./create-article/CreateArticle";
import { useDispatch } from "react-redux";
import { fetchArticlesForAdmin } from "../../../redux/actions/articleArtions";
import { ArticleListAdmin } from "./article-list-admin/ArticleListAdmin";
import { setArticleDialog } from "../../../redux/actions/adminActions";

export const ArticlesSection: React.FC = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchArticlesForAdmin(0));
    }, []);
    return (
        <Container maxWidth="xl">
            <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                mb={5}
            >
                <Typography variant="h4" gutterBottom>
                    Stats articles
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<Icon icon="ant-design:plus-outlined" />}
                    onClick={() => dispatch(setArticleDialog())}
                >
                    Create article
                </Button>
            </Stack>
            <Divider />
            <ArticleListAdmin />
            <CreateArticle />
        </Container>
    );
};
