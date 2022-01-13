import React, { Fragment } from "react";
import { Divider, Grid } from "@mui/material";
import { IdeaHeader } from "./components/idea-header/IdeaHeader";
import { CompanyDescription } from "./components/company-description/CompanyDescription";
import { IdeaAuthor } from "./components/idea-author/IdeaAuthor";
import { ChartStatsEPS } from "./components/charts-company-data/ChartStatsEPS";
import { IdeaInformation } from "./components/idea-information/IdeaInformation";
import { ChartStatsAnalytics } from "./components/charts-company-data/ChartStatsAnalytics";
import { CommentsList } from "../../components/smart/comments-list/CommentsList";
import { createComment } from "../../redux/actions/investmentIdeaActions";
import { InvestmentIdeaView } from "../../ts/types/redux/store.types";
interface InvestmentIdeaPage {
    ideaData: InvestmentIdeaView;
}
export const InvestmentIdeaPage: React.FC<InvestmentIdeaPage> = ({
    ideaData,
}) => {
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
        </Fragment>
    );
};
