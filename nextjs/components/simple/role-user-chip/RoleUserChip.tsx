import React from "react";
import { Chip } from "@mui/material";
interface RoleUserChip {
    role: string;
}
export const RoleUserChip: React.FC<RoleUserChip> = ({ role }) => {
    switch (role) {
        case "admin":
            return (
                <Chip
                    size="small"
                    label={role}
                    sx={{ ml: 2 }}
                    color="primary"
                />
            );
        case "user":
            return (
                <Chip
                    size="small"
                    label={role}
                    sx={{ ml: 2 }}
                    color="success"
                />
            );
        default:
            return null;
    }
};
