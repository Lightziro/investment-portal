import React from "react";
import { Grid } from "@mui/material";
import Link from "next/link";
import { ArticleAuthor } from "../../../../ts/types/state/article.types";
import { UserAvatar } from "../../../../components/simple/user-avatar/UserAvatar";
import classes from "../../Article.module.scss";
interface AboutAuthor {
    author: ArticleAuthor;
}
export const AboutAuthor: React.FC<AboutAuthor> = ({ author }) => {
    if (!author) {
        return null;
    }
    return (
        <Grid className={classes.authorWrapper} container direction="row">
            <Link href={`/profile/[id]`} as={`/profile/${author.userId}`}>
                <UserAvatar user={author.avatar} width={120} height={120} />
            </Link>
            <div className={classes.authorArticleInfo}>
                <Link href={`/profile/[id]`} as={`/profile/${author.userId}`}>
                    <span className={classes.name}>{author.fullName}</span>
                </Link>
            </div>
        </Grid>
    );
};
