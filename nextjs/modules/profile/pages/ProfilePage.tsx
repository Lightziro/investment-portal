import React, { useContext } from "react";
import { Container, Grid, Skeleton } from "@mui/material";
import { ProfileUserInfo } from "../components/profile-user-info/ProfileUserInfo";
import { ProfileAvatar } from "../components/profile-avatar/ProfileAvatar";
import { ProfileStats } from "../components/profile-stats/ProfileStats";
import { ProfileContext } from "../contexts/ProfileContext";

export const ProfilePage: React.FC = () => {
    const { profile } = useContext(ProfileContext);
    return (
        <Container>
            <Grid justifyContent="center" container spacing={3}>
                <Grid item xl={3} lg={3} xs={12} sm={4} md={3}>
                    <ProfileAvatar profile={profile} />
                </Grid>
                <Grid item xl={3} lg={3} xs={12} sm={8} md={3}>
                    <ProfileStats profile={profile} />
                </Grid>
                <Grid item lg={6} xl={6} xs={12} sm={12} md={6}>
                    {profile.user_id ? (
                        <ProfileUserInfo profile={profile} />
                    ) : (
                        <Skeleton variant={"rectangular"} height={500} />
                    )}
                </Grid>
            </Grid>
        </Container>
    );
};
