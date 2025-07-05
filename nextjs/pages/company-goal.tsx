import { NextPage } from "next";
import React from "react";
import { MainLayout } from "../layouts/MainLayout";
import { PortalLayout } from "../layouts/PortalLayout";
import AboutPage from "../modules/portal/pages/AboutPage/AboutPage";

const CompanyGoal: NextPage = () => {
    return (
        <MainLayout title="Test">
            <PortalLayout>
                <AboutPage />
            </PortalLayout>
        </MainLayout>
    );
};

export default CompanyGoal;
