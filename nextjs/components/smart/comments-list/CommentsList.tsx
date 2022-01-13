import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Divider, Stack, Typography } from "@mui/material";
import { Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { ArticleComment } from "../../../ts/types/state/article.types";
import { IdeaComment, StoreData } from "../../../ts/types/redux/store.types";
import { CommentItem } from "./comment-item/CommentItem";
import classes from "./CommentsList.module.scss";
import { NoComments } from "./no-comments/NoComments";
interface CommentsWrapper {
    entityId: number;
    entityName: string;
    callbackEnter: (entityId: number, value: string) => any;
    comments: ArticleComment[] | IdeaComment[];
}
export const CommentsList: React.FC<CommentsWrapper> = ({
    entityId,
    entityName,
    callbackEnter,
    comments,
}) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [value, setValue] = useState("");
    const user = useSelector((state: StoreData) => state.user);

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
            <Stack justifyContent="flex-start" className={classes.commentsArea}>
                {comments.length ? (
                    comments.map((comment) => <CommentItem comment={comment} />)
                ) : (
                    <NoComments />
                )}
            </Stack>
        </Card>
    );
};
