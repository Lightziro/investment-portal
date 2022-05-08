import React from "react";
import { Stack, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { StoreData } from "../../../../ts/types/redux/store.types";
import classes from "../CommentsList.module.scss";
import { LinkWrapper } from "../../../simple/link/Link";

export const NoComments = () => {
    const { data } = useSelector((state: StoreData) => state.user);
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
            <Typography variant="h6" my={1} align="center">
                {data ? (
                    t("No Comments")
                ) : (
                    <LinkWrapper href="/auth">
                        {t("Log in and send first comment")}
                    </LinkWrapper>
                )}
            </Typography>
        </Stack>
    );
};
