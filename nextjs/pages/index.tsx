import React from "react";
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
export const getServerSideProps = wrapper.getServerSideProps(
    (store) => async () => {
        const dispatch = store.dispatch;
        await dispatch(await fetchInvestmentData());
    }
);

// export const getStaticProps = wrapper.getStaticProps((store) => async () => {
//     const dispatch = store.dispatch;
//     await dispatch(await fetchInvestmentData());
// });

const Index: NextPage = () => {
    const test = useSelector((state: StoreData) => state.main);
    console.log(test);
    return (
        <div className="wrapper-site">
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
        </div>
    );
};
export default Index;
