import React from "react";
import { Skeleton } from "@mui/lab";
import { Avatar, Stack } from "@mui/material";
interface ProfileAvatar {
    avatar: string;
}
export const ProfileAvatar: React.FC<ProfileAvatar> = ({ avatar }) => {
    if (!avatar) {
        return <Skeleton variant="circular" width={230} height={230} />;
    }
    return (
        <Stack justifyContent="center">
            <Avatar sx={{ height: 230, width: 230 }} src={`/image/${avatar}`} />
        </Stack>
    );
};
