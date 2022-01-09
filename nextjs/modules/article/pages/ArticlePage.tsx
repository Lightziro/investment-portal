import React from "react";
import { Container, Divider, Paper } from "@mui/material";
import { Col, Row } from "react-bootstrap";
import { ArticleHeader } from "../components/article-header/ArticleHeader";
import { useSelector } from "react-redux";
import { StoreData } from "../../../ts/types/redux/store.types";
import { createArticleComment } from "../../../redux/actions/articleArtions";
import { CommentsList } from "../../../components/smart/comments-list/CommentsList";

export const ArticlePage: React.FC = () => {
    const article = useSelector((store: StoreData) => store.view.article);
    console.log("STATE");
    console.log(article);
    return (
        <Container maxWidth="xl">
            <Row>
                <Col md={8} lg={9}>
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
                        {/*<ArticleContent*/}
                        {/*    preview={article.preview}*/}
                        {/*    content={article.content}*/}
                        {/*/>*/}
                        {/*<AboutAuthor author={article.author} />*/}
                    </Paper>
                </Col>
                <Col md={4} lg={3}>
                    <Row>
                        <Col>
                            <CommentsList
                                entityId={article.articleId}
                                entityName="article"
                                callbackEnter={createArticleComment}
                                comments={article.comments}
                            />
                        </Col>
                    </Row>
                    {/*<Grid item direction="column">*/}
                    {/*    <NewsPortalList />*/}
                    {/*</Grid>*/}
                </Col>
            </Row>
        </Container>
    );
};
