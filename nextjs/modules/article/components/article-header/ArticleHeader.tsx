import React from "react";
import { ArticleLabel } from "../../../../ts/types/state/article.types";
import { Paper, Skeleton, Grid } from "@mui/material";
import moment from "moment";
import { Col, Row } from "react-bootstrap";
import classes from "../../Article.module.scss";
import { LabelList } from "../label-list/LabelList";
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
                            className={classes.articleCreatedWrapper}
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
                <h1 className={classes.articleTitle}>{title}</h1>
            ) : (
                <Skeleton height={150} variant={"text"} />
            )}
        </Grid>
    );
};
