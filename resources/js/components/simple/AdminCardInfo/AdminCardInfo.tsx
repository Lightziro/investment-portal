import React from "react";
import { Icon } from "@iconify/react";
import { Card, Skeleton, Typography } from "@mui/material";
import { IconCardWrapper } from "./IconCardWrapper";
import { useTranslation } from "react-i18next";
interface AdminCardInfo {
    iconName: string;
    countStats: number;
    title: string;
    backgroundColor: string;
    color: string;
}
export const AdminCardInfo: React.FC<AdminCardInfo> = ({
    iconName,
    countStats,
    title,
    backgroundColor,
    color,
}) => {
    const { t } = useTranslation();
    if (countStats === null) {
        return (
            <Skeleton
                variant="rectangular"
                // style={{ borderRadius: 16 }}
                width={226}
                height={245}
            />
        );
    }
    return (
        <div
            className="card-info-wrapper"
            style={{ backgroundColor: backgroundColor }}
        >
            <IconCardWrapper>
                <Icon width={26} height={26} icon={iconName} />
            </IconCardWrapper>
            <Typography color={color} variant="h3">
                {countStats}
            </Typography>
            <Typography
                color={color}
                variant="subtitle2"
                sx={{ opacity: 0.72 }}
            >
                {t(title)}
            </Typography>
        </div>
    );
};
