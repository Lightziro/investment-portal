import React, { Fragment } from "react";
import { ArticleLabel } from "../../../../ts/types/state/article.types";
import { Paper, Skeleton, Stack } from "@mui/material";
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
        <Row>
            <Row>
                <Col item sm={2}>
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
                </Col>
                <Col>
                    <LabelList labels={labels} />
                </Col>
            </Row>
            {title ? (
                <h1 className={classes.articleTitle}>{title}</h1>
            ) : (
                <Skeleton height={150} variant={"text"} />
            )}
        </Row>
    );
};
