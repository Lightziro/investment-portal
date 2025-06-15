import React, { useEffect, useState } from "react";
import { DtoQuoteItem } from "../../../../ts/types/response/response.types";
import { Paper, Skeleton } from "@mui/material";
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";
import classnames from "classnames";
import classes from "../../Portal.module.scss";
import { axios } from "../../../../utils/axios";
import { LinkWrapper } from "../../../../components/simple/link/Link";
import styles from "./HeaderBestQuote.module.scss";

export const HeaderBestQuote: React.FC = () => {
    const [quotes, setQuotes] = useState<DtoQuoteItem[]>(null);
    useEffect(() => {
        axios.get(`${process.env.API_URL}/api/other/quotes`).then((res) => {
            setQuotes(res.data.data);
        });
    }, []);
    const getClassByChange = (change: number) => {
        return change > 0 ? styles.changePositive : styles.changeNegative;
    };
    const getIconByChange = (change: number, className: string) => {
        return change > 0 ? (
            <ArrowUpOutlined className={className} />
        ) : (
            <ArrowDownOutlined className={className} />
        );
    };
    if (!quotes) {
        return <Skeleton variant="rectangular" height={60} className="mb-3" />;
    }
    return (
        <Paper className="px-2 py-2 mb-3" elevation={2}>
            <div className={styles.headerQuoteWrapper}>
                {quotes
                    .filter((item) => item.percent_change_today)
                    .map((quote) => (
                        <LinkWrapper href={`/company/${quote.company_id}`}>
                            <div className={styles.wrapperQuote}>
                                <span className={styles.quoteHeaderName}>
                                    {quote.name}
                                </span>
                                <div className={styles.wrapperQuoteInfo}>
                                    {getIconByChange(
                                        quote.percent_change_today,
                                        getClassByChange(
                                            quote.percent_change_today
                                        )
                                    )}
                                    <span>{quote.last_price}$</span>
                                    <span
                                        className={classnames(
                                            styles.quoteChangePercent,
                                            getClassByChange(
                                                quote.percent_change_today
                                            )
                                        )}
                                    >
                                        {`(${quote.percent_change_today.toFixed(
                                            2
                                        )}%)`}
                                    </span>
                                </div>
                            </div>
                        </LinkWrapper>
                    ))}
            </div>
        </Paper>
    );
};
