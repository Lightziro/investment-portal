import { MainLayout } from "../../../layouts/MainLayout";
import { AdminLayout } from "../../../layouts/AdminLayout";
import { useTranslation } from "react-i18next";
import { Container, Divider } from "@mui/material";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchEntityList } from "../../../redux/actions/adminActions";
import { AdminCompaniesList } from "../../../modules/admin/sections/companies/admin-companies-list/AdminCompaniesList";
import { Entity } from "../../../ts/enums/other.enums";
import { HeaderSection } from "../../../modules/admin/components/header-section/HeaderSection";

const Companies = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchEntityList(Entity.Company, 0));
    }, []);
    return (
        <MainLayout title={t("Companies")}>
            <AdminLayout>
                <Container maxWidth="xl">
                    <HeaderSection previewText="Companies" />
                    <Divider />
                    <AdminCompaniesList />
                </Container>
            </AdminLayout>
        </MainLayout>
    );
};
export default Companies;
