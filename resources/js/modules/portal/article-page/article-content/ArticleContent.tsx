import React from "react";
import { Grid, Skeleton } from "@mui/material";
interface ArticleContent {
    preview: string;
    content: string;
}
export const ArticleContent: React.FC<ArticleContent> = ({
    preview,
    content,
}) => {
    return (
        <Grid direction="column">
            <div className="wrapper-article-preview">
                {preview ? (
                    <img
                        className="preview"
                        src={`/image/preview/${preview}`}
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
