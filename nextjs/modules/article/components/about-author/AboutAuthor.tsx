import React from "react";
import { Divider, Grid, Paper, Typography } from "@mui/material";
import Link from "next/link";
import { UserAvatar } from "../../../../components/simple/user-avatar/UserAvatar";
import classes from "../../Article.module.scss";
import { UserModel } from "../../../../ts/types/entity/user.types";
import { LinkWrapper } from "../../../../components/simple/link/Link";
import classnames from "classnames";
import { useTranslation } from "react-i18next";

interface AboutAuthor {
    author: UserModel;
}

export const AboutAuthor: React.FC<AboutAuthor> = ({ author }) => {
    const { t } = useTranslation();
    if (!author) {
        return null;
    }
    return (
        <Paper
            elevation={3}
            sx={{
                py: 2,
                px: 3,
            }}
        >
            <Typography variant="h4">{t("Author")}</Typography>
            <Divider />
            <div className={classes.authorWrapper}>
                <LinkWrapper
                    href={`/profile/[id]`}
                    as={`/profile/${author.user_id}`}
                >
                    <UserAvatar
                        avatar={author.avatar_path}
                        width={64}
                        height={64}
                    />
                </LinkWrapper>
                <div className={classes.authorArticleInfo}>
                    <LinkWrapper
                        href={`/profile/[id]`}
                        as={`/profile/${author.user_id}`}
                    >
                        <span className={classes.name}>{author.full_name}</span>
                    </LinkWrapper>
                </div>
            </div>
        </Paper>
    );
};
