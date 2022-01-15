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
import { IdeaDescription } from "./components/idea-description/IdeaDescription";
interface InvestmentIdeaPage {
    ideaData: InvestmentIdeaView;
}
export const InvestmentIdeaPage: React.FC<InvestmentIdeaPage> = ({
    ideaData,
}) => {
    return (
        <Fragment>
            <Grid justifyContent="center" container spacing={2}>
                <Grid
                    md={8}
                    container
                    item
                    lg={5}
                    xl={5}
                    spacing={2}
                    direction="column"
                >
                    <Grid item>
                        <IdeaHeader companyInfo={ideaData.companyInfo} />
                    </Grid>
                    <Grid item>
                        <CompanyDescription company={ideaData.companyInfo} />
                    </Grid>
                </Grid>
                <Grid xs={12} sm={4} md={4} item xl={3} lg={3}>
                    <IdeaAuthor data={ideaData.authorInfo} />
                </Grid>
                <Grid xs={12} sm={8} item md={5} xl={4} lg={4}>
                    <ChartStatsEPS epsData={ideaData.epsStats} />
                </Grid>
                <Grid xs={12} item lg={5} sm={7} md={7} xl={5}>
                    <IdeaDescription description={ideaData.description} />
                </Grid>
                <Grid item lg={3} md={4} xs={12} sm={5} xl={3}>
                    <IdeaInformation ideaInfo={ideaData.ideaInfo} />
                </Grid>
                <Grid xs={12} md={4} sm={6} item xl={4} lg={4}>
                    <ChartStatsAnalytics stats={ideaData.analyticsStats} />
                </Grid>
                <Grid sm={6} item xl={3} md={4}>
                    <CommentsList
                        entityId={ideaData.ideaId}
                        entityName="idea"
                        comments={ideaData.comments}
                        callbackEnter={createComment}
                    />
                </Grid>
            </Grid>
            <Divider sx={{ my: 2 }} />
        </Fragment>
    );
};
