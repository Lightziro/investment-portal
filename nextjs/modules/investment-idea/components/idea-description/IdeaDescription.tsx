import React from "react";
import { Card, Divider, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

interface IdeaDescription {
    description: string;
}
export const IdeaDescription: React.FC<IdeaDescription> = ({ description }) => {
    if (!description) {
        return null;
    }
    const { t } = useTranslation();
    const getDescriptionHTML = () => {
        return { __html: description };
    };
    return (
        <Card className="shadow-wrapper" sx={{ bgcolor: "white", p: 1 }}>
            <Typography variant="h6" align="center" color="black">
                {t("Justification of idea")}
            </Typography>
            <Divider sx={{ my: 1 }} />
            <div dangerouslySetInnerHTML={getDescriptionHTML()} />
        </Card>
    );
};
