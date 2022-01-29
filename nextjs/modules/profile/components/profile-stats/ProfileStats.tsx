import React from "react";
import { Box, Divider, Paper, Skeleton, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import moment from "moment";
import { ProfileView } from "../../../../redux/ts/types/view/view-store.types";
interface ProfileStats {
    profile: ProfileView;
}
export const ProfileStats: React.FC<ProfileStats> = ({ profile }) => {
    const { t } = useTranslation();
    if (!profile.user_id) {
        return <Skeleton variant={"rectangular"} height={200} />;
    }
    return (
        <Paper sx={{ px: 2, py: 1 }} elevation={2}>
            <Typography variant="subtitle2">{t("User statistics")}</Typography>
            <Divider />
            <Box my={1}>
                <Typography variant="body2">
                    {t("Total comments")}: {profile.count_comments}
                </Typography>
                <Typography variant="body2">
                    {t("Registered")}: {moment(profile.created_at).format("LL")}
                </Typography>
            </Box>
        </Paper>
    );
};
