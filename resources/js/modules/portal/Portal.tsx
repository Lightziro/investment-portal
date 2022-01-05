import React, { Fragment, useEffect } from "react";
import { Grid, Paper, Typography } from "@mui/material";
import { fetchInvestmentData } from "../../../../nextjs/redux/actions/mainActions";
import { useDispatch } from "react-redux";
import { NewsPortalList } from "../../components/news-list/NewsPortalList";
import { PortalAd } from "../../../../nextjs/components/simple/portal-ad/PortalAd";
import { IdeaStatistics } from "../../../../nextjs/components/ordinary/ideas-statistics/IdeaStatistics";
import { IdeaList } from "../../../../nextjs/components/smart/ideas-list/IdeaList";
import { ArticleList } from "../../../../nextjs/components/smart/article-list/ArticleList";

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
            <Grid container spacing={3}>
                <Grid
                    display={{ xs: "none", sm: "none", md: "block" }}
                    item
                    md={3}
                >
                    <NewsPortalList />
                </Grid>
                <Grid xs={false} item md={9}>
                    <Paper elevation={2} sx={{ p: 1, mb: 2 }}>
                        <Typography variant="h3">Investments</Typography>
                    </Paper>
                    <Grid container spacing={3}>
                        <Grid direction="column" item md={9} sm={12}>
                            <ArticleList />
                            <div>Test</div>
                        </Grid>
                        <Grid item sm={12} md={3}>
                            <PortalAd />
                            <IdeaStatistics />
                            <IdeaList />
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
