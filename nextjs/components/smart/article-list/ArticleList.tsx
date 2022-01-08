import React from "react";
import { useSelector } from "react-redux";
import { StoreData } from "../../../ts/types/redux/store.types";
import { LoadArticleItems } from "./load-article-items/LoadArticleItems";
import { Col, Row } from "react-bootstrap";
import { ArticleItem } from "./article-item/ArticleItem";

export const ArticleList: React.FC = () => {
    const { popular, simple } = useSelector(
        (state: StoreData) => state.main.articles
    );
    console.log(process.browser);
    console.log("POPULAR", popular);
    return (
        <Row>
            {popular ? (
                popular.map((article) => (
                    <Col key={article.articleId} xs={12} sm={4}>
                        <ArticleItem item={article} />
                    </Col>
                ))
            ) : (
                <LoadArticleItems count={3} height={306} sm={4} />
            )}
            {/*<Grid*/}
            {/*    justifyContent="center"*/}
            {/*    mt={2}*/}
            {/*    container*/}
            {/*    direction="row"*/}
            {/*    spacing={3}*/}
            {/*>*/}
            {/*    {simple ? (*/}
            {/*        simple.map((article) => (*/}
            {/*            <Grid*/}
            {/*                key={article.articleId}*/}
            {/*                xs={6}*/}
            {/*                md={4}*/}
            {/*                lg={4}*/}
            {/*                xl={3}*/}
            {/*                item*/}
            {/*                sm={6}*/}
            {/*            >*/}
            {/*                <ArticleItem item={article} />*/}
            {/*            </Grid>*/}
            {/*        ))*/}
            {/*    ) : (*/}
            {/*        <LoadArticleItems sm={3} count={8} height={206} />*/}
            {/*    )}*/}
            {/*</Grid>*/}
        </Row>
    );
};
