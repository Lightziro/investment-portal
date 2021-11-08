import React from "react";
import { Card, Skeleton } from "@mui/material";
import Chart from "react-apexcharts";
import { AnalyticsStats } from "../../../../ts/types/state/stock-market.types";

interface ChartStatsAnalytics {
    stats: AnalyticsStats[];
}
export const ChartStatsAnalytics: React.FC<ChartStatsAnalytics> = ({
    stats,
}) => {
    if (!stats) {
        return <Skeleton height={180} variant="rectangular" />;
    }
    return (
        <Card
            className="shadow-wrapper"
            sx={{ bgcolor: "rgba(144, 202, 249, 0.85)" }}
        >
            <Chart
                {...{
                    type: "area",
                    height: 180,
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
                            data: stats.map((item: AnalyticsStats) => item.buy),
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
        </Card>
    );
};
