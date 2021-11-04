import React from "react";
import {
    Card,
    Grid,
    Stack,
    Avatar,
    Skeleton,
    Divider,
    Typography,
} from "@mui/material";
import { CompanyIdeaInfo } from "../../../ts/types/state/stock-market.types";
interface CompanyIdeaHeader {
    companyInfo: CompanyIdeaInfo;
}
export const CompanyIdeaHeader: React.FC<CompanyIdeaHeader> = ({
    companyInfo,
}) => {
    if (!companyInfo) {
        return <Skeleton variant="rectangular" height={56} />;
    }
    const getSymbolQuote = (changeToday: number) => {
        return changeToday > 0 ? "+" : "-";
    };
    const getColorQuote = (changeToday: number) => {
        return changeToday > 0 ? "green" : "red";
    };
    return (
        <Card sx={{ bgcolor: "white", p: 1 }} className="shadow-wrapper">
            <Grid direction="column">
                <Stack alignItems="center" direction="row" spacing={2}>
                    <Avatar src="/image/picture/company-logo/apple.png" />
                    <span>{`${companyInfo.companyName}(${companyInfo.ticker})`}</span>
                    <Divider
                        className="hr-separator"
                        orientation="vertical"
                        flexItem
                    />
                    <Typography variant="h6" gutterBottom component="div">
                        ${companyInfo.lastQuote}
                    </Typography>
                    <span
                        className="quote-change"
                        style={{
                            color: getColorQuote(companyInfo.changeToday),
                        }}
                    >
                        {companyInfo.changeToday}
                    </span>
                    <span
                        className="quote-change-percent"
                        style={{
                            color: getColorQuote(companyInfo.changeToday),
                        }}
                    >
                        (
                        {`${getSymbolQuote(
                            companyInfo.changeToday
                        )}${companyInfo.percentChangeToday.toFixed(2)}`}
                        %)
                    </span>
                </Stack>
            </Grid>
        </Card>
    );
};
