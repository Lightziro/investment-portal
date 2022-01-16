import React from "react";
import { Icon } from "@iconify/react";
import { Skeleton, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { IconCardWrapper } from "./icon-card-wrapper/IconCardWrapper";
import classes from "./AdminCardStats.module.scss";
interface AdminCardInfo {
    iconName: string;
    countStats: number;
    title: string;
    backgroundColor: string;
    color: string;
    afterCountText?: string;
}
export const AdminCardStats: React.FC<AdminCardInfo> = ({
    iconName,
    countStats,
    title,
    backgroundColor,
    color,
    afterCountText = "",
}) => {
    const { t } = useTranslation();
    if (countStats === null) {
        return <Skeleton variant="rectangular" width={226} height={245} />;
    }
    return (
        <div
            className={classes.cardInfoWrapper}
            style={{ backgroundColor: backgroundColor }}
        >
            <IconCardWrapper>
                <Icon width={26} height={26} icon={iconName} />
            </IconCardWrapper>
            <Typography color={color} variant="h3">
                {`${countStats} ${afterCountText}`}
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
