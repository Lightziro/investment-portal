import React, { useEffect } from "react";
import { NextPage } from "next";
import { MainLayout } from "../../../layouts/MainLayout";
import { AdminLayout } from "../../../layouts/AdminLayout";
import { useTranslation } from "react-i18next";
import { Container } from "@mui/material";
import { StageSelectCompany } from "../../../modules/admin/components/create-investment-idea/stage-select-company/StageSelectCompany";
import { StageSettingsAnalytics } from "../../../modules/admin/components/create-investment-idea/stage-settings-analytics/StageSettingsAnalytics";
import { useDispatch } from "react-redux";
import { clearCompanyIdea } from "../../../redux/actions/admin/adminIdeaActions";

const InvestmentIdeaCreate: NextPage = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(clearCompanyIdea());
    }, []);
    return (
        <MainLayout title={t("Creating idea")}>
            <AdminLayout>
                <Container maxWidth="sm">
                    <StageSelectCompany />
                    <StageSettingsAnalytics />
                </Container>
            </AdminLayout>
        </MainLayout>
    );
};
export default InvestmentIdeaCreate;
