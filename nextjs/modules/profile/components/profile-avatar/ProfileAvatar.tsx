import React from "react";
import { UserAvatar } from "../../../../components/simple/user-avatar/UserAvatar";
import { Skeleton } from "@mui/material";
import { ProfileUser } from "../../../../ts/types/other/view.types";

interface ProfileAvatar {
    profile: ProfileUser;
}

export const ProfileAvatar: React.FC<ProfileAvatar> = ({ profile }) => {
    if (!profile.user_id) {
        return <Skeleton variant="circular" width={230} height={230} />;
    }

    return (
        <UserAvatar
            width={"80%"}
            height={"100%"}
            avatar={profile.avatar_path}
        />
    );
};
