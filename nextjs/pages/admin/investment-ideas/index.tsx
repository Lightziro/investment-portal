import { NextPage } from "next";
import { MainLayout } from "../../../layouts/MainLayout";
import { AdminLayout } from "../../../layouts/AdminLayout";
import { useTranslation } from "react-i18next";
import { Container, Divider } from "@mui/material";
import { HeaderSection } from "../../../modules/admin/components/header-section/HeaderSection";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchEntityList } from "../../../redux/actions/adminActions";
import { AdminIdeasList } from "../../../modules/admin/sections/investment-ideas/admin-ideas-list/AdminIdeasList";
import { Entity } from "../../../ts/enums/other.enums";

const InvestmentIdeas: NextPage = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchEntityList(Entity.InvestmentIdea, 0));
    }, []);
    return (
        <MainLayout title={t("Investment ideas")}>
            <AdminLayout>
                <Container maxWidth="xl">
                    <HeaderSection
                        urlRedirect="/admin/investment-ideas/create"
                        textButton="Create idea"
                        previewText="Investment ideas"
                    />
                    <Divider />
                    <AdminIdeasList />
                </Container>
            </AdminLayout>
        </MainLayout>
    );
};
export default InvestmentIdeas;
