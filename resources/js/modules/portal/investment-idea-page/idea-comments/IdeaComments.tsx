import React, { useState } from "react";
import { Avatar, Card, Divider, Stack, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { StoreData } from "../../../../ts/types/redux/store.types";
import { useTranslation } from "react-i18next";
import { Form } from "react-bootstrap";
import { createComment } from "../../../../redux/actions/investmentIdeaActions";
import { CommentItem } from "./comment-item/CommentItem";

export const IdeaComments = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { ideaId } = useSelector((state: StoreData) => state.main.ideaView);
    const [value, setValue] = useState("");
    const comments = useSelector(
        (state: StoreData) => state.main.ideaView.comments
    );
    if (!comments) {
        return null;
    }
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && value.trim()) {
            dispatch(createComment(ideaId, value));
            setValue("");
        }
    };
    return (
        <Card sx={{ bgcolor: "white", p: 1 }} className="shadow-wrapper">
            <Typography variant="h6">{t("Comments")}</Typography>
            <Divider />
            <Stack justifyContent="flex-start" my={1}>
                <Form.Control
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder="Enter comment"
                    onKeyDown={handleKeyDown}
                />
                {comments.map((comment) => (
                    <CommentItem comment={comment} />
                ))}
            </Stack>
        </Card>
    );
};
