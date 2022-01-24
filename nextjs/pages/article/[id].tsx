import React, { useEffect } from "react";
import {
    GetServerSidePropsContext,
    GetStaticPropsContext,
    NextPage,
} from "next";
import { MainLayout } from "../../layouts/MainLayout";
import { ArticlePage } from "../../modules/article/pages/ArticlePage";
import { ArticleView } from "../../ts/types/entity/article.types";
import { getListNews, getViewEntity } from "../../utils/api/get-data";
import { News } from "../../ts/types/entity/stock-market.types";
import { useRouter } from "next/router";
import { PortalLayout } from "../../layouts/PortalLayout";
interface Article {
    article: ArticleView;
    news: News[];
}
const Article: NextPage<Article> = ({ article, news }) => {
    const router = useRouter();
    useEffect(() => {
        if (!article) {
            router.push("/404");
        }
    }, []);
    if (!article) {
        return null;
    }
    return (
        <MainLayout title={`${article.title}`}>
            <PortalLayout>
                <ArticlePage article={article} news={news} />
            </PortalLayout>
        </MainLayout>
    );
};

export default Article;
export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
    const article = await getViewEntity("article", ctx);
    const news = await getListNews();
    return {
        props: { article, news },
    };
};
