import React, { useEffect, useState, Fragment } from "react";
import { useRootSelector } from "../../../../hooks/useTypeSelector";
import { Card, Divider, Grid, Rating, Stack, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Button, Progress } from "antd";
import { getPercentScore } from "../../utils/ratings-score";
import classes from "../../InvestmentIdea.module.scss";
import { SetRatingForm } from "../set-rating-form/SetRatingForm";
import { useDispatch } from "react-redux";
import { fetchUserIdeaRating } from "../../../../redux/actions/viewActions";
import { IdeaUserRating } from "../idea-user-rating/IdeaUserRating";

export const IdeaRatings: React.FC = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [open, setOpen] = useState();
    const user = useRootSelector((state) => state.user);
    const { ratings, ideaId, userRating } = useRootSelector(
        (state) => state.view.idea
    );
    useEffect(() => {
        if (ideaId) {
            dispatch(fetchUserIdeaRating(ideaId));
        }
    }, [ideaId]);
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
            {ratings.stats.map((rating) => (
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
                        percent={getPercentScore(rating.count, ratings.count)}
                        status="active"
                    />
                </Grid>
            ))}
            {userRating ? (
                <IdeaUserRating rating={userRating.score} />
            ) : (
                <Fragment>
                    <Button
                        onClick={() => setOpen(true)}
                        type="primary"
                        disabled={!user}
                        block
                        size="large"
                    >
                        {t("Assign a rating")}
                    </Button>
                    <SetRatingForm
                        open={open}
                        handleClose={() => setOpen(false)}
                        ideaId={ideaId}
                    />
                </Fragment>
            )}
        </Card>
    );
};
