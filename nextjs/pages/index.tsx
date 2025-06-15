import React, { useEffect } from "react";
import { MainLayout } from "../layouts/MainLayout";
import { ArticleList } from "../components/smart/article-list/ArticleList";
import { PortalAd } from "../components/simple/portal-ad/PortalAd";
import { IdeaStatistics } from "../components/ordinary/ideas-statistics/IdeaStatistics";
import { IdeaList } from "../components/smart/ideas-list/IdeaList";
import { NewsList } from "../components/ordinary/news-list/NewsList";
import { GetStaticProps, NextPage } from "next";
import { Grid } from "@mui/material";
import { getBasePortal, getListNews } from "../utils/api/get-data";
import { News } from "../ts/types/entity/stock-market.types";
import { DtoPortal } from "../ts/types/response/response.types";
import { PortalLayout } from "../layouts/PortalLayout";
import { HeaderBestQuote } from "../modules/portal/components/header-best-quote/HeaderBestQuote";
import Echo from "laravel-echo";
import Pusher from "pusher-js";
interface Index {
    news: News[];
    baseData: DtoPortal;
}
const MainPage: NextPage<Index> = ({ news, baseData }) => {
    // useEffect(() => {
    //     window.Pusher = Pusher;
    //     const echo = new Echo({
    //         wsHost: 'localhost',
    //         wsPort: '6001',
    //         broadcaster: 'pusher',
    //         enabledTransports: ['ws'],
    //         key: '02022002',
    //         cluster: 'mt1',
    //         forceTLS: false
    //     });
    // }, [])
    return (
        <MainLayout title="Главная страница">
            <PortalLayout>
                <Grid container direction="row" spacing={3}>
                    <Grid
                        display={{ xs: "none", sm: "none", md: "block" }}
                        item
                        md={3}
                        direction="row"
                    >
                        <NewsList items={news} />
                    </Grid>
                    <Grid item direction="row" md={9}>
                        <HeaderBestQuote />
                        <Grid container direction="row" spacing={3}>
                            <Grid direction="column" item md={9} sm={12}>
                                <ArticleList
                                    popular={baseData?.articles?.popular}
                                    simple={baseData?.articles?.simple}
                                />
                                {/*<StockList />*/}
                            </Grid>
                            <Grid direction="column" item sm={12} md={3}>
                                <PortalAd />

                                {/*<IdeaStatistics stats={baseData?.stats} />*/}
                                <IdeaList items={baseData?.ideas} />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </PortalLayout>
        </MainLayout>
    );
};
export default MainPage;
export const getStaticProps: GetStaticProps = async () => {
    const news = await getListNews();
    const baseData = await getBasePortal();
    return {
        props: {
            news,
            baseData,
        },
        revalidate: 20,
    };
};
