import React from "react";
import { NextPage } from "next";
import { MainLayout } from "../../layouts/MainLayout";
import { PortalLayout } from "../../layouts/PortalLayout";
import { Container } from "@mui/material";
import { PersonalAccountPage } from "../../modules/personal-account/pages/PersonalAccountPage";
import { PersonalAccountLayout } from "../../layouts/PersonalAccountLayout";
import Router from "next/router";

export const PersonalAccount: NextPage = () => {
    return (
        <MainLayout title="Личный кабинет">
            <PortalLayout>
                <Container maxWidth="md">
                    <PersonalAccountLayout>
                        <PersonalAccountPage />
                    </PersonalAccountLayout>
                </Container>
            </PortalLayout>
        </MainLayout>
    );
};
export default PersonalAccount;
