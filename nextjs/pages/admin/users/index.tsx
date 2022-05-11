import { NextPage } from "next";
import { useTranslation } from "react-i18next";
import { MainLayout } from "../../../layouts/MainLayout";
import { AdminLayout } from "../../../layouts/AdminLayout";
import { Container, Divider } from "@mui/material";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchEntityList } from "../../../redux/actions/adminActions";
import { AdminUsersList } from "../../../modules/admin/sections/users/admin-users-list/AdminUsersList";
import { Entity } from "../../../ts/enums/other.enums";
import { HeaderSection } from "../../../modules/admin/components/header-section/HeaderSection";

const Users: NextPage = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchEntityList(Entity.User, 0));
        // dispatch(fetchUsersStats()); TODO: убрать
    }, []);
    return (
        <MainLayout title={`${t("Admin panel")} - ${t("users")}`}>
            <AdminLayout>
                <Container maxWidth="xl">
                    <HeaderSection previewText="Users" />
                    <Divider />
                    <AdminUsersList />
                </Container>
            </AdminLayout>
        </MainLayout>
    );
};
export default Users;
