import React from "react";
import { MainLayout } from "../layouts/MainLayout";
import { PaperWrapper } from "../components/simple/paper-wrapper/PaperWrapper";
import { ArticleList } from "../components/smart/article-list/ArticleList";
import { PortalAd } from "../components/simple/portal-ad/PortalAd";
import { IdeaStatistics } from "../components/ordinary/ideas-statistics/IdeaStatistics";
import { IdeaList } from "../components/smart/ideas-list/IdeaList";
import { Typography } from "../components/simple/typography/Typography";
import { NewsList } from "../components/ordinary/news-list/NewsList";
import { GetServerSideProps, NextPage } from "next";
import { Grid } from "@mui/material";
import { getBasePortal, getListNews } from "../utils/api/get-data";
import { News } from "../ts/types/entity/stock-market.types";
import { DtoPortal } from "../ts/types/response/response.types";
import { PortalLayout } from "../layouts/PortalLayout";
interface Index {
    news: News[];
    baseData: DtoPortal;
}
const MainPage: NextPage<Index> = ({ news, baseData }) => {
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
                        <PaperWrapper>
                            <Typography level={3}>Investments</Typography>
                        </PaperWrapper>
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
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const news = await getListNews();
    const baseData = await getBasePortal();
    return {
        props: {
            news,
            baseData,
        },
    };
};
// export const getServerSideProps = async (ctx) => {
//     let initMain = initMainStore;
//     if (!process.browser) {
//         const portalData = await getInitPortal();
//         const news = await getListNews();
//         initMain = { ...initMain, news, ...portalData };
//         process.initialState.main = initMain;
//     }
//     return {
//         props: {
//             initMain,
//         },
//     };
// };
