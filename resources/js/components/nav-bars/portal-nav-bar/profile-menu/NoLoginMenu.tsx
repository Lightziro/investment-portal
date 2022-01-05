import React, { Fragment } from "react";
import { MENU_NO_AUTH } from "../../../../../../nextjs/config/menu-items";
import { Typography, Divider } from "@mui/material";
import { useTranslation } from "react-i18next";
import { MenuProfileItems } from "./MenuProfileItems";

export const NoLoginMenu: React.FC = () => {
    const { t } = useTranslation();
    return (
        <Fragment>
            <Typography align="center" gutterBottom variant="h6">
                {t("Not authorized")}
            </Typography>
            <Divider />
            <MenuProfileItems items={MENU_NO_AUTH} />
        </Fragment>
    );
};
