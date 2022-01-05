import React, { Fragment } from "react";
import { ArticleLabel } from "../../../../../../nextjs/ts/types/state/article.types";
import { Grid, Paper, Skeleton, Stack } from "@mui/material";
import { LabelList } from "./label-list/LabelList";
import moment from "moment";
interface ArticleHeader {
    title: string;
    labels: ArticleLabel[];
    dateCreate: string;
}
export const ArticleHeader: React.FC<ArticleHeader> = ({
    title,
    labels,
    dateCreate,
}) => {
    return (
        <Grid direction="column" justifyContent="flex-start">
            <Grid
                alignItems="center"
                item
                container
                spacing={2}
                direction="row"
            >
                <Grid item sm={2}>
                    {dateCreate ? (
                        <Paper
                            elevation={3}
                            className="article-created-wrapper"
                        >
                            {moment(dateCreate).format("D")}
                            <span>
                                {moment(dateCreate).format("MMM, YYYY")}
                            </span>
                        </Paper>
                    ) : (
                        <Skeleton height={88} variant={"rectangular"} />
                    )}
                </Grid>
                <LabelList labels={labels} />
            </Grid>
            {title ? (
                <h1 className="article-title">{title}</h1>
            ) : (
                <Skeleton height={150} variant={"text"} />
            )}
        </Grid>
    );
};
