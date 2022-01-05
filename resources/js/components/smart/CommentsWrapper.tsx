import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    IdeaComment,
    StoreData,
} from "../../../../nextjs/ts/types/redux/store.types";
import { ArticleComment } from "../../../../nextjs/ts/types/state/article.types";
import { Card, Divider, Stack, Typography } from "@mui/material";
import { Form } from "react-bootstrap";
import { CommentItem } from "../../modules/portal/investment-idea-page/idea-comments/comment-item/CommentItem";
import { NoCommentsIdea } from "../../modules/portal/investment-idea-page/idea-comments/no-comments/NoCommentsIdea";
import { useTranslation } from "react-i18next";
interface CommentsWrapper {
    entityId: number;
    entityName: string;
    callbackEnter: (entityId: number, value: string) => any;
    comments: ArticleComment[] | IdeaComment[];
}
export const CommentsWrapper: React.FC<CommentsWrapper> = ({
    entityId,
    entityName,
    callbackEnter,
    comments,
}) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [value, setValue] = useState("");
    const user = useSelector((state: StoreData) => state.main.user);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && value.trim() && user) {
            dispatch(callbackEnter(entityId, value));
            setValue("");
        }
    };
    if (!comments) {
        return null;
    }
    return (
        <Card sx={{ bgcolor: "white", p: 2 }} className="shadow-wrapper">
            <Typography variant="h6">{t("Comments")}</Typography>
            <Divider />
            <Form.Control
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder={
                    !user ? "Log in and send comment" : "Enter comment"
                }
                onKeyDown={handleKeyDown}
                disabled={!user}
            />
            <Stack justifyContent="flex-start" className="comments-area">
                {comments.length ? (
                    comments.map((comment) => <CommentItem comment={comment} />)
                ) : (
                    <NoCommentsIdea />
                )}
            </Stack>
        </Card>
    );
};
