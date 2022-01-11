import React, { useEffect } from "react";
import { MainLayout } from "../layouts/MainLayout";
import { PaperWrapper } from "../components/simple/paper-wrapper/PaperWrapper";
import { ArticleList } from "../components/smart/article-list/ArticleList";
import { PortalAd } from "../components/simple/portal-ad/PortalAd";
import { IdeaStatistics } from "../components/ordinary/ideas-statistics/IdeaStatistics";
import { IdeaList } from "../components/smart/ideas-list/IdeaList";
import { Typography } from "../components/simple/typography/Typography";
import { NewsList } from "../components/ordinary/news-list/NewsList";
import { getInitPortal, getListNews } from "../redux/utils/store.utils";
import { NextPage } from "next";
import { MainStore } from "../ts/types/redux/store.types";
import { initMainStore } from "../ts/types/redux/store.init";
import { useDispatch } from "react-redux";
import { setPortalData } from "../redux/actions/mainActions";
import { Grid } from "@mui/material";
interface Index {
    initMain: MainStore;
}
const Index: NextPage<Index> = ({ initMain }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        if (process.browser && initMain) {
            dispatch(setPortalData(initMain));
        }
    }, []);

    return (
        <MainLayout title="Главная страница">
            <Grid container spacing={3}>
                <Grid
                    display={{ xs: "none", sm: "none", md: "block" }}
                    item
                    md={3}
                >
                    <NewsList />
                </Grid>
                <Grid xs={false} item md={9}>
                    <PaperWrapper>
                        <Typography level={3}>Investments</Typography>
                    </PaperWrapper>
                    <Grid container spacing={3}>
                        <Grid direction="column" item md={9} sm={12}>
                            <ArticleList />
                        </Grid>
                        <Grid item sm={12} md={3}>
                            <PortalAd />
                            <IdeaStatistics />
                            <IdeaList />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </MainLayout>
    );
};
export default Index;
export const getServerSideProps = async (ctx) => {
    let initMain = initMainStore;
    if (!process.browser) {
        const portalData = await getInitPortal();
        const news = await getListNews();
        initMain = { ...initMain, news, ...portalData };
        process.initialState.main = initMain;
    }
    return {
        props: {
            initMain,
        },
    };
};
