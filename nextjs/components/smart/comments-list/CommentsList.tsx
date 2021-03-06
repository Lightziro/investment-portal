import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Card, Divider, Skeleton, Stack, Typography } from "@mui/material";
import { Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { CommentItem } from "./comment-item/CommentItem";
import classes from "./CommentsList.module.scss";
import { NoComments } from "./no-comments/NoComments";
import { useRootSelector } from "../../../hooks/useTypeSelector";
import { Comment, EntityName } from "../../../ts/types/other/view.types";
import { createEntityComment } from "../../../redux/actions/viewActions";
import {Entity} from "../../../ts/enums/other.enums";
interface CommentsWrapper {
    entityId: number;
    entityName: Entity;
    comments: Comment[];
}
export const CommentsList: React.FC<CommentsWrapper> = ({
    entityId,
    entityName,
    comments,
}) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [value, setValue] = useState("");
    const { data } = useRootSelector((state) => state.user);
    const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && value.trim() && data) {
            dispatch(createEntityComment(entityId, entityName, value));
            setValue("");
        }
    };
    if (!comments) {
        return <Skeleton variant="rectangular" height={400} />;
    }
    return (
        <Card sx={{ bgcolor: "white", p: 2 }} className="shadow-wrapper w-100">
            <Typography variant="h6">{t("Comments")}</Typography>
            <Divider className="mb-2" />
            <Form.Control
                type="textarea"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder={
                    !data ? t("Log in and send comment") : t("Enter comment")
                }
                onKeyDown={handleKeyDown}
                disabled={!data}
            />
            <Stack justifyContent="flex-start" className={classes.commentsArea}>
                {comments.length ? (
                    comments.map((comment, i) => (
                        <CommentItem
                            key={comment.comment_id}
                            comment={comment}
                        />
                    ))
                ) : (
                    <NoComments />
                )}
            </Stack>
        </Card>
    );
};
