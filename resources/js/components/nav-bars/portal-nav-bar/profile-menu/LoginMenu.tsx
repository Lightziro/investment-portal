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
import { menuAuth } from "../../../../config/menu-items";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { exitUser } from "../../../../redux/actions/mainActions";

interface LoginMenu {
    user: User;
    handleExit: () => void;
}
export const LoginMenu: React.FC<LoginMenu> = ({ user, handleExit }) => {
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
                <Link to="/admin-panel">
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
                        <ListItemText>{t("Admin panel")}</ListItemText>
                    </MenuItem>
                </Link>
            )}
            <MenuItem
                onClick={handleExit}
                sx={{ typography: "body2", py: 1, px: 2.5 }}
            >
                <Box
                    component={Icon}
                    icon={"eva:person-add-fill"}
                    sx={{
                        mr: 2,
                        width: 24,
                        height: 24,
                    }}
                />
                <ListItemText>{t("Exit")}</ListItemText>
            </MenuItem>
        </Fragment>
    );
};
