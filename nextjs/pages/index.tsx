import React from "react";
import { MainLayout } from "../layouts/MainLayout";
import { NextPage } from "next";
import { PortalLayout } from "../layouts/PortalLayout/PortalLayout";
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
