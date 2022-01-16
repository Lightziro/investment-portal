import React from "react";
import { Grid } from "@mui/material";
import { AdminCardStats } from "../admin-card-stats/AdminCardStats";
import { useRootSelector } from "../../../../hooks/useTypeSelector";
import { useTranslation } from "react-i18next";

export const UsersStats: React.FC = () => {
    const { t } = useTranslation();
    const { newUsersToday, newUsersWeek } = useRootSelector(
        (state) => state.admin.users.stats
    );
    return (
        <Grid container spacing={3}>
            <Grid item xl={2} xs={12} sm={6} md={3} lg={3}>
                <AdminCardStats
                    iconName={"ant-design:eye-outlined"}
                    countStats={newUsersToday}
                    title={t("Users today")}
                    backgroundColor={"#8aabff"}
                    color={"white"}
                />
            </Grid>
            <Grid item xl={2} xs={12} sm={6} md={3} lg={3}>
                <AdminCardStats
                    iconName={"ant-design:eye-outlined"}
                    countStats={newUsersWeek}
                    title={t("Users week")}
                    backgroundColor={"#8aabff"}
                    color={"white"}
                />
            </Grid>
        </Grid>
    );
};
