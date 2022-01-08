import React, { useEffect } from "react";
import { NextPage, NextPageContext } from "next";
import {
    fetchInvestmentData,
    setPortalData,
} from "../redux/actions/mainActions";
import { wrapper } from "../redux/store/Store";
import { ArticleList } from "../components/smart/article-list/ArticleList";
import { IdeaStatistics } from "../components/ordinary/ideas-statistics/IdeaStatistics";
import { useDispatch, useSelector } from "react-redux";
import { StoreData } from "../ts/types/redux/store.types";
import { Col, Row } from "react-bootstrap";
import { PaperWrapper } from "../components/simple/paper-wrapper/PaperWrapper";
import { Typography } from "antd";
import { PortalAd } from "../components/simple/portal-ad/PortalAd";
import { IdeaList } from "../components/smart/ideas-list/IdeaList";
import { MainLayout } from "../layouts/MainLayout";
import { axios, instanceAxios } from "../utils/axios";
// export const getServerSideProps = wrapper.getServerSideProps(
//     (store) => async () => {
//         const dispatch = store.dispatch;
//         await dispatch(await fetchInvestmentData());
//     }
// );

export default function Index({ data }) {
    // console.log("PROPS", data);
    // const dispatch = useDispatch();
    // useEffect(() => {
    //     dispatch(setPortalData(data));
    // }, []);
    const asd = useSelector((store: StoreData) => store);
    if (process.browser) {
        console.log("BASE STORE", window.__PRELOADED_STATE__);
    }
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
}
