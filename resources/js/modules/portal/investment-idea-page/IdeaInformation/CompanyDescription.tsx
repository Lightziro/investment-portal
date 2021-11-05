import React from "react";
import { Card, Typography } from "@mui/material";
import { CompanyIdeaInfo } from "../../../../ts/types/state/stock-market.types";
import moment from "moment";
interface CompanyDescription {
    company: CompanyIdeaInfo;
}
export const CompanyDescription: React.FC<CompanyDescription> = ({
    company,
}) => {
    if (!company) {
        return null;
    }
    // const date = new Date(company.dateIPO);
    return (
        <Card sx={{ bgcolor: "white", p: 1 }} className="shadow-wrapper">
            <Typography variant="body2" gutterBottom>
                The company {company.companyName} listed on the stock market
                since {moment(company.dateIPO).format("MMMM Do YYYY")} under the
                ticker {company.ticker}.
            </Typography>
        </Card>
    );
};
