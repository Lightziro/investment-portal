import React, { useEffect, useState } from "react";
import { axios } from "../../../../../utils/axios";
import { Entity } from "../../../../../ts/enums/other.enums";
import { Grid } from "@mui/material";
import { AdminCardStats } from "../../../components/admin-card-stats/AdminCardStats";
import { DtoIdeasStats } from "../../../ts/types/response/response-stats";
import { useTranslation } from "react-i18next";

export const IdeasStats: React.FC = () => {
    const [stats, setStats] = useState<DtoIdeasStats>({});
    const { t } = useTranslation();
    useEffect(() => {
        loadStats();
    }, []);

    const loadStats = async () => {
        const entity = Entity.InvestmentIdea;
        const response = await axios
            .get(`${process.env.API_URL}/api/admin/${entity}/get-stats`)
            .then((res) => res.data);
        setStats(response);
    };
    return (
        <Grid container spacing={3}>
            <Grid item xl={2} xs={12} sm={6} md={3} lg={3}>
                <AdminCardStats
                    iconName={"ant-design:container-outlined"}
                    countStats={stats.ideas_create_today}
                    title={t("Created ideas in day")}
                    backgroundColor={"#8aabff"}
                    color={"white"}
                />
            </Grid>
            <Grid item xl={2} xs={12} sm={6} md={3} lg={3}>
                <AdminCardStats
                    iconName={"ant-design:container-outlined"}
                    countStats={stats.ideas_create_week}
                    title={t("Created ideas in week")}
                    backgroundColor={"#8aabff"}
                    color={"white"}
                />
            </Grid>
            <Grid item xl={2} xs={12} sm={6} md={3} lg={3}>
                <AdminCardStats
                    iconName={"ant-design:eye-outlined"}
                    countStats={stats.ideas_view_today}
                    title={t("Views of ideas per day")}
                    backgroundColor={"#8aabff"}
                    color={"white"}
                />
            </Grid>
            <Grid item xl={2} xs={12} sm={6} md={3} lg={3}>
                <AdminCardStats
                    iconName={"ant-design:eye-outlined"}
                    countStats={stats.ideas_view_week}
                    title={t("Views of ideas per week")}
                    backgroundColor={"#8aabff"}
                    color={"white"}
                />
            </Grid>
        </Grid>
    );
};
