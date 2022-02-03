import React from "react";
import { NextPage } from "next";
import { MainLayout } from "../../layouts/MainLayout";
import { PortalLayout } from "../../layouts/PortalLayout";
import { Container } from "@mui/material";
import { useRootSelector } from "../../hooks/useTypeSelector";
import { PersonalAccountPage } from "../../modules/personal-account/pages/PersonalAccountPage";

export const PersonalAccount: NextPage = () => {
    const user = useRootSelector((state) => state.user);
    return (
        <MainLayout title="Личный кабинет">
            <PortalLayout>
                {user && (
                    <Container maxWidth="md">
                        <PersonalAccountPage />
                    </Container>
                )}
            </PortalLayout>
        </MainLayout>
    );
};
export default PersonalAccount;
