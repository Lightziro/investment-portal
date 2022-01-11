import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Divider, Grid } from "@mui/material";
import { StoreData } from "../../ts/types/redux/store.types";
import { CommentsList } from "../../components/smart/comments-list/CommentsList";
import { createComment } from "../../redux/actions/investmentIdeaActions";
import {
    clearView,
    fetchInvestmentIdea,
} from "../../redux/actions/mainActions";
import { NextPage } from "next";
import { MainLayout } from "../../layouts/MainLayout";
import { IdeaHeader } from "../../modules/investment-idea/components/idea-header/IdeaHeader";
import { CompanyDescription } from "../../modules/investment-idea/components/company-description/CompanyDescription";
import { IdeaAuthor } from "../../modules/investment-idea/components/idea-author/IdeaAuthor";
import { ChartStatsEPS } from "../../modules/investment-idea/components/charts-company-data/ChartStatsEPS";
import { useTranslation } from "react-i18next";
import { ChartStatsAnalytics } from "../../modules/investment-idea/components/charts-company-data/ChartStatsAnalytics";
import { IdeaInformation } from "../../modules/investment-idea/components/idea-information/IdeaInformation";

const InvestmentIdea: NextPage = ({ ideaId }) => {
    const dispatch = useDispatch();
    const ideaData = useSelector((state: StoreData) => state.view.idea);
    const { t } = useTranslation();
    useEffect(() => {
        if (Number(ideaId) !== ideaData.ideaId) {
            dispatch(clearView("idea"));
            dispatch(fetchInvestmentIdea(parseInt(ideaId)));
        }
    }, []);
    let companyName = "";
    if (ideaData.companyInfo) {
        companyName = ideaData.companyInfo.companyName;
    }
    return (
        <MainLayout title={`${t("Investment idea")} - ${companyName}`}>
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
                                <IdeaHeader
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
                        {/*<IdeaDescription description={ideaData.description} />*/}
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
                <Grid item xs={3}>
                    <CommentsList
                        entityId={ideaData.ideaId}
                        entityName="idea"
                        comments={ideaData.comments}
                        callbackEnter={createComment}
                    />
                </Grid>
            </Grid>
        </MainLayout>
    );
};
export default InvestmentIdea;
export async function getServerSideProps({ query, req }) {
    return {
        props: { ideaId: query.id },
    };
}
