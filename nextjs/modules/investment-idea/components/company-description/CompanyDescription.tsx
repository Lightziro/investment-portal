import React from "react";
import { Card, Typography } from "@mui/material";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { CompanyModel } from "../../../../ts/types/entity/other.types";

interface CompanyDescription {
    company: CompanyModel;
}

export const CompanyDescription: React.FC<CompanyDescription> = ({
    company,
}) => {
    const { t } = useTranslation();
    if (!company) {
        return null;
    }
    return (
        <Card sx={{ bgcolor: "white", p: 1 }} className="shadow-wrapper">
            <Typography variant="body2" gutterBottom>
                {t("Company description", {
                    companyName: company.name,
                    dateIPO: moment(company.date_ipo).format("MMMM Do YYYY"),
                    ticker: company.ticker,
                })}
            </Typography>
        </Card>
    );
};
