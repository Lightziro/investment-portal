import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { StoreData } from "../../../../../nextjs/ts/types/redux/store.types";
import {
    createArticleComment,
    fetchArticleView,
} from "../../../../../nextjs/redux/actions/articleArtions";
import {
    Collapse,
    Container,
    Divider,
    Grid,
    Paper,
    Skeleton,
} from "@mui/material";
import { clearView } from "../../../../../nextjs/redux/actions/mainActions";
import { ArticleHeader } from "./article-header/ArticleHeader";
import { ArticleContent } from "./article-content/ArticleContent";
import { AboutAuthor } from "./article-content/about-author/AboutAuthor";
import { CommentsWrapper } from "../../../components/smart/CommentsWrapper";
import { NewsPortalList } from "../../../components/news-list/NewsPortalList";

export const ArticlePage: React.FC = () => {
    const article = useSelector((state: StoreData) => state.view.article);
    const { articleId } = useParams();
    const dispatch = useDispatch();
    useEffect(() => {
        if (article.articleId !== Number(articleId)) {
            dispatch(clearView("article"));
            dispatch(fetchArticleView(Number(articleId)));
        }
    }, []);
    return (
        <Container maxWidth="xl">
            <Grid container spacing={3}>
                <Grid md={8} item lg={9}>
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
                </Grid>
                <Grid
                    container
                    direction="column"
                    item
                    md={4}
                    lg={3}
                    spacing={2}
                >
                    <Grid item>
                        <CommentsWrapper
                            entityId={article.articleId}
                            entityName="article"
                            callbackEnter={createArticleComment}
                            comments={article.comments}
                        />
                    </Grid>
                    <Grid item direction="column">
                        <NewsPortalList />
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
};
