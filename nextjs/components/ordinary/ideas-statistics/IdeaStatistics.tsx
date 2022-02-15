import React from "react";
import { useTranslation } from "react-i18next";
import { Divider, Paper, Skeleton, Stack, Typography } from "@mui/material";
import classes from "./IdeaStatistics.module.scss";

interface IdeaStatistics {
    stats: {
        success: number;
        fail: number;
    };
}

export const IdeaStatistics: React.FC<IdeaStatistics> = ({ stats }) => {
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
                        <div className={classes.wrapperStatsIdea}>
                            <span className={classes.labelStatsIdeas}>
                                {t("Successful ideas")}
                            </span>
                            <div className={classes.valueStatsIdeas}>
                                {stats.success}
                            </div>
                        </div>
                        <div className={classes.wrapperStatsIdea}>
                            <span className={classes.labelStatsIdeas}>
                                {t("Failed ideas")}
                            </span>
                            <span className={classes.valueStatsIdeas}>
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
