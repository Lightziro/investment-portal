import React, { Fragment } from "react";
import { MenuItems } from "../../../../../ts/types/menu-items.types";
import { Box, ListItemText, MenuItem } from "@mui/material";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { useTranslation } from "react-i18next";

interface MenuProfileItems {
    items: MenuItems[];
}
export const MenuProfileItems: React.FC<MenuProfileItems> = ({ items }) => {
    const { t } = useTranslation();
    return (
        <Fragment>
            {items.map((item, i) => (
                <Link key={i} href={item.link}>
                    <MenuItem sx={{ typography: "body2", py: 1, px: 2.5 }}>
                        <Box
                            component={Icon}
                            icon={item.icon}
                            sx={{
                                mr: 2,
                                width: 24,
                                height: 24,
                            }}
                        />
                        <ListItemText>{t(item.text)}</ListItemText>
                    </MenuItem>
                </Link>
            ))}
        </Fragment>
    );
};
