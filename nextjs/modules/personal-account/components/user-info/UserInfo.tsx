import React, { Fragment } from "react";
import { UserAvatar } from "../../../../components/simple/user-avatar/UserAvatar";
import { useRootSelector } from "../../../../hooks/useTypeSelector";
import classes from "../../PersonalAccount.module.scss";
import { LinkWrapper } from "../../../../components/simple/link/Link";
import { useTranslation } from "react-i18next";
import { Stack } from "@mui/material";

export const UserInfo = () => {
    const user = useRootSelector((state) => state.user);
    const { t } = useTranslation();
    return (
        <Stack direction="column">
            <UserAvatar width={150} height={150} avatar={user.avatar} />
            <span className="h9-title mt-2">{user.first_name}</span>
            <span className="h9-title">{user.last_name}</span>
            <LinkWrapper className="mt-2" href={`/profile/${user.user_id}`}>
                <span className={classes.linkChangeProfile}>
                    {t("Change profile")}
                </span>
            </LinkWrapper>
        </Stack>
    );
};
