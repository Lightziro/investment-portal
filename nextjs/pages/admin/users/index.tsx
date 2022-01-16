import { NextPage } from "next";
import { useTranslation } from "react-i18next";
import { MainLayout } from "../../../layouts/MainLayout";
import { AdminLayout } from "../../../layouts/AdminLayout";
import { Container } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
    fetchUsersByPage,
    fetchUsersStats,
} from "../../../redux/actions/admin/adminUsersActions";
import { UsersStats } from "../../../modules/admin/components/users-stats/UsersStats";
import { UsersList } from "../../../modules/admin/components/users-list/UsersList";

const Users: NextPage = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchUsersByPage(1));
        dispatch(fetchUsersStats());
    }, []);
    return (
        <MainLayout title={`${t("Admin panel")} - ${t("users")}`}>
            <AdminLayout>
                <Container maxWidth="xl">
                    <UsersStats />
                    <UsersList />
                </Container>
            </AdminLayout>
        </MainLayout>
    );
};
export default Users;
