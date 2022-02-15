import React from "react";
import { Grid } from "@mui/material";
import Link from "next/link";
import { UserAvatar } from "../../../../components/simple/user-avatar/UserAvatar";
import classes from "../../Article.module.scss";
import { UserModel } from "../../../../ts/types/entity/user.types";

interface AboutAuthor {
    author: UserModel;
}

export const AboutAuthor: React.FC<AboutAuthor> = ({ author }) => {
    if (!author) {
        return null;
    }
    return (
        <Grid className={classes.authorWrapper} container direction="row">
            <Link href={`/profile/[id]`} as={`/profile/${author.user_id}`}>
                <UserAvatar
                    avatar={author.avatar_path}
                    width={120}
                    height={120}
                />
            </Link>
            <div className={classes.authorArticleInfo}>
                <Link href={`/profile/[id]`} as={`/profile/${author.user_id}`}>
                    <span className={classes.name}>{author.full_name}</span>
                </Link>
            </div>
        </Grid>
    );
};
