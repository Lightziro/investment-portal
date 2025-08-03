import React, { useEffect, useState } from "react";
import styles from "./MainPage.module.scss";
import { useRootSelector } from "../../../../hooks/useTypeSelector";
import { DtoQuoteItem } from "../../../../ts/types/response/response.types";
import { axios } from "../../../../utils/axios";
import { Skeleton } from "@mui/material";
import { formatNumber, getCurrencyShow } from "../../../../utils/other";
import cn from "classnames";
import { useRouter } from "next/router";
import SvgStarYellow from "../../../../public/images/picture/star-yellow.svg";

const MainPage = () => {
    const user = useRootSelector((state) => state.user.data);
    const router = useRouter();

    const [quotes, setQuotes] = useState<DtoQuoteItem[]>(null);
    useEffect(() => {
        axios.get(`${process.env.API_URL}/api/other/quotes`).then((res) => {
            setQuotes(res.data.data);
        });
    }, []);

    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <p className={styles.greeting}>👋 Привет, {user.first_name}!</p>
                <p className={styles.portfolio}>
                    Ваш рост: <span>+8,3% за неделю</span>
                </p>
            </div>

            <div className={styles.section}>
                <h2 className={styles.sectionTitle}>ТОП акций</h2>
                <div>
                    {quotes ? (
                        quotes.map((quote) => (
                            <div
                                onClick={() =>
                                    router.push(`/company/${quote.company_id}`)
                                }
                                className={styles.stockCard}
                            >
                                <div className={styles.stockInfo}>
                                    <img
                                        src={`/storage/${quote.logoPath}`}
                                        alt="Apple"
                                        className={styles.stockIcon}
                                        onError={(e) =>
                                            (e.currentTarget.src =
                                                "/images/picture/build.svg")
                                        }
                                    />
                                    <div>
                                        <p className={styles.stockName}>
                                            {quote.name}
                                        </p>
                                        <p className={styles.stockData}>
                                            {formatNumber(quote.last_price)}{" "}
                                            {getCurrencyShow(quote.currency)}
                                            <span
                                                className={cn({
                                                    [styles.positive]:
                                                        quote.percent_change_today >=
                                                        0,
                                                    [styles.negative]:
                                                        quote.percent_change_today <
                                                        0,
                                                })}
                                            >
                                                (
                                                {quote.percent_change_today.toFixed(
                                                    2
                                                )}
                                                %)
                                            </span>
                                        </p>
                                    </div>
                                </div>
                                <SvgStarYellow />
                            </div>
                        ))
                    ) : (
                        <Skeleton height={200} variant="rectangular" />
                    )}
                </div>
            </div>

            <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Как это работает</h2>
                <div className={styles.howItWorks}>
                    <div className={styles.step}>
                        <div className={styles.circleIcon}>🏛</div>
                        <p>Выбирай компанию</p>
                    </div>
                    <div className={styles.step}>
                        <div className={styles.circleIcon}>⭐</div>
                        <p>Делай прогноз</p>
                    </div>
                    <div className={styles.step}>
                        <div className={styles.circleIcon}>📈</div>
                        <p>Следи за ростом</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default MainPage;
