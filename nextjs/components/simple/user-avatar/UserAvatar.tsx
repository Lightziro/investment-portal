import React from "react";
import { UserStore } from "../../../ts/types/redux/store.types";
import { Avatar } from "@mui/material";
interface UserAvatar {
    user: UserStore;
}
export const UserAvatar: React.FC<UserAvatar> = ({ user }) => {
    return (
        <Avatar
            alt="Avatar user"
            src={user ? `${process.env.API_URL}/storage/${user.avatar}` : ""}
        />
    );
};
