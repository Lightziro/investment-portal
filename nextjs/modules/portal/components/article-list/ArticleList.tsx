import React, { Fragment } from "react";
import { useTranslation } from "react-i18next";
import { ArticleModel } from "../../../../ts/types/entity/article.types";
import { LinkWrapper } from "../../../../components/simple/link/Link";
import { Card } from "antd";
import { Avatar, Grid } from "@mui/material";
import { Skeleton } from "@mui/material";
const { Meta } = Card;

interface ArticleList {
    articles: ArticleModel[];
}

const ArticleList: React.FC<ArticleList> = ({ articles }) => {
    const { t } = useTranslation();

    const description = (article: ArticleModel) => {
        return `${t("Author")}: ${article.author.full_name}`;
    };
    return (
        <Fragment>
            {articles
                ? articles.map((article) => (
                      <Grid xl={3} lg={4} md={6} sm={6} xs={12} item>
                          <LinkWrapper href={`/article/${article.article_id}`}>
                              <Card
                                  cover={
                                      <img
                                          src={`${process.env.API_URL}/storage/${article.preview_path}`}
                                      />
                                  }
                              >
                                  <Meta
                                      avatar={
                                          <Avatar
                                              src={`${process.env.API_URL}/storage/${article.author.avatar_path}`}
                                          />
                                      }
                                      title={article.title}
                                      description={description(article)}
                                  />
                              </Card>
                          </LinkWrapper>
                      </Grid>
                  ))
                : Array(30)
                      .fill(0)
                      .map((item, index) => (
                          <Grid
                              key={index}
                              xl={3}
                              lg={4}
                              md={6}
                              sm={6}
                              xs={12}
                              height={360}
                              item
                          >
                              <Skeleton height="100%" />
                          </Grid>
                      ))}
        </Fragment>
    );
};
export default ArticleList;
