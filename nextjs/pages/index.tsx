import React, { useEffect } from "react";
import { NextPage } from "next";
import { fetchInvestmentData } from "../redux/actions/mainActions";
import { wrapper } from "../redux/store/Store";
import { ArticleList } from "../components/smart/article-list/ArticleList";
import { IdeaStatistics } from "../components/ordinary/ideas-statistics/IdeaStatistics";
import { useSelector } from "react-redux";
import { StoreData } from "../ts/types/redux/store.types";
import { Col, Row } from "react-bootstrap";
import { PaperWrapper } from "../components/simple/paper-wrapper/PaperWrapper";
import { Typography } from "antd";
import { PortalAd } from "../components/simple/portal-ad/PortalAd";
import { IdeaList } from "../components/smart/ideas-list/IdeaList";
import { MainLayout } from "../layouts/MainLayout";
import axios from "axios";
import axiosApi from "../utils/axiosApi";
import { useAuth } from "../utils/auth";
export const getServerSideProps = wrapper.getServerSideProps(
    (store) => async () => {
        const dispatch = store.dispatch;
        await dispatch(await fetchInvestmentData());
    }
);

// export const getStaticProps = wrapper.getStaticProps((store) => async () => {
//     const dispatch = store.dispatch;
//     await dispatch(await fetchInvestmentData());s
// });

const Index: NextPage = () => {
    const test = useSelector((state: StoreData) => state.main);
    // const { user } = useAuth({ middleware: "guest" });
    console.log(test);
    // useEffect(() => {
    //     axiosApi()
    //         .get(`${process.env.API_URL}/api/sanctum/csrf-cookie`)
    //         .then(() => {
    //             console.log("TRUE!!!");
    //             // axiosApi()
    //             //     .get("/api/user", {
    //             //         headers: {
    //             //             Authorization: `Bearer ${localStorage.getItem(
    //             //                 "token"
    //             //             )}`,
    //             //         },
    //             //     })
    //             //     .then((response) => console.log(response.data))
    //             //     .catch((e) => console.log(e));
    //         })
    //         .catch((e) => console.log(e));
    //     // axiosApi()
    //     //     .get("/api/user", {
    //     //         // headers: {
    //     //         //     Authorization: `Bearer ${localStorage.getItem("token")}`,
    //     //         // },
    //     //     })
    //     //     .then((response) => console.log(response.data))
    //     //     .catch((e) => console.log(e));
    //     // // axios
    //     //     .get(`${process.env.API_URL}/api/user`, {
    //     //         headers: {
    //     //             Authorization: `Bearer ${localStorage.getItem("token")}`,
    //     //         },
    //     //     })
    //     //     .then((response) => console.log(response.data))
    //     //     .catch((e) => console.log("ERROR", e));
    //     // const user = axios
    //     //     .get(`${process.env.API_URL}/authentication`, {
    //     //         headers: {
    //     //             Authorization: `Bearer ${localStorage.getItem("token")}`,
    //     //             "Access-Control-Allow-Origin": "*",
    //     //         },
    //     //         // withCredentials: true,
    //     //     })
    //     //     .then(() => {
    //     //         console.log("NEXT GO!");
    //     //         // try {
    //     //         //     return axios
    //     //         //         .get(`${process.env.API_URL}/api/authentication`, {
    //     //         //             headers: {
    //     //         //                 Authorization: `Bearer ${action.token}`,
    //     //         //             },
    //     //         //         })
    //     //         //         .then((response) => response.data);
    //     //         // } catch (e) {}
    //     //     })
    //     //     .catch((e) => console.error("ERROR", e));
    //     // dispatch(getUser(localStorage.getItem("token")));
    // }, []);
    return (
        <MainLayout title="Главная страница">
            <Row>
                <Col xs={false} sm={false} md={3}>
                    Test
                </Col>
                <Col md={9}>
                    <PaperWrapper>
                        <Typography.Title level={3}>
                            Investments
                        </Typography.Title>
                    </PaperWrapper>
                    <Row>
                        <Col md={9} sm={12}>
                            <ArticleList />
                        </Col>
                        <Col sm={12} md={3}>
                            <PortalAd />
                            <IdeaStatistics />
                            <IdeaList />
                        </Col>
                    </Row>
                </Col>
            </Row>
            {/*<Grid spacing={3}>*/}
            {/*    <Grid*/}
            {/*        // display={{ xs: "none", sm: "none", md: "block" }}*/}
            {/*        item*/}
            {/*        // md={3}*/}
            {/*    >*/}
            {/*        /!*<NewsPortalList />*!/*/}
            {/*    </Grid>*/}
            {/*    <Grid xs={false} item md={9}>*/}
            {/*        <Paper elevation={2} sx={{ p: 1, mb: 2 }}>*/}
            {/*            <typography variant="h3">Investments</typography>*/}
            {/*        </Paper>*/}
            {/*        <Grid container spacing={3}>*/}
            {/*            <Grid direction="column" item md={9} sm={12}>*/}
            {/*                <ArticleList />*/}
            {/*            </Grid>*/}
            {/*            <Grid item sm={12} md={3}>*/}
            {/*                /!*<PortalAd />*!/*/}
            {/*                /!*<IdeaStatistics />*!/*/}
            {/*                /!*<IdeaList />*!/*/}
            {/*            </Grid>*/}
            {/*        </Grid>*/}
            {/*    </Grid>*/}
            {/*</Grid>*/}
        </MainLayout>
    );
};
export default Index;
