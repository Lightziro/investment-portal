import React, { useEffect, useRef } from "react";
import { Grid } from "@mui/material";
import { CompanyModel } from "../../../ts/types/entity/other.types";
import { useDispatch } from "react-redux";
import { fetchCompanyStats } from "../../../redux/actions/investmentIdeaActions";
import { useRootSelector } from "../../../hooks/useTypeSelector";
import { clearView } from "../../../redux/actions/viewActions";
import { CompanyHeader } from "../components/company-header/CompanyHeader";
import { useTranslation } from "react-i18next";
import { ChartStats } from "../../../components/ordinary/charts/ChartStats";
import { Entity } from "../../../ts/enums/other.enums";

interface CompanyPage {
    company: CompanyModel;
}

export const CompanyPage: React.FC<CompanyPage> = ({ company }) => {
    const dispatch = useDispatch();
    const container = useRef();

    const { t } = useTranslation();
    const { epsStats, netMarginStats, salePerShare } = useRootSelector(
        (state) => state.view.company
    );

    useEffect(() => {
        dispatch(clearView(Entity.Company));
        dispatch(fetchCompanyStats(company.company_id, Entity.Company));
    }, []);
    console.log(company);

    useEffect(() => {
        const script = document.createElement("script");
        script.src =
            "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
        script.type = "text/javascript";
        script.async = true;
        script.innerHTML = `
        {
          "symbol": "NASDAQ:${company.ticker}",
          "interval": "D",
          "height": "500",
          "timezone": "Etc/UTC",
          "theme": "light",
          "style": "1",
          "locale": "ru",
          "enable_publishing": false,
          "allow_symbol_change": true,
          "calendar": false,
          "support_host": "https://www.tradingview.com"
        }`;
        container.current.appendChild(script);
    }, []);

    return (
        <div className="flex">
            <CompanyHeader
                ticker={company.ticker}
                name={company.name}
                activity={company?.activity?.name}
                currency={company.currency}
                logoPath={company.logo_path}
            />
            <div
                className="tradingview-widget-container"
                ref={container}
                style={{ height: "500", width: "100%" }}
            ></div>
        </div>
    );

    return (
        <Grid spacing={2} direction="row" container>
            <Grid md={7} item sm={12} direction="column" xs={12} spacing={2}>
                <Grid mb={2} item xs={12}></Grid>
                <Grid item xs={12}>
                    {/*<ChartStats*/}
                    {/*    hintName="Value"*/}
                    {/*    statsData={salePerShare}*/}
                    {/*    title="Sales per share"*/}
                    {/*/>*/}
                </Grid>
            </Grid>
            {/*<Grid md={5} item sm={12} xs={12} direction="column">*/}
            {/*    <Grid mb={2} item sm={12} xs={12}>*/}
            {/*        <ChartStats*/}
            {/*            hintName="Value"*/}
            {/*            statsData={epsStats}*/}
            {/*            title="EPS Stats"*/}
            {/*        />*/}
            {/*    </Grid>*/}
            {/*    <Grid item sm={12} xs={12}>*/}
            {/*        <ChartStats*/}
            {/*            statsData={netMarginStats}*/}
            {/*            type="bar"*/}
            {/*            title="Net margins stats"*/}
            {/*            hintName="Value"*/}
            {/*        />*/}
            {/*    </Grid>*/}
            {/*</Grid>*/}
        </Grid>
    );
};
