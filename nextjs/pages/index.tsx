import React from "react";
import { MainLayout } from "../layouts/MainLayout";
import { PaperWrapper } from "../components/simple/paper-wrapper/PaperWrapper";
import { ArticleList } from "../components/smart/article-list/ArticleList";
import { PortalAd } from "../components/simple/portal-ad/PortalAd";
import { IdeaStatistics } from "../components/ordinary/ideas-statistics/IdeaStatistics";
import { IdeaList } from "../components/smart/ideas-list/IdeaList";
import { NewsList } from "../components/ordinary/news-list/NewsList";
import { GetStaticProps, NextPage } from "next";
import { Grid } from "@mui/material";
import {
    getBasePortal,
    getListNews,
    getQuotePortal,
} from "../utils/api/get-data";
import { News } from "../ts/types/entity/stock-market.types";
import { DtoPortal, DtoQuoteItem } from "../ts/types/response/response.types";
import { PortalLayout } from "../layouts/PortalLayout";
import { HeaderBestQuote } from "../modules/portal/components/header-best-quote/HeaderBestQuote";
interface Index {
    news: News[];
    baseData: DtoPortal;
    quotesData: DtoQuoteItem[];
}
const MainPage: NextPage<Index> = ({ news, baseData, quotesData }) => {
    return (
        <MainLayout title="Главная страница">
            <PortalLayout>
                <Grid container spacing={3}>
                    <Grid
                        display={{ xs: "none", sm: "none", md: "block" }}
                        item
                        md={3}
                    >
                        <NewsList items={news} />
                    </Grid>
                    <Grid xs={false} item md={9}>
                        <HeaderBestQuote items={quotesData} />
                        <Grid container spacing={3}>
                            <Grid direction="column" item md={9} sm={12}>
                                <ArticleList
                                    popular={baseData.articles.popular}
                                    simple={baseData.articles.simple}
                                />
                            </Grid>
                            <Grid item sm={12} md={3}>
                                <PortalAd />
                                <IdeaStatistics stats={baseData.stats} />
                                <IdeaList items={baseData.ideas} />
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
    const quotesData = await getQuotePortal();
    return {
        props: {
            news,
            baseData,
            quotesData,
        },
        revalidate: 20,
    };
};
