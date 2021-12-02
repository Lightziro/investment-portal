import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { StoreData } from "../../../ts/types/redux/store.types";
import { fetchArticleView } from "../../../redux/actions/articleArtions";
import { Container, Divider, Paper, Skeleton } from "@mui/material";
import { clearView } from "../../../redux/actions/mainActions";
import { LabelList } from "./article-header/label-list/LabelList";
import { ArticleHeader } from "./article-header/ArticleHeader";

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
                <div className="wrapper-article-preview">
                    <img
                        className="preview"
                        src={`/image/preview/${article.preview}`}
                    />
                </div>
                <div
                    className="article-content"
                    dangerouslySetInnerHTML={{ __html: article.content }}
                />
            </Paper>
        </Container>
    );
};
