import React from "react";
import { NextPage } from "next";
import { MainLayout } from "../../layouts/MainLayout";
import { PortalLayout } from "../../layouts/PortalLayout";
import { Container } from "@mui/material";
import { useRootSelector } from "../../hooks/useTypeSelector";
import { PersonalAccountPage } from "../../modules/personal-account/pages/PersonalAccountPage";
import { PersonalAccountLayout } from "../../layouts/PersonalAccountLayout";

export const PersonalAccount: NextPage = () => {
    const { data } = useRootSelector((state) => state.user);
    return (
        <MainLayout title="Личный кабинет - Главная">
            <PortalLayout>
                {data && (
                    <Container maxWidth="md">
                        <PersonalAccountLayout>
                            <PersonalAccountPage />
                        </PersonalAccountLayout>
                    </Container>
                )}
            </PortalLayout>
        </MainLayout>
    );
};
export default PersonalAccount;
