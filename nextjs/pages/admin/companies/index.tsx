import { MainLayout } from "../../../layouts/MainLayout";
import { AdminLayout } from "../../../layouts/AdminLayout";
import { useTranslation } from "react-i18next";
import { Container, Divider } from "@mui/material";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { HeaderSection } from "../../../modules/admin/components/header-section/HeaderSection";
import { fetchEntityList } from "../../../redux/actions/adminActions";
import { AdminEntity } from "../../../redux/ts/enums/admin/admin.enum";
import { AdminCompaniesList } from "../../../modules/admin/sections/companies/admin-companies-list/AdminCompaniesList";

const Companies = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchEntityList(AdminEntity.Company, 0));
    }, []);
    return (
        <MainLayout title={t("Companies")}>
            <AdminLayout>
                <Container maxWidth="xl">
                    <AdminCompaniesList />
                </Container>
            </AdminLayout>
        </MainLayout>
    );
};
export default Companies;
