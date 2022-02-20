import React from "react";
import { Card, Divider, Skeleton, Stack, Typography } from "@mui/material";
import dynamic from "next/dynamic";
import { EpsCompanyStats } from "../../../ts/types/entity/stock-market.types";
import { useTranslation } from "react-i18next";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
interface ChartStatsEPS {
    epsData: EpsCompanyStats[];
    height?: number;
}
export const ChartStatsEPS: React.FC<ChartStatsEPS> = ({
    epsData,
    height = 180,
}) => {
    const { t } = useTranslation();
    if (!epsData) {
        return <Skeleton variant="rectangular" height={height} />;
    }

    return (
        <Card className="shadow-wrapper" sx={{ bgcolor: "white", pt: 1 }}>
            <Typography px={1} variant="h5">
                Earnings per share(EPS)
            </Typography>
            <Divider />
            {epsData.length ? (
                <Chart
                    {...{
                        type: "area",
                        height,
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
                <Stack
                    justifyContent="center"
                    height={height}
                    alignItems="center"
                >
                    {t("Data could not be extracted")}
                </Stack>
            )}
        </Card>
    );
};
