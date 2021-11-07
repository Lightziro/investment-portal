import React from "react";
import { Box, Button, Card, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const PortalAd: React.FC = () => {
    const { t } = useTranslation();
    return (
        <Card sx={{ bgcolor: "#b0deff", mb: 2 }}>
            <img
                className="main-picture-portal"
                src="/image/picture/other/svg-editor-image.svg"
            />
            <Box padding={2}>
                <Typography gutterBottom variant="h5" sx={{ fontWeight: 600 }}>
                    {t("Earn on the fall and on the growth stocks")}
                </Typography>
                <Link to="/company-goal">
                    <Button variant="outlined">Подробнее</Button>
                </Link>
            </Box>
        </Card>
    );
};
