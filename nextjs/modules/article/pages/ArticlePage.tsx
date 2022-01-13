import React from "react";
import { Container, Divider, Grid, Paper } from "@mui/material";
import { ArticleHeader } from "../components/article-header/ArticleHeader";
import { createArticleComment } from "../../../redux/actions/articleArtions";
import { CommentsList } from "../../../components/smart/comments-list/CommentsList";
import { NewsList } from "../../../components/ordinary/news-list/NewsList";
import { ArticleContent } from "../components/article-content/ArticleContent";
import { AboutAuthor } from "../components/about-author/AboutAuthor";
import { useRootSelector } from "../../../hooks/useTypeSelector";

export const ArticlePage: React.FC = () => {
    const article = useRootSelector((store) => store.view.article);
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
                        <CommentsList
                            entityId={article.articleId}
                            entityName="article"
                            callbackEnter={createArticleComment}
                            comments={article.comments}
                        />
                    </Grid>
                    <Grid item direction="column">
                        <NewsList />
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
};
