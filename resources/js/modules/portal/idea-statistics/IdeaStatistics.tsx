import React, { Fragment } from "react";
import { Divider, Paper, Skeleton, Stack, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { StoreData } from "../../../ts/types/redux/store.types";

export const IdeaStatistics: React.FC = () => {
    const stats = useSelector(
        (state: StoreData) => state.main.investmentData.ideaStatistics
    );
    console.log("STATS", stats);
    const { t } = useTranslation();
    return (
        <div className="portal-component-wrapper">
            {stats ? (
                <Paper elevation={2}>
                    <Typography align="center" variant="h6" sx={{ p: 1 }}>
                        {t("We offer best ideas")}
                    </Typography>
                    <Divider light />
                    <Stack
                        direction="row"
                        spacing={1}
                        divider={<Divider orientation="vertical" flexItem />}
                    >
                        <div className="wrapper-stats-idea">
                            <span className="label-stats-ideas">
                                {t("Successful ideas")}
                            </span>
                            <div className="value-stats-ideas">
                                {stats.success}
                            </div>
                        </div>
                        <div className="wrapper-stats-idea">
                            <span className="label-stats-ideas">
                                {t("Failed ideas")}
                            </span>
                            <span className="value-stats-ideas">
                                {stats.fail}
                            </span>
                        </div>
                    </Stack>
                </Paper>
            ) : (
                <Skeleton height={163} variant="rectangular" />
            )}
        </div>
    );
};
