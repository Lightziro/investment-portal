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
import { ProfileAvatar } from "./profile-avatar/ProfileAvatar";
import { ProfileStats } from "./profile-stats/ProfileStats";

export const Profile: React.FC = () => {
    const profile = useSelector((state: StoreData) => state.main.profileView);
    const { userId } = useParams();
    const dispatch = useDispatch();
    useEffect(() => {
        if (!profile || profile.userId !== Number(userId)) {
            dispatch(fetchProfileView(Number(userId)));
        }
    }, [userId]);
    return (
        <Container>
            <Grid container spacing={3}>
                <Grid item sm={6}>
                    <Grid container spacing={2}>
                        <Grid
                            alignItems="center"
                            justifyContent="center"
                            item
                            sm={6}
                        >
                            <ProfileAvatar avatar={profile?.avatar} />
                        </Grid>
                        <Grid item sm={6}>
                            <ProfileStats profile={profile} />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item sm={6}>
                    {profile ? (
                        <ProfileUserInfo profile={profile} />
                    ) : (
                        <Skeleton variant={"rectangular"} height={500} />
                    )}
                </Grid>
            </Grid>
        </Container>
    );
};
