import React from "react";
import Link from "next/link";
// import { Box, Button, Card, Typography } from "@mui/material";
import { Button, Typography } from "antd";
import { useTranslation } from "react-i18next";

export const PortalAd: React.FC = () => {
    const { t } = useTranslation();
    return (
        // <Card sx={{ bgcolor: "#b0deff", mb: 2 }}>
        <div>
            <img
                className="main-picture-portal"
                src="/image/picture/other/svg-editor-image.svg"
            />
            {/*<Box padding={2}>*/}
            <Typography.Title level={3}>
                {t("Earn on the fall and on the growth stocks")}
            </Typography.Title>
            <Link href="/company-goal">
                <Button>Подробнее</Button>
            </Link>
            {/*</Box>*/}
        </div>
    );
};
