import React, { Fragment } from "react";
import { LoadArticleItems } from "./load-article-items/LoadArticleItems";
import { ArticleItem } from "./article-item/ArticleItem";
import { Divider, Grid, IconButton, Typography } from "@mui/material";
import { ArticleModel } from "../../../ts/types/entity/article.types";
import { Card } from "antd";
import classes from "../Smart.module.scss";
import { useTranslation } from "react-i18next";
import { RightCircleOutlined } from "@ant-design/icons";
import { LinkWrapper } from "../../simple/link/Link";
import styles from "./ArticleList.module.scss";

interface ArticleList {
    popular: ArticleModel[];
    simple: ArticleModel[];
}

export const ArticleList: React.FC<ArticleList> = ({ popular, simple }) => {
    const { t } = useTranslation();
    return (
        <Fragment>
            <div className={styles.articlesTitle}>{t("Popular articles")}</div>
            <div className={styles.popularWrapper}>
                {popular ? (
                    popular.map((article) => (
                        <Grid key={article.article_id} xs={12} item sm={4}>
                            <ArticleItem item={article} />
                        </Grid>
                    ))
                ) : (
                    <LoadArticleItems count={3} height={306} sm={4} />
                )}
            </div>
        </Fragment>
    );
};
