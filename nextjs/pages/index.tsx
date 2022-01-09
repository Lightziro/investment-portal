import React, { useEffect } from "react";
import { MainLayout } from "../layouts/MainLayout";
import { Col, Row } from "react-bootstrap";
import { PaperWrapper } from "../components/simple/paper-wrapper/PaperWrapper";
import { ArticleList } from "../components/smart/article-list/ArticleList";
import { PortalAd } from "../components/simple/portal-ad/PortalAd";
import { IdeaStatistics } from "../components/ordinary/ideas-statistics/IdeaStatistics";
import { IdeaList } from "../components/smart/ideas-list/IdeaList";
import { Typography } from "../components/simple/typography/Typography";
import { NewsList } from "../components/ordinary/news-list/NewsList";
import { NextPage } from "next";
import { getInitialState, getListNews } from "../redux/utils/store.utils";

const Index = ({ news }) => {
    console.log("INDEX PAGE", news);
    if (!process.browser && process.initialState) {
        console.log("SET!");
        process.initialState.main["news"] = news;
    }
    useEffect(() => {}, []);
    return (
        <MainLayout title="Главная страница">
            <Row>
                <Col xs={false} sm={false} md={3}>
                    <NewsList />
                </Col>
                <Col md={9}>
                    <PaperWrapper>
                        <Typography level={3}>Investments</Typography>
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

export async function getServerSideProps({ params }) {
    const news = await getListNews();
    return {
        props: { news },
    };
}
