import React from "react";
import { Card, IconButton, Tooltip, Typography } from "@mui/material";
import { FileAddOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

export const UserActionIdea: React.FC = () => {
    const { t } = useTranslation();
    return (
        <Card sx={{ bgcolor: "white", p: 1 }} className="shadow-wrapper"></Card>
    );
};
