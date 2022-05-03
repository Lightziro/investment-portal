import React, { Fragment } from "react";
import { UserAvatar } from "../../../../components/simple/user-avatar/UserAvatar";
import { useRootSelector } from "../../../../hooks/useTypeSelector";
import classes from "../../PersonalAccount.module.scss";
import { LinkWrapper } from "../../../../components/simple/link/Link";
import { useTranslation } from "react-i18next";
import { Stack } from "@mui/material";

export const UserInfo = () => {
    const { data } = useRootSelector((state) => state.user);
    const { t } = useTranslation();
    return (
        <Stack direction="column">
            <UserAvatar width={150} height={150} avatar={data.avatar} />
            <span className="h9-title mt-2">{data.first_name}</span>
            <span className="h9-title">{data.last_name}</span>
            <LinkWrapper className="mt-2" href={`/profile/${data.user_id}`}>
                <span className={classes.linkChangeProfile}>
                    {t("Change profile")}
                </span>
            </LinkWrapper>
        </Stack>
    );
};
