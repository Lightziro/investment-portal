import React, { useEffect, Fragment } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    clearView,
    fetchInvestmentIdea,
} from "../../../redux/actions/mainActions";
import { StoreData } from "../../../ts/types/redux/store.types";
import { Divider, Grid } from "@mui/material";
import { ChartStatsEPS } from "./charts-company-data/ChartStatsEPS";
import { ChartStatsAnalytics } from "./charts-company-data/ChartStatsAnalytics";
import { IdeaAuthor } from "./idea-author/IdeaAuthor";
import { CompanyIdeaHeader } from "../../../components/simple/company-idea-header/CompanyIdeaHeader";
import { CompanyDescription } from "./IdeaInformation/CompanyDescription";
import { IdeaDescription } from "./idea-description/IdeaDescription";
import { IdeaInformation } from "./company-description/IdeaInformation";

export const InvestmentIdeaPage: React.FC = () => {
    const dispatch = useDispatch();
    const ideaData = useSelector((state: StoreData) => state.view.idea);
    const { ideaId } = useParams();
    useEffect(() => {
        if (Number(ideaId) !== ideaData.ideaId) {
            dispatch(clearView("idea"));
            dispatch(fetchInvestmentIdea(parseInt(ideaId)));
        }
    }, []);

    return (
        <Fragment>
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
                    <Grid item xs={7}>
                        <IdeaDescription description={ideaData.description} />
                    </Grid>
                    <Grid item xs={5}>
                        <IdeaInformation ideaInfo={ideaData.ideaInfo} />
                    </Grid>
                </Grid>
                <Grid item xs={4}>
                    <ChartStatsAnalytics stats={ideaData.analyticsStats} />
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={9}>
                    Test
                </Grid>
                {/*<Grid item xs={3}>*/}
                {/*    <IdeaComments />*/}
                {/*</Grid>*/}
            </Grid>
        </Fragment>
    );
};
