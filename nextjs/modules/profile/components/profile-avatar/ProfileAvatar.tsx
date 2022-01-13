import React from "react";
import { Skeleton } from "@mui/lab";
import { ProfileView } from "../../../../ts/types/redux/store.types";
import { UserAvatar } from "../../../../components/simple/user-avatar/UserAvatar";
interface ProfileAvatar {
    profile: ProfileView;
}
export const ProfileAvatar: React.FC<ProfileAvatar> = ({ profile }) => {
    if (!profile.userId) {
        return <Skeleton variant="circular" width={230} height={230} />;
    }

    return <UserAvatar width={230} height={230} avatar={profile.avatar} />;
};
