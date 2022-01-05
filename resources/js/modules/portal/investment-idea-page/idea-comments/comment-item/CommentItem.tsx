import React from "react";
import { IdeaComment } from "../../../../../../../nextjs/ts/types/redux/store.types";
import { Avatar, Stack, Typography, Divider, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { stringAvatar } from "../../../../../utils/string-avatar";
import { ArticleComment } from "../../../../../../../nextjs/ts/types/state/article.types";
interface CommentItem {
    comment: IdeaComment | ArticleComment;
}
export const CommentItem: React.FC<CommentItem> = ({ comment }) => {
    const { i18n } = useTranslation();
    moment.locale(i18n.language);
    return (
        <Stack sx={{ my: 1 }} direction="row">
            <Link to={`/profile/${comment.userId}`}>
                {comment.avatar ? (
                    <Avatar
                        src={`/image/${comment.avatar}`}
                        variant="rounded"
                    />
                ) : (
                    <Avatar
                        variant="rounded"
                        {...stringAvatar(comment.fullNameAuthor)}
                    />
                )}
            </Link>
            <Stack ml={1} justifyContent="flex-start">
                <Grid className="comment-idea-info">
                    <span className="author-comment">
                        <Link to={`/profile/${comment.userId}`}>
                            {comment.fullNameAuthor}
                        </Link>
                    </span>
                    <span className="date-comment">
                        {moment(comment.date).fromNow()}
                    </span>
                </Grid>
                <Divider />
                <Typography variant="body2">{comment.comment}</Typography>
            </Stack>
        </Stack>
    );
};
