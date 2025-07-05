import React, { useEffect } from "react";
import { MainLayout } from "../layouts/MainLayout";
import { ArticleList } from "../components/smart/article-list/ArticleList";
import { PortalAd } from "../components/simple/portal-ad/PortalAd";
import { IdeaList } from "../components/smart/ideas-list/IdeaList";
import { NewsList } from "../components/ordinary/news-list/NewsList";
import { GetStaticProps, NextPage } from "next";
import { Grid } from "@mui/material";
import { getBasePortal, getListNews } from "../utils/api/get-data";
import { News } from "../ts/types/entity/stock-market.types";
import { DtoPortal } from "../ts/types/response/response.types";
import { PortalLayout } from "../layouts/PortalLayout";
import { HeaderBestQuote } from "../modules/portal/components/header-best-quote/HeaderBestQuote";
import MainPage from "../modules/portal/pages/MainPage/MainPage";
const Index: NextPage = () => {
    return (
        <MainLayout title="Главная страница">
            <PortalLayout>
                <MainPage />
            </PortalLayout>
        </MainLayout>
    );
};
export default Index;
// export const getStaticProps: GetStaticProps = async () => {
//     // const news = await getListNews();
//     // const baseData = await getBasePortal();
//     return {
//         props: {
//             news: [],
//             baseData: {},
//         },
//         revalidate: 20,
//     };
// };
