import React from "react";
import { Container, Grid, Skeleton } from "@mui/material";
import { ProfileView } from "../../../ts/types/redux/store.types";
import { ProfileUserInfo } from "../components/profile-user-info/ProfileUserInfo";
import { ProfileAvatar } from "../components/profile-avatar/ProfileAvatar";
import { ProfileStats } from "../components/profile-stats/ProfileStats";
interface ProfilePage {
    profile: ProfileView;
}
export const ProfilePage: React.FC<ProfilePage> = ({ profile }) => {
    return (
        <Container>
            <Grid justifyContent="center" container spacing={3}>
                <Grid md={7} item sm={12}>
                    <Grid item container spacing={1}>
                        <Grid xs={12} item sm={6} md={7}>
                            <ProfileAvatar profile={profile} />
                        </Grid>
                        <Grid xs={12} item sm={6} md={5}>
                            <ProfileStats profile={profile} />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={12} md={5}>
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
