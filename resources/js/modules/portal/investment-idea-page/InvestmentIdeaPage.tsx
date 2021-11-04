import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchInvestmentIdea } from "../../../redux/actions/mainActions";
import { StoreData } from "../../../ts/types/redux/store.types";
import { Divider, Grid, Typography } from "@mui/material";
import { ChartStatsEPS } from "./charts-company-data/ChartStatsEPS";
import { ChartStatsAnalytics } from "./charts-company-data/ChartStatsAnalytics";
import { IdeaAuthor } from "./idea-author/IdeaAuthor";
import { CompanyIdeaHeader } from "../../../components/simple/company-idea-header/CompanyIdeaHeader";
import { CompanyDescription } from "./company-description/CompanyDescription";

export const InvestmentIdeaPage: React.FC = () => {
    const dispatch = useDispatch();
    const ideaData = useSelector((state: StoreData) => state.main.ideaView);
    const { ideaId } = useParams();
    useEffect(() => {
        dispatch(fetchInvestmentIdea(parseInt(ideaId)));
    }, []);

    return (
        <div>
            <Grid container spacing={2}>
                <Grid item xs={8} container spacing={3}>
                    <Grid item xs={8}>
                        <Grid
                            spacing={2}
                            container
                            direction="column"
                            justifyContent="flex-start"
                        >
                            <Grid item>
                                <CompanyIdeaHeader
                                    companyInfo={ideaData.companyInfo}
                                />
                            </Grid>
                            <Grid item>
                                <CompanyDescription
                                    company={ideaData.companyInfo}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={4}>
                        <IdeaAuthor data={ideaData.authorInfo} />
                    </Grid>
                </Grid>
                <Grid item xs={4}>
                    <ChartStatsEPS epsData={ideaData.epsStats} />
                </Grid>
            </Grid>
            <Divider sx={{ my: 2 }} />
            <Grid container spacing={2}>
                <Grid item xs={8} container spacing={3}>
                    <Grid item xs={7}></Grid>
                    <Grid item xs={5}></Grid>
                </Grid>
                <Grid item xs={4}>
                    <ChartStatsAnalytics stats={ideaData.analyticsStats} />
                </Grid>
            </Grid>
        </div>
    );
};
