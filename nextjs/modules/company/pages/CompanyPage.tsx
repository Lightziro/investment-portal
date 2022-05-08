import React, { useEffect } from "react";
import { Grid } from "@mui/material";
import { CompanyModel } from "../../../ts/types/entity/other.types";
import { useDispatch } from "react-redux";
import { fetchCompanyStats } from "../../../redux/actions/investmentIdeaActions";
import { useRootSelector } from "../../../hooks/useTypeSelector";
import { clearView } from "../../../redux/actions/viewActions";
import { CompanyHeader } from "../components/company-header/CompanyHeader";
import { Button } from "antd";
import { useTranslation } from "react-i18next";
import { ChartStats } from "../../../components/ordinary/charts/ChartStats";

interface CompanyPage {
    company: CompanyModel;
}

export const CompanyPage: React.FC<CompanyPage> = ({ company }) => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const { epsStats, netMarginStats } = useRootSelector(
        (state) => state.view.company
    );

    useEffect(() => {
        dispatch(clearView("company"));
        dispatch(fetchCompanyStats(company.company_id, "company"));
    }, []);
    return (
        <Grid spacing={2} direction="row" container>
            <Grid item sm={7}>
                <CompanyHeader
                    ticker={company.ticker}
                    name={company.name}
                    activity={company?.activity?.name}
                    currency={company.currency}
                />
            </Grid>
            <Grid item sm={5} spacing={2} container direction="row">
                <Grid item sm={12}>
                    <ChartStats statsData={epsStats} title="EPS Stats" />
                </Grid>
                <Grid item sm={12}>
                    <ChartStats
                        statsData={netMarginStats}
                        type="bar"
                        title="Net margins stats"
                    />
                </Grid>
            </Grid>
        </Grid>
    );
};
