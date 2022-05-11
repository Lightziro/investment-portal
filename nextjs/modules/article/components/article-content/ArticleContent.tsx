import React from "react";
import { Grid, Skeleton } from "@mui/material";
import classes from "../../Article.module.scss";

interface ArticleContent {
    preview: string;
    content: string;
}

export const ArticleContent: React.FC<ArticleContent> = ({
    preview,
    content,
}) => {
    return (
        <Grid container direction="column">
            {preview && (
                <div className={classes.wrapperArticlePreview}>
                    <img
                        src={`${process.env.API_URL}/storage/${preview}`}
                        className={classes.preview}
                    />
                </div>
            )}
            {content ? (
                <div
                    className="article-content"
                    dangerouslySetInnerHTML={{ __html: content }}
                />
            ) : (
                <Skeleton variant={"rectangular"} height={800} />
            )}
        </Grid>
    );
};
