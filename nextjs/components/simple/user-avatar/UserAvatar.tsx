import React from "react";
import { UserStore } from "../../../ts/types/redux/store.types";
import { Avatar } from "@mui/material";
interface UserAvatar {
    avatar: string;
    width?: number | string;
    height?: number | string;
}
export const UserAvatar: React.FC<UserAvatar> = ({
    avatar,
    width = 40,
    height = 40,
}) => {
    return (
        <Avatar
            sx={{ width, height }}
            alt="Avatar user"
            src={avatar ? `${process.env.API_URL}/storage/${avatar}` : ""}
        />
    );
};
