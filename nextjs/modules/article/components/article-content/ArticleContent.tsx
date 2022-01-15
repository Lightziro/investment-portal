import React from "react";
import { Grid, Skeleton } from "@mui/material";
interface ArticleContent {
    preview: string;
    content: string;
}
import classes from "../../Article.module.scss";
export const ArticleContent: React.FC<ArticleContent> = ({
    preview,
    content,
}) => {
    return (
        <Grid container direction="column">
            <div className={classes.wrapperArticlePreview}>
                {preview ? (
                    <img
                        src={`${process.env.API_URL}/storage/${preview}`}
                        className={classes.preview}
                    />
                ) : (
                    <Skeleton
                        variant={"rectangular"}
                        height={530}
                        width="100%"
                    />
                )}
            </div>
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
