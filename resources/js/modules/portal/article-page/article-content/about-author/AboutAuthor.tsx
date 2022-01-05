import React from "react";
import { Avatar, Grid, Stack } from "@mui/material";
import { ArticleAuthor } from "../../../../../../../nextjs/ts/types/state/article.types";
import { Link } from "react-router-dom";
interface AboutAuthor {
    author: ArticleAuthor;
}
export const AboutAuthor: React.FC<AboutAuthor> = ({ author }) => {
    if (!author) {
        return null;
    }
    return (
        <Grid className="author-wrapper" container direction="row">
            <Link to={`/profile/${author.userId}`}>
                <Avatar
                    src={`/image/${author.avatar}`}
                    sx={{ width: 120, height: 120 }}
                />
            </Link>
            <div className="author-article-info">
                <Link to={`/profile/${author.userId}`}>
                    <span className="name">{author.fullName}</span>
                </Link>
            </div>
        </Grid>
    );
};
