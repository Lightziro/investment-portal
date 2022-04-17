import { NextPage } from "next";
import React from "react";
import { MainLayout } from "../layouts/MainLayout";
import { PortalLayout } from "../layouts/PortalLayout";

const CompanyGoal: NextPage = () => {
    return (
        <MainLayout title="Test">
            <PortalLayout></PortalLayout>
        </MainLayout>
    );
};

export default CompanyGoal;
