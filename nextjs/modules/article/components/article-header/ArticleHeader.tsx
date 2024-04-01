import React from "react";
import {ArticleLabel, ArticleModel} from "../../../../ts/types/entity/article.types";
import {Paper, Skeleton, Grid} from "@mui/material";
import moment from "moment";
import classes from "../../Article.module.scss";
import {LabelList} from "../label-list/LabelList";
import {LinkWrapper} from "../../../../components/simple/link/Link";
import {UserAvatar} from "../../../../components/simple/user-avatar/UserAvatar";

interface ArticleHeader {
    article: ArticleModel;
}

export const ArticleHeader: React.FC<ArticleHeader> = ({
                                                           article,
                                                       }) => {
    const {title, labels, dateCreate, author} = article
    return (
        <Grid container direction="column" justifyContent="flex-start">
            <div className={classes.headerInfoWrapper}>
                <span>{moment(dateCreate).format("D MMM, YYYY")}</span>
                <LabelList labels={labels}/>
            </div>
            <div>
                <LinkWrapper
                    href={`/profile/[id]`}
                    as={`/profile/${author.user_id}`}
                >
                    <UserAvatar
                        avatar={author.avatar_path}
                        width={30}
                        height={30}
                    />
                </LinkWrapper>
                <LinkWrapper
                    href={`/profile/[id]`}
                    as={`/profile/${author.user_id}`}
                >
                    <span className={classes.name}>{author.full_name}</span>
                </LinkWrapper>
            </div>
            {title ? (
                <h1 className={classes.articleTitle}>{title}</h1>
            ) : (
                <Skeleton height={150} variant={"text"}/>
            )}
        </Grid>
    );
};
