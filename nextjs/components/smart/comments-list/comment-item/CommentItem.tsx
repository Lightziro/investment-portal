import React from "react";
import { Avatar, Typography, Divider, Grid, Stack } from "@mui/material";
import Link from "next/link";
import moment from "moment";
import { useTranslation } from "react-i18next";
import classes from "../CommentsList.module.scss";
import { Comment } from "../../../../ts/types/other/view.types";
interface CommentItem {
    comment: Comment;
}
export const CommentItem: React.FC<CommentItem> = ({ comment }) => {
    const { i18n } = useTranslation();
    moment.locale(i18n.language);
    return (
        <Stack sx={{ my: 1 }} direction="row">
            <Link href={`/profile/[id]`} as={`/profile/${comment.user_id}`}>
                <Avatar
                    src={`${process.env.API_URL}/storage/${comment.avatar_path}`}
                    variant="rounded"
                />
            </Link>
            <div className="d-flex justify-content-start flex-column ms-2">
                <div className={classes.commentInfo}>
                    <span className={classes.authorComment}>
                        <Link
                            passHref
                            href={`/profile/[id]`}
                            as={`/profile/${comment.user_id}`}
                        >
                            <span>{comment.full_name}</span>
                        </Link>
                    </span>
                    <span className={classes.dateComment}>
                        {moment(comment.created_at).fromNow()}
                    </span>
                </div>
                <Divider />
                <Typography variant="body2">{comment.comment}</Typography>
            </div>
        </Stack>
    );
};
