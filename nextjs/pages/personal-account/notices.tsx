import { NextPage } from "next";
import { MainLayout } from "../../layouts/MainLayout";
import { PortalLayout } from "../../layouts/PortalLayout";
import { Container } from "@mui/material";
import { PersonalAccountLayout } from "../../layouts/PersonalAccountLayout";
import React from "react";
import { NoticesPage } from "../../modules/personal-account/pages/NoticesPage";

const Notices: NextPage = () => {
    return (
        <MainLayout title="Личный кабинет - Уведомления">
            <PortalLayout>
                <Container maxWidth="md">
                    <PersonalAccountLayout>
                        <NoticesPage />
                    </PersonalAccountLayout>
                </Container>
            </PortalLayout>
        </MainLayout>
    );
};
export default Notices;
