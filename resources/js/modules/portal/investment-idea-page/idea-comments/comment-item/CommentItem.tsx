import React from "react";
import { IdeaComment } from "../../../../../ts/types/redux/store.types";
import { Avatar, Stack, Typography } from "@mui/material";
interface CommentItem {
    comment: IdeaComment;
}
export const CommentItem: React.FC<CommentItem> = ({ comment }) => {
    return (
        <Stack sx={{ my: 1 }} direction="row">
            <Avatar src={`/image/${comment.avatar}`} variant="rounded" />
            <Typography sx={{ ml: 1 }} variant="body2">
                {comment.comment}
            </Typography>
        </Stack>
    );
};
