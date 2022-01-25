import React from "react";
import { useRootSelector } from "../../../../hooks/useTypeSelector";
import { Card, Divider, Grid, Rating, Stack, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Button, Progress } from "antd";
import { getPercentScore } from "../../utils/ratings-score";
import classes from "../../InvestmentIdea.module.scss";

export const IdeaRatings: React.FC = () => {
    const { t } = useTranslation();
    const user = useRootSelector((state) => state.user);
    const ratings = useRootSelector((state) => state.view.idea.ratings);
    if (!ratings) {
        return null;
    }
    return (
        <Card sx={{ bgcolor: "white", p: 2 }} className="shadow-wrapper">
            <Stack direction="row" justifyContent="space-between">
                <Rating precision={0.1} value={ratings.avg} readOnly />
                <Typography variant="h6">{`${ratings.avg}/5`}</Typography>
            </Stack>
            <Divider sx={{ my: 1 }} />
            {ratings.stats.reverse().map((rating) => (
                <Grid
                    key={rating.score}
                    sx={{ mb: 1 }}
                    direction="row"
                    container
                    alignItems="center"
                >
                    <span className={classes.textRating}>
                        {rating.score} звезд
                    </span>
                    <Progress
                        className={classes.ratingBar}
                        showInfo={false}
                        percent={getPercentScore(rating.count, 4)}
                        status="active"
                    />
                </Grid>
            ))}
            <Button type="primary" disabled={!user} block size="large">
                {t("Assign a rating")}
            </Button>
        </Card>
    );
};
