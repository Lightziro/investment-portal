import React from "react";
import { Card, Divider, Skeleton, Stack, Typography } from "@mui/material";
import dynamic from "next/dynamic";
import { BaseCompanyStat } from "../../../ts/types/entity/stock-market.types";
import { useTranslation } from "react-i18next";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface ChartStats {
    statsData: BaseCompanyStat[];
    height?: number;
    type?: any;
    title: string;
    hintName: string;
}

export const ChartStats: React.FC<ChartStats> = ({
    statsData,
    height = 180,
    type = "area",
    title,
    hintName,
}) => {
    const { t } = useTranslation();
    if (!statsData) {
        return <Skeleton variant="rectangular" height={height} />;
    }

    return (
        <Card className="shadow-wrapper" sx={{ bgcolor: "white", pt: 1 }}>
            <Typography px={1} variant="h5">
                {t(title)}
            </Typography>
            <Divider className="mb-2" />
            {statsData.length ? (
                <Chart
                    {...{
                        type,
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
                                name: t(hintName),
                                data: statsData.map((item) => ({
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
