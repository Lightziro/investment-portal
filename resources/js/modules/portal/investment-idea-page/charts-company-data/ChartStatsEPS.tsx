import React from "react";
import { Card, Grid, Skeleton, Typography } from "@mui/material";
import Chart from "react-apexcharts";
import { EpsCompanyStats } from "../../../../../../nextjs/ts/types/state/stock-market.types";
interface ChartStatsEPS {
    epsData: EpsCompanyStats[];
}
export const ChartStatsEPS: React.FC<ChartStatsEPS> = ({ epsData }) => {
    if (!epsData) {
        return <Skeleton variant="rectangular" height={180} />;
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
                            name: "EPS",
                            data: epsData.map((item) => ({
                                y: item.value,
                                x: new Date(item.date).getFullYear(),
                            })),
                        },
                    ],
                }}
            />
        </Card>
    );
};
