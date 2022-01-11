import React from "react";
import { UserStore } from "../../../ts/types/redux/store.types";
import { Avatar } from "@mui/material";
interface UserAvatar {
    user: string;
    width?: number;
    height?: number;
}
export const UserAvatar: React.FC<UserAvatar> = ({
    user,
    width = 40,
    height = 40,
}) => {
    return (
        <Avatar
            sx={{ width, height }}
            alt="Avatar user"
            src={user ? `${process.env.API_URL}/storage/${user}` : ""}
        />
    );
};
