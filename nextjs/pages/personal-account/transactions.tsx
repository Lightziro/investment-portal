import { NextPage } from "next";
import { MainLayout } from "../../layouts/MainLayout";
import { PortalLayout } from "../../layouts/PortalLayout";
import { Container } from "@mui/material";
import { PersonalAccountLayout } from "../../layouts/PersonalAccountLayout";
import React from "react";
import { NoticesPage } from "../../modules/personal-account/pages/NoticesPage";
import { TransactionsPage } from "../../modules/personal-account/pages/TransactionsPage/TransactionsPage";

const Transactions: NextPage = () => {
    return (
        <MainLayout title="Личный кабинет - Операции с балансом">
            <PortalLayout>
                <Container maxWidth="md">
                    <PersonalAccountLayout>
                        <TransactionsPage />
                    </PersonalAccountLayout>
                </Container>
            </PortalLayout>
        </MainLayout>
    );
};
export default Transactions;
