import React from "react";
import { Skeleton } from "@mui/lab";
import { Avatar, Stack } from "@mui/material";
import { ProfileView } from "../../../../../nextjs/ts/types/redux/store.types";
import { stringAvatar } from "../../../utils/string-avatar";
interface ProfileAvatar {
    profile: ProfileView;
}
export const ProfileAvatar: React.FC<ProfileAvatar> = ({ profile }) => {
    if (!profile.userId) {
        return <Skeleton variant="circular" width={230} height={230} />;
    }

    return (
        <Stack justifyContent="center">
            <Avatar
                src={`/image/${profile.avatar}`}
                sx={{ height: 230, width: 230 }}
            />
        </Stack>
    );
};
