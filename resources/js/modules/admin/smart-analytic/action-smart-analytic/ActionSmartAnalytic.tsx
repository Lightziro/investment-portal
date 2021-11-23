import React, { useState, Fragment } from "react";
import { Button, Grid } from "@mui/material";
import { TrainNewsClassifier } from "../train-news-classifier/TrainNewsClassifier";

export const ActionSmartAnalytic = () => {
    const [dialogTrainNews, setDialogTrainNews] = useState(false);
    return (
        <Fragment>
            <Grid container spacing={3}>
                <Grid item xs={3} sm={6} md={2}>
                    <Button
                        onClick={() => setDialogTrainNews(true)}
                        variant="contained"
                    >
                        Train news classifier
                    </Button>
                </Grid>
                <Grid item xs={3} sm={6} md={2}>
                    <Button variant="contained">Analyze classifier</Button>
                </Grid>
            </Grid>
            <TrainNewsClassifier open={dialogTrainNews} />
        </Fragment>
    );
};
