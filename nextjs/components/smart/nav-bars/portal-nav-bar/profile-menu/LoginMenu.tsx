import React, { Fragment } from "react";
import {
    Box,
    Divider,
    ListItemText,
    MenuItem,
    Typography,
} from "@mui/material";
import { MenuProfileItems } from "./MenuProfileItems";
import { menuAuth } from "../../../../../config/menu-items";
import { Icon } from "@iconify/react";
import { useTranslation } from "react-i18next";
import { UserData } from "../../../../../ts/types/redux/store.types";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { setOpenSheet } from "../../../../../redux/actions/sheetActions";
interface LoginMenu {
    user: UserData;
    handleExit: () => void;
}
export const LoginMenu: React.FC<LoginMenu> = ({ user, handleExit }) => {
    const dispatch = useDispatch();

    const handleUp = () => {
        dispatch(setOpenSheet("upBalance", {}));
    };

    const { t } = useTranslation();
    return (
        <Fragment>
            <Typography variant="body2" align="center">
                {user.full_name}
            </Typography>
            <Divider sx={{ my: 1 }} />
            <MenuProfileItems items={menuAuth(user.user_id)} />
            <MenuItem
                onClick={handleUp}
                sx={{ typography: "body2", py: 1, px: 2.5 }}
            >
                <Box
                    component={Icon}
                    icon={"twemoji:chart-decreasing"}
                    sx={{
                        mr: 2,
                        width: 24,
                        height: 24,
                    }}
                />
                <ListItemText>{t("Up balance")}</ListItemText>
            </MenuItem>
            <Divider />
            {user.role === "admin" && (
                <Link href="/admin">
                    <MenuItem sx={{ typography: "body2", py: 1, px: 2.5 }}>
                        <Box
                            component={Icon}
                            icon={"twemoji:bar-chart"}
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
                {/*<Box*/}
                {/*    component={Icon}*/}
                {/*    icon={"eva:person-add-fill"}*/}
                {/*    sx={{*/}
                {/*        mr: 2,*/}
                {/*        width: 24,*/}
                {/*        height: 24,*/}
                {/*    }}*/}
                {/*/>*/}
                <ListItemText>{t("Exit")}</ListItemText>
            </MenuItem>
        </Fragment>
    );
};
