import React from "react";
import { GetServerSidePropsContext } from "next";
import { MainLayout } from "../../layouts/MainLayout";
import { ArticlePage } from "../../modules/article/pages/ArticlePage";
import { ArticleView } from "../../ts/types/entity/article.types";
import { getListNews, getViewEntity } from "../../utils/api/get-data";
import { News } from "../../ts/types/entity/stock-market.types";
interface Article {
    article: ArticleView;
    news: News[];
}
const Article: React.FC<Article> = ({ article, news }) => {
    return (
        <MainLayout title={`${article.title}`}>
            <ArticlePage article={article} news={news} />
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
