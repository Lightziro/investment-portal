import React, { Fragment } from "react";
import { User } from "../../../../ts/types/redux/store.types";
import {
    Box,
    Divider,
    ListItemText,
    MenuItem,
    Typography,
} from "@mui/material";
import { MenuProfileItems } from "./MenuProfileItems";
import { MENU_AUTH, menuAuth } from "../../../../config/menu-items";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface LoginMenu {
    user: User;
}
export const LoginMenu: React.FC<LoginMenu> = ({ user }) => {
    const { t } = useTranslation();
    return (
        <Fragment>
            <Typography variant="body2" align="center">
                {t(`Welcome, user`, { fullName: user.fullName })}
            </Typography>
            <Divider sx={{ my: 1 }} />
            <MenuProfileItems items={menuAuth(user.userId)} />
            <Divider />
            {user.role === "admin" && (
                <MenuItem sx={{ typography: "body2", py: 1, px: 2.5 }}>
                    <Box
                        component={Icon}
                        icon={"eva:person-add-fill"}
                        sx={{
                            mr: 2,
                            width: 24,
                            height: 24,
                        }}
                    />
                    <ListItemText>
                        <Link to="/admin-panel">{t("Admin panel")}</Link>
                    </ListItemText>
                </MenuItem>
            )}
        </Fragment>
    );
};
