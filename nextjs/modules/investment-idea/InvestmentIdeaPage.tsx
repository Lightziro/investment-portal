import React, { Fragment, useEffect } from "react";
import { Grid } from "@mui/material";
import { IdeaHeader } from "./components/idea-header/IdeaHeader";
import { CompanyDescription } from "./components/company-description/CompanyDescription";
import { IdeaAuthor } from "./components/idea-author/IdeaAuthor";
import { ChartStatsEPS } from "./components/charts-company-data/ChartStatsEPS";
import { IdeaInformation } from "./components/idea-information/IdeaInformation";
import { ChartStatsAnalytics } from "./components/charts-company-data/ChartStatsAnalytics";
import { CommentsList } from "../../components/smart/comments-list/CommentsList";
import { IdeaDescription } from "./components/idea-description/IdeaDescription";
import { useDispatch } from "react-redux";
import { useRootSelector } from "../../hooks/useTypeSelector";
import { IdeaRatings } from "./components/idea-ratings/IdeaRatings";
import {
    fetchCompanyStats,
    fetchIdeaComments,
    fetchIdeaRating,
} from "../../redux/actions/investmentIdeaActions";
import { IdeaView } from "../../ts/types/entity/idea.types";

interface InvestmentIdeaPage {
    ideaData: IdeaView;
    onChange: (state) => void;
}

export const InvestmentIdeaPage: React.FC<InvestmentIdeaPage> = ({
    ideaData,
    onChange,
}) => {
    const dispatch = useDispatch();
    console.log(ideaData);
    useEffect(() => {
        dispatch(fetchIdeaComments(ideaData.idea_id));
        dispatch(fetchIdeaRating(ideaData.idea_id));
        dispatch(fetchCompanyStats(ideaData.idea_id));
    }, []);
    const comments = useRootSelector((store) => store.view.idea.comments);
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
                        <IdeaHeader companyInfo={ideaData.company} />
                    </Grid>
                    <Grid item>
                        <CompanyDescription company={ideaData.company} />
                    </Grid>
                </Grid>
                <Grid xs={12} sm={4} md={4} item xl={3} lg={3}>
                    <IdeaAuthor data={ideaData.author} />
                </Grid>
                <Grid xs={12} sm={8} item md={5} xl={4} lg={4}>
                    <ChartStatsEPS />
                </Grid>
                <Grid xs={12} item lg={5} sm={7} md={7} xl={5}>
                    <IdeaDescription description={ideaData.description} />
                </Grid>
                <Grid item lg={3} md={4} xs={12} sm={5} xl={3}>
                    <IdeaInformation ideaInfo={ideaData} />
                </Grid>
                <Grid xs={12} md={4} sm={6} item xl={4} lg={4}>
                    <ChartStatsAnalytics />
                </Grid>
                <Grid xs={12} spacing={2} sm={6} item xl={3} md={4} lg={4}>
                    <IdeaRatings ideaId={ideaData.idea_id} />
                </Grid>
                <Grid sm={6} item xl={3} md={4}>
                    <CommentsList
                        entityId={ideaData.idea_id}
                        entityName="idea"
                        comments={comments}
                    />
                </Grid>
            </Grid>
        </Fragment>
    );
};
