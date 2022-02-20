import React from "react";
import { Card, Skeleton } from "@mui/material";
import dynamic from "next/dynamic";
import { EpsCompanyStats } from "../../../ts/types/entity/stock-market.types";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
interface ChartStatsEPS {
    epsData: EpsCompanyStats[];
}
export const ChartStatsEPS: React.FC<ChartStatsEPS> = ({ epsData }) => {
    if (!epsData) {
        return <Skeleton variant="rectangular" height={180} />;
    }

    return (
        <Card className="shadow-wrapper" sx={{ bgcolor: "white" }}>
            {epsData.length ? (
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
            ) : (
                <div>Не удалось</div>
            )}
        </Card>
    );
};