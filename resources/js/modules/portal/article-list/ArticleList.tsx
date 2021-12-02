import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { StoreData } from "../../../ts/types/redux/store.types";
import { Grid, Skeleton } from "@mui/material";
import { ArticleItem } from "./article-item/ArticleItem";
import { useTranslation } from "react-i18next";
import { LoadArticleItems } from "./load-article-items/LoadArticleItems";

export const ArticleList: React.FC = () => {
    const { popular, simple } = useSelector(
        (state: StoreData) => state.main.articles
    );
    return (
        <Fragment>
            <Grid justifyContent="center" container direction="row" spacing={3}>
                {popular ? (
                    popular.map((article) => (
                        <Grid item sm={4}>
                            <ArticleItem item={article} />
                        </Grid>
                    ))
                ) : (
                    <LoadArticleItems count={3} height={306} sm={4} />
                )}
            </Grid>
            <Grid
                justifyContent="center"
                mt={2}
                container
                direction="row"
                spacing={3}
            >
                {simple ? (
                    simple.map((article) => <div>{article.title}</div>)
                ) : (
                    <LoadArticleItems sm={3} count={8} height={206} />
                )}
            </Grid>
        </Fragment>
    );
};
