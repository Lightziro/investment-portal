import React from "react";
import {Chip} from "@mui/material";
import {useTranslation} from "react-i18next";

interface RoleUserChip {
    role: string;
}

export const RoleUserChip: React.FC<RoleUserChip> = ({role}) => {
    const {t} = useTranslation();
    const roleName = t(role);
    switch (role) {
        case "admin":
            return (
                <Chip
                    size="small"
                    label={roleName}
                    sx={{ml: 2}}
                    color="primary"
                />
            );
        case "user":
            return (
                <Chip
                    size="small"
                    label={roleName}
                    sx={{ml: 2}}
                    color="success"
                />
            );
        default:
            return null;
    }
};
