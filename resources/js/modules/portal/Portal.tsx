import React, { Fragment, useEffect } from "react";
import { NewsSliderList } from "../../components/news-list/NewsSliderList";
import {
    Box,
    Button,
    Card,
    Container,
    Divider,
    Grid,
    Paper,
    Stack,
    Typography,
} from "@mui/material";
import { PortalNavBar } from "../../components/nav-bars/portal-nav-bar/PortalNavBar";
import { PortalStatsIdea } from "../../components/simple/portal-stats-idea/PortalStatsIdea";
import { fetchInvestmentData } from "../../redux/actions/mainActions";
import { useDispatch, useSelector } from "react-redux";
import { StoreData } from "../../ts/types/redux/store.types";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { NewsPortalList } from "../../components/news-list/NewsPortalList";
import { PortalAd } from "../../components/portal-ad/PortalAd";
import { IdeaStatistics } from "./idea-statistics/IdeaStatistics";

export const Portal: React.FC = () => {
    // const { t, i18n } = useTranslation();
    // const portalData = useSelector(
    //     (state: StoreData) => state.main.investmentData
    // );
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchInvestmentData());
    }, []);
    return (
        <Fragment>
            <Grid container spacing={2}>
                <Grid item xs={3}>
                    <NewsPortalList />
                </Grid>
                <Grid item xs={9}>
                    <Paper elevation={2} sx={{ p: 1, mb: 2 }}>
                        <Typography variant="h3">Investments</Typography>
                    </Paper>
                    <Grid container spacing={2}>
                        <Grid item xs={9}>
                            <Paper>Testick123</Paper>
                        </Grid>
                        <Grid item xs={3}>
                            <PortalAd />
                            <IdeaStatistics />
                        </Grid>
                    </Grid>
                </Grid>
                {/*<Grid item xs={8}>*/}
                {/*    <NewsSliderList />*/}
                {/*</Grid>*/}
                {/*<Grid item xs={4}>*/}
                {/*    <PortalStatsIdea*/}
                {/*        amount={portalData.bestProfit}*/}
                {/*        backgroundColor="#98fd72"*/}
                {/*        text="The best profit an investment idea has brought"*/}
                {/*    />*/}
                {/*    <PortalStatsIdea*/}
                {/*        amount={portalData.worseProfit}*/}
                {/*        backgroundColor="rgb(126 179 73)"*/}
                {/*        text="The worst profit an investment idea has brought"*/}
                {/*    />*/}
                {/*</Grid>*/}
            </Grid>
            {/*<Grid container spacing={2}>*/}
            {/*    <Grid item xs={8}>*/}
            {/*        <div>{t("testick")}</div>*/}
            {/*    </Grid>*/}
            {/*    <Grid item xs={4}>*/}
            {/*        <ListIdea ideas={portalData.actualIdeas} />*/}
            {/*    </Grid>*/}
            {/*</Grid>*/}
        </Fragment>
    );
};
