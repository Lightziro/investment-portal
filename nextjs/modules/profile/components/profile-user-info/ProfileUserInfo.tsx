import React, { useState } from "react";
import {
    Divider,
    IconButton,
    Paper,
    Stack,
    Tooltip,
    Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useRootSelector } from "../../../../hooks/useTypeSelector";
import { RoleUserChip } from "../../../../components/simple/role-user-chip/RoleUserChip";
import { FormProfile } from "../form-profile/FormProfile";
import { ProfileView } from "../../../../redux/ts/types/view/view-store.types";
interface ProfileUserInfo {
    profile: ProfileView;
}
export const ProfileUserInfo: React.FC<ProfileUserInfo> = ({ profile }) => {
    const [edit, setEdit] = useState(false);
    const user = useRootSelector((store) => store.user);
    return (
        <Paper sx={{ px: 2, py: 1 }} elevation={2}>
            <Stack
                sx={{ mb: 1 }}
                justifyContent="space-between"
                direction="row"
            >
                <Stack direction="row" alignItems="center">
                    <Typography variant="h5">{profile.full_name}</Typography>
                    <RoleUserChip role={profile.role_name} />
                </Stack>
                {user?.userId === profile.user_id && (
                    <Tooltip title="Edit">
                        <IconButton onClick={() => setEdit(!edit)}>
                            <EditIcon />
                        </IconButton>
                    </Tooltip>
                )}
            </Stack>
            <Divider />
            <FormProfile
                edit={edit}
                profile={profile}
                handleEdit={() => setEdit(!edit)}
            />
        </Paper>
    );
};
