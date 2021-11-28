import React from "react";
import { Stack, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { StoreData } from "../../../../../ts/types/redux/store.types";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export const NoCommentsIdea = () => {
    const user = useSelector((state: StoreData) => state.main.user);
    const { t } = useTranslation();
    return (
        <Stack
            alignItems="center"
            justifyContent="center"
            direction="column"
            my={3}
        >
            <img
                className="no-comments-idea"
                src="/image/picture/other/comments.svg"
            />
            <Typography variant="h6" my={1}>
                {user ? (
                    t("No Comments")
                ) : (
                    <Link to="/auth">{t("Auth and send first comment")}</Link>
                )}
            </Typography>
        </Stack>
    );
};
