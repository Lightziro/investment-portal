import React, { Fragment } from "react";
import { useTranslation } from "react-i18next";
import { ArticleModel } from "../../../../ts/types/entity/article.types";
import { LinkWrapper } from "../../../../components/simple/link/Link";
import { Card } from "antd";
import { Avatar, Grid } from "@mui/material";
const { Meta } = Card;

interface ArticleList {
    articles: ArticleModel[];
}

const ArticleList: React.FC<ArticleList> = ({ articles }) => {
    const { t } = useTranslation();

    const descriptionIdea = (article: ArticleModel) => {
        return `${t("Author")}: ${article.author.full_name}`;
    };
    return (
        <Fragment>
            {articles ? (
                articles.map((article) => (
                    <Grid xl={3} lg={4} md={6} sm={6} xs={12} item>
                        <LinkWrapper
                            href={`/investment-idea/${article.article_id}`}
                        >
                            {/*<Card*/}
                            {/*    key={article.article_id}*/}
                            {/*    style={{ marginTop: 16 }}*/}
                            {/*>*/}
                            {/*    <Meta*/}
                            {/*        avatar={*/}
                            {/*            <Avatar*/}
                            {/*                src={`${process.env.API_URL}/storage/${article.author.avatar_path}`}*/}
                            {/*            />*/}
                            {/*        }*/}
                            {/*        title={`${t("Article")} ${article.title}`}*/}
                            {/*        description={descriptionIdea(article)}*/}
                            {/*    />*/}
                            {/*</Card>*/}
                            <Card
                                style={{ width: 300 }}
                                cover={
                                    <img
                                        alt="example"
                                        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                                    />
                                }
                            >
                                <Meta
                                    avatar={
                                        <Avatar src="https://joeschmoe.io/api/v1/random" />
                                    }
                                    title="Card title"
                                    description="This is the description"
                                />
                            </Card>
                        </LinkWrapper>
                    </Grid>
                ))
            ) : (
                <div>S</div>
            )}
        </Fragment>
    );
};
export default ArticleList;
