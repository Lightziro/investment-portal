import React, { Fragment } from "react";
import { Avatar } from "@mui/material";
import { stringAvatar } from "../../../utils/string-avatar";
import { User } from "../../../../../nextjs/ts/types/redux/store.types";
interface UserAvatar {
    user: User;
}
export const UserAvatar: React.FC<UserAvatar> = ({ user }) => {
    if (!user) {
        return <Avatar />;
    }
    return (
        <Avatar
            src={
                user.avatar
                    ? `/image/${user.avatar}`
                    : "/image/picture/avatar_default.jpg"
            }
        />
    );
};
