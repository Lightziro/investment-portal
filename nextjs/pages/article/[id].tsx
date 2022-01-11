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
import { Fragment } from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { NextPage, NextPageContext } from "next";
import { getListNews } from "../../redux/utils/store.utils";
import { axios } from "../../utils/axios";
import { MainLayout } from "../../layouts/MainLayout";
import { Container, Paper } from "@mui/material";
import { Col, Row } from "react-bootstrap";
import { ArticleHeader } from "../../modules/article/components/article-header/ArticleHeader";
import { ArticlePage } from "../../modules/article/pages/ArticlePage";
import { useDispatch } from "react-redux";
import { setViewEntity } from "../../redux/actions/viewActions";
import { initStore } from "../../ts/types/redux/store.init";

function Article({ article }) {
    console.log("IS ARTICLE LOAD", article);
    return (
        <MainLayout title="Article">
            <ArticlePage />
        </MainLayout>
    );
}

export default Article;
export async function getServerSideProps({ query, req }) {
    console.log("STATES", process.initialState);
    const article = await axios
        .get(`${process.env.API_URL_DOCKER}/api/article/get/${query.id}`)
        .then((res) => res.data)
        .catch((e) => initStore.view.article);
    process.initialState.view = { article };
    return {
        props: { article },
    };
}
