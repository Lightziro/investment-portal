import React, { useState } from "react";
import {
    Box,
    Divider,
    IconButton,
    Paper,
    Stack,
    Tooltip,
    Typography,
} from "@mui/material";
import { RoleUserChip } from "../role-user=chip/RoleUserChip";
import EditIcon from "@mui/icons-material/Edit";
import { useSelector } from "react-redux";
import { StoreData } from "../../../ts/types/redux/store.types";
import { FormProfile } from "./form-profile/FormProfile";

export const ProfileUserInfo: React.FC = () => {
    const user = useSelector((state: StoreData) => state.main.user);

    const [edit, setEdit] = useState(false);
    if (!user) {
        return <div>Load</div>;
    }
    return (
        <Paper sx={{ px: 2, py: 1 }} elevation={2}>
            <Stack
                sx={{ mb: 1 }}
                justifyContent="space-between"
                direction="row"
            >
                <Stack direction="row" alignItems="center">
                    <Typography variant="h5">{user.fullName}</Typography>
                    <RoleUserChip role={user.role} />
                </Stack>
                <Tooltip title="Edit">
                    <IconButton onClick={() => setEdit(!edit)}>
                        <EditIcon />
                    </IconButton>
                </Tooltip>
            </Stack>
            <Divider />
            <Box my={1}>
                <FormProfile />
            </Box>
        </Paper>
    );
};
