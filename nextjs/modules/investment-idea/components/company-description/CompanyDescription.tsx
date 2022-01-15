import React from "react";
import { Card, Typography } from "@mui/material";
import { CompanyIdeaInfo } from "../../../../ts/types/entity/stock-market.types";
import moment from "moment";
import { useTranslation } from "react-i18next";
interface CompanyDescription {
    company: CompanyIdeaInfo;
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
                    companyName: company.companyName,
                    dateIPO: moment(company.dateIPO).format("MMMM Do YYYY"),
                    ticker: company.ticker,
                })}
            </Typography>
        </Card>
    );
};
