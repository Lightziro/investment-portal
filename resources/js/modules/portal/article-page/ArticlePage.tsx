import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { StoreData } from "../../../ts/types/redux/store.types";
import { fetchArticleView } from "../../../redux/actions/articleArtions";
import { Container, Divider, Paper, Skeleton } from "@mui/material";
import { clearView } from "../../../redux/actions/mainActions";
import { ArticleHeader } from "./article-header/ArticleHeader";
import { ArticleContent } from "./article-content/ArticleContent";
import { AboutAuthor } from "./article-content/about-author/AboutAuthor";

export const ArticlePage: React.FC = () => {
    const article = useSelector((state: StoreData) => state.view.article);
    const { articleId } = useParams();
    const dispatch = useDispatch();
    useEffect(() => {
        if (article.articleId !== articleId) {
            dispatch(clearView("article"));
            dispatch(fetchArticleView(Number(articleId)));
        }
    }, []);
    return (
        <Container maxWidth="md">
            <Paper
                elevation={3}
                sx={{ mb: 2, py: 3, px: 3, background: "#ebefff" }}
            >
                <ArticleHeader
                    title={article.title}
                    labels={article.labels}
                    dateCreate={article.dateCreate}
                />
                <Divider />
                <ArticleContent
                    preview={article.preview}
                    content={article.content}
                />
                <AboutAuthor author={article.author} />
            </Paper>
        </Container>
    );
};
