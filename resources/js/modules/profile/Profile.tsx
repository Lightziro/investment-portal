import React, { useEffect } from "react";
import { Container, Grid, Skeleton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { StoreData } from "../../ts/types/redux/store.types";
import { ProfileUserInfo } from "./profile-user-info/ProfileUserInfo";
import { useParams } from "react-router-dom";
import { fetchProfileView } from "../../redux/actions/profileActions";
import { ProfileAvatar } from "./profile-avatar/ProfileAvatar";
import { ProfileStats } from "./profile-stats/ProfileStats";
import { clearView } from "../../redux/actions/mainActions";

export const Profile: React.FC = () => {
    const profile = useSelector((state: StoreData) => state.view.profile);
    const { userId } = useParams();
    const dispatch = useDispatch();
    useEffect(() => {
        if (!profile || profile.userId !== Number(userId)) {
            dispatch(clearView("profile"));
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
                            <ProfileAvatar profile={profile} />
                        </Grid>
                        <Grid item sm={6}>
                            <ProfileStats profile={profile} />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item sm={6}>
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
