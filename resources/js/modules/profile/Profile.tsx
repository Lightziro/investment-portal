import React, { useEffect } from "react";
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
    Skeleton,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { StoreData } from "../../ts/types/redux/store.types";
import { RoleUserChip } from "./role-user=chip/RoleUserChip";
import EditIcon from "@mui/icons-material/Edit";
import { ProfileUserInfo } from "./profile-user-info/ProfileUserInfo";
import { useParams } from "react-router-dom";
import { fetchProfileView } from "../../redux/actions/profileActions";

export const Profile: React.FC = () => {
    const profile = useSelector((state: StoreData) => state.main.profileView);
    const { userId } = useParams();
    const dispatch = useDispatch();
    useEffect(() => {
        if (profile.userId !== Number(userId)) {
            dispatch(fetchProfileView(Number(userId)));
        }
    }, []);
    return (
        <Container>
            <Grid container spacing={3}>
                <Grid item xs={6} sm={6}>
                    Test
                </Grid>
                <Grid item xs={6} sm={6}>
                    {profile.userId ? (
                        <ProfileUserInfo profile={profile} />
                    ) : (
                        <Skeleton variant={"rectangular"} height={500} />
                    )}
                </Grid>
            </Grid>
        </Container>
    );
};
