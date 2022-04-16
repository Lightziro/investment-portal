import React from "react";
import { Grid } from "@mui/material";
import { ArticleModel } from "../../../ts/types/entity/article.types";
import { sortBy } from "../../../utils/api/get-data";
import { Entity } from "../../../ts/enums/other.enums";
import classes from "../Portal.module.scss";
import { HeaderAllIdeas } from "../components/header-entity-panel/HeaderEntityPanel";
import { SORT_ARTICLES } from "../../../config/menu-items";
import ArticleList from "../components/article-list/ArticleList";

interface AllArticlePage {
    setArticle: (val) => void;
    items: ArticleModel[];
}
export const AllArticlePage: React.FC<AllArticlePage> = ({
    setArticle,
    items,
}) => {
    const handleSortBy = async (value) => {
        setArticle(null);
        const article = await sortBy(Entity.Article, value);
        setArticle(article);
    };

    return (
        <Grid container direction="column" justifyContent="center">
            <HeaderAllIdeas
                handleChange={handleSortBy}
                defaultSelectValue="article_id"
                selectItems={SORT_ARTICLES}
                entity={Entity.Article}
                showButtonMode={false}
            />
            <Grid
                container
                className={classes.wrapperItems}
                justifyContent="center"
                direction="row"
                spacing={2}
            >
                <ArticleList articles={items} />
            </Grid>
        </Grid>
    );
};
