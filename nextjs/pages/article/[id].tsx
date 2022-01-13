// import { NextPage, NextPageContext } from "next";
//
// const Article: NextPage = ({ article }) => {
//     return <div>{JSON.stringify(article)}</div>;
// };
// export default Article;
//
// Article.getInitialProps = async ({ query, req }: NextPageContext) => {
//     if (!req) {
//         return { article: null };
//     }
//     console.log("UGU UGU UGU");
//     const response = await fetch(
//         `${process.env.API_URL_DOCKER}/api/article/get/${query.id}`
//     );
//     const article = await response.json();
//     console.log("IS ARTICLE", article);
//
//     return {
//         article,
//     };
// };
import React from "react";
import { useState, useEffect } from "react";
import { GetServerSidePropsContext } from "next";
import { getViewEntity } from "../../redux/utils/store.utils";
import { MainLayout } from "../../layouts/MainLayout";
import { ArticlePage } from "../../modules/article/pages/ArticlePage";
import { useDispatch } from "react-redux";
import { setViewEntity } from "../../redux/actions/viewActions";
import { ArticleView } from "../../ts/types/state/article.types";
interface Article {
    article: ArticleView;
}
const Article: React.FC<Article> = ({ article }) => {
    const dispatch = useDispatch();
    useEffect(() => {
        if (process.browser) {
            dispatch(setViewEntity(article, "article"));
        }
    }, []);

    return (
        <MainLayout title={`Article`}>
            <ArticlePage />
        </MainLayout>
    );
};

export default Article;
export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
    const article = await getViewEntity("article", ctx);
    process.initialState.view = { article };
    return {
        props: { article },
    };
};
