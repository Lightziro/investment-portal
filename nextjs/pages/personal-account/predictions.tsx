import { NextPage } from "next";
import { MainLayout } from "../../layouts/MainLayout";
import { PortalLayout } from "../../layouts/PortalLayout";
import { Container } from "@mui/material";
import { PersonalAccountLayout } from "../../layouts/PersonalAccountLayout";
import React from "react";
import { MyStockPage } from "../../modules/personal-account/pages/MyStockPage";

const Predictions: NextPage = () => {
    return (
        <MainLayout title="Личный кабинет - Прогнозы">
            <PortalLayout>
                <Container maxWidth="md">
                    <PersonalAccountLayout>
                        <MyStockPage />
                    </PersonalAccountLayout>
                </Container>
            </PortalLayout>
        </MainLayout>
    );
};
export default Predictions;
