import React from "react";
import {
    Container,
    Grid,
    Paper,
    Typography,
    Divider,
    Stack,
    Box,
    Tooltip,
    IconButton,
} from "@mui/material";
import { useSelector } from "react-redux";
import { StoreData } from "../../ts/types/redux/store.types";
import { RoleUserChip } from "./role-user=chip/RoleUserChip";
import EditIcon from "@mui/icons-material/Edit";
import { ProfileUserInfo } from "./profile-user-info/ProfileUserInfo";

export const Profile: React.FC = () => {
    return (
        <Container>
            <Grid container spacing={3}>
                <Grid item xs={6} sm={6}>
                    Test
                </Grid>
                <Grid item xs={6} sm={6}>
                    <ProfileUserInfo />
                </Grid>
            </Grid>
        </Container>
    );
};
