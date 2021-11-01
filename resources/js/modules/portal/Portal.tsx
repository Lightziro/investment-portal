import React, { Fragment, useEffect } from "react";
import { NewsSliderList } from "../../components/news-list/NewsSliderList";
import { Container, Grid } from "@mui/material";
import { PortalNavBar } from "../../components/nav-bars/portal-nav-bar/PortalNavBar";
import { PortalStatsIdea } from "../../components/simple/portal-stats-idea/PortalStatsIdea";
import { fetchInvestmentData } from "../../redux/actions/mainActions";
import { useDispatch, useSelector } from "react-redux";
import { StoreData } from "../../ts/types/redux/store.types";
import { ListIdea } from "../../components/simple/list-ideas/ListIdea";

export const Portal: React.FC = () => {
    const portalData = useSelector(
        (state: StoreData) => state.main.investmentData
    );
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchInvestmentData());
    }, []);
    return (
        <Fragment>
            <PortalNavBar />
            <div className="page-wrapper">
                <div className="portal-section-wrapper">
                    <div className="upper-area">
                        <NewsSliderList />
                    </div>
                    <div className="stats-invest-ideas-wrapper">
                        <PortalStatsIdea
                            amount={portalData.bestProfit}
                            backgroundColor="#98fd72"
                            text="The best profit an investment idea has brought"
                        />
                        <PortalStatsIdea
                            amount={portalData.worseProfit}
                            backgroundColor="rgb(126 179 73)"
                            text="The worst profit an investment idea has brought"
                        />
                    </div>
                </div>
                <Grid container spacing={2}>
                    <Grid item xs={8}>
                        <div>Testick</div>
                    </Grid>
                    <Grid item xs={4}>
                        <ListIdea ideas={portalData.actualIdeas} />
                    </Grid>
                </Grid>
            </div>
        </Fragment>
    );
};
