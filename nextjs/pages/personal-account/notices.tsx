import { NextPage } from "next";
import { MainLayout } from "../../layouts/MainLayout";
import { PortalLayout } from "../../layouts/PortalLayout";
import { Container } from "@mui/material";
import { PersonalAccountLayout } from "../../layouts/PersonalAccountLayout";
import React from "react";
import { useRootSelector } from "../../hooks/useTypeSelector";
import { NoticesPage } from "../../modules/personal-account/pages/NoticesPage";

const Notices: NextPage = () => {
    const user = useRootSelector((state) => state.user);
    return (
        <MainLayout title="Личный кабинет - Главная">
            <PortalLayout>
                {user && (
                    <Container maxWidth="md">
                        <PersonalAccountLayout>
                            <NoticesPage />
                        </PersonalAccountLayout>
                    </Container>
                )}
            </PortalLayout>
        </MainLayout>
    );
};
export default Notices;
