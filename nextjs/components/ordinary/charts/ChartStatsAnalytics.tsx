import React from "react";
import { Card, Skeleton } from "@mui/material";
import { AnalyticsStats } from "../../../ts/types/entity/stock-market.types";
import dynamic from "next/dynamic";
import { useRootSelector } from "../../../hooks/useTypeSelector";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export const ChartStatsAnalytics: React.FC = () => {
    const stats = useRootSelector((state) => state.view.idea.analyticsStats);
    if (!stats) {
        return <Skeleton height={180} variant="rectangular" />;
    }
    return (
        <Card className="shadow-wrapper" sx={{ bgcolor: "white" }}>
            {stats.length ? (
                <Chart
                    {...{
                        type: "area",
                        height: 225,
                        options: {
                            chart: {
                                sparkline: {
                                    enabled: true,
                                },
                                type: "area",
                            },
                            dataLabels: {
                                enabled: false,
                            },
                            stroke: {
                                curve: "smooth",
                                width: 3,
                            },
                        },
                        fill: {
                            type: "gradient",
                            gradient: {
                                shadeIntensity: 1,
                                opacityFrom: 0.7,
                                opacityTo: 0.9,
                                stops: [0, 90, 100],
                            },
                        },
                        series: [
                            {
                                name: "Buy",
                                data: stats.map(
                                    (item: AnalyticsStats) => item.buy
                                ),
                            },
                            {
                                name: "Short",
                                data: stats.map(
                                    (item: AnalyticsStats) => item.sell
                                ),
                            },
                            {
                                name: "Hold",
                                data: stats.map(
                                    (item: AnalyticsStats) => item.hold
                                ),
                            },
                        ],
                        xaxis: {
                            categories: stats.map((item: AnalyticsStats) =>
                                new Date(item.period).getDay()
                            ),
                        },
                    }}
                />
            ) : (
                <div>Не удалось</div>
            )}
        </Card>
    );
};
