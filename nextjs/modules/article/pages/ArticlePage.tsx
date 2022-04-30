import React, { useEffect } from "react";
import { Container, Divider, Grid, Paper } from "@mui/material";
import { ArticleHeader } from "../components/article-header/ArticleHeader";
import { CommentsList } from "../../../components/smart/comments-list/CommentsList";
import { NewsList } from "../../../components/ordinary/news-list/NewsList";
import { ArticleContent } from "../components/article-content/ArticleContent";
import { AboutAuthor } from "../components/about-author/AboutAuthor";
import { News } from "../../../ts/types/entity/stock-market.types";
import { useDispatch } from "react-redux";
import { setViewEntity } from "../../../redux/actions/viewActions";
import { useRootSelector } from "../../../hooks/useTypeSelector";
import { ArticleModel } from "../../../ts/types/entity/article.types";
import {
    fetchArticleComments,
    fetchArticleEmotions,
    fetchArticleLabels,
} from "../../../redux/actions/articleArtions";
import { ArticleEmotion } from "../components/article-emotion/ArticleEmotion";

interface ArticlePage {
    article: ArticleModel;
    news: News[];
}

export const ArticlePage: React.FC<ArticlePage> = ({ article, news }) => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setViewEntity(article, "article"));
        dispatch(fetchArticleComments(article.article_id));
        dispatch(fetchArticleLabels(article.article_id));
        dispatch(fetchArticleEmotions(article.article_id));
    }, []);
    const { comments, labels } = useRootSelector((store) => store.view.article);
    return (
        <Container maxWidth="xl">
            <Grid container spacing={3}>
                <Grid md={8} item lg={9}>
                    <Paper
                        elevation={3}
                        sx={{ mb: 2, py: 3, px: 3, background: "white" }}
                    >
                        <ArticleHeader
                            title={article.title}
                            labels={labels}
                            dateCreate={article.created_at}
                        />
                        <Divider />
                        <ArticleContent
                            preview={article.preview_path}
                            content={article.content}
                        />
                    </Paper>
                    <Grid spacing={3} container>
                        <Grid sm={12} xs={12} md={6} item lg={6}>
                            <AboutAuthor author={article.author} />
                        </Grid>
                        <Grid sm={12} md={6} xs={12} item lg={6}>
                            <ArticleEmotion articleId={article.article_id} />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid
                    container
                    direction="column"
                    item
                    md={4}
                    lg={3}
                    spacing={2}
                >
                    <Grid item direction="column">
                        <CommentsList
                            entityId={article.article_id}
                            entityName="article"
                            comments={comments}
                        />
                    </Grid>
                    <Grid item direction="column">
                        <NewsList items={news} />
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
};
