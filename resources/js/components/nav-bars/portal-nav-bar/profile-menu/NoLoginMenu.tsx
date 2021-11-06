import React, { Fragment } from "react";
import { MENU_NO_AUTH } from "../../../../config/menu-items";
import {
    Box,
    ListItemText,
    MenuItem,
    Typography,
    Divider,
} from "@mui/material";
import { Icon } from "@iconify/react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export const NoLoginMenu: React.FC = () => {
    const { t } = useTranslation();
    return (
        <Fragment>
            <Typography align="center" gutterBottom variant="h6">
                {t("Not authorized")}
            </Typography>
            <Divider />
            {MENU_NO_AUTH.map((item) => (
                <MenuItem
                    sx={{ typography: "body2", py: 1, px: 2.5 }}
                    onClick={() => console.log("TEST")}
                >
                    <Box
                        component={Icon}
                        icon={item.icon}
                        sx={{
                            mr: 2,
                            width: 24,
                            height: 24,
                        }}
                    />
                    <ListItemText>
                        <Link to={item.link}>{t(item.text)}</Link>
                    </ListItemText>
                </MenuItem>
            ))}
        </Fragment>
    );
};
