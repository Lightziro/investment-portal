import React, { useEffect, useState } from "react";
import { DtoQuoteItem } from "../../../../ts/types/response/response.types";
import { Grid, Stack, Paper, Skeleton } from "@mui/material";
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";
import * as classnames from "classnames";
import classes from "../../Portal.module.scss";
import { axios } from "../../../../utils/axios";

export const HeaderBestQuote: React.FC = () => {
    const [quotes, setQuotes] = useState<DtoQuoteItem[]>(null);
    useEffect(() => {
        axios.get(`${process.env.API_URL}/api/other/quotes`).then((res) => {
            setQuotes(res.data);
        });
    }, []);
    const getClassByChange = (change: number) => {
        return change > 0 ? classes.changePositive : classes.changeNegative;
    };
    const getIconByChange = (change: number) => {
        return change > 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />;
    };
    if (!quotes) {
        return <Skeleton variant="rectangular" height={60} className="mb-3" />;
    }
    return (
        <Paper className="px-2 py-2 mb-3" elevation={2}>
            <Grid
                alignItems="center"
                justifyContent="center"
                px={2}
                container
                direction="row"
                spacing={1}
            >
                {quotes.map((quote) => (
                    <Grid
                        lg={2}
                        xl={2}
                        md={3}
                        sm={4}
                        xs={6}
                        container
                        direction="column"
                        alignItems="center"
                        item
                    >
                        <span className={classes.quoteHeaderName}>
                            {quote.name}
                        </span>
                        <Stack
                            className={classes.wrapperQuoteInfo}
                            alignItems="center"
                            direction="row"
                        >
                            <div
                                className={classnames(
                                    getClassByChange(
                                        quote.percent_change_today
                                    ),
                                    classes.headerIconChange
                                )}
                            >
                                {getIconByChange(quote.percent_change_today)}
                            </div>
                            <span className={classes.quoteLastPrice}>
                                {quote.last_price}$
                            </span>
                            <span
                                className={classnames(
                                    classes.quoteChangePercent,
                                    getClassByChange(quote.percent_change_today)
                                )}
                            >
                                {`(${quote.percent_change_today.toFixed(2)}%)`}
                            </span>
                        </Stack>
                    </Grid>
                ))}
            </Grid>
        </Paper>
    );
};
