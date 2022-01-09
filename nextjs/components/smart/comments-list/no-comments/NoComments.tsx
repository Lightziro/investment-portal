import React from "react";
import { Stack, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import { StoreData } from "../../../../ts/types/redux/store.types";
import classes from "../CommentsList.module.scss";

export const NoComments = () => {
    const user = useSelector((state: StoreData) => state.user);
    const { t } = useTranslation();
    return (
        <Stack
            alignItems="center"
            justifyContent="center"
            direction="column"
            my={3}
        >
            <img
                className={classes.noComments}
                src="/images/picture/other/comments.svg"
            />
            <Typography variant="h6" my={1}>
                {user ? (
                    t("No Comments")
                ) : (
                    <Link href="/auth">{t("Auth and send first comment")}</Link>
                )}
            </Typography>
        </Stack>
    );
};
