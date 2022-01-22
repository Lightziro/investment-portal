import { NextPage } from "next";
import { useTranslation } from "react-i18next";
import { MainLayout } from "../../../layouts/MainLayout";
import { AdminLayout } from "../../../layouts/AdminLayout";
import { Container } from "@mui/material";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchUsersStats } from "../../../redux/actions/admin/adminUsersActions";
import { UsersStats } from "../../../modules/admin/components/users-stats/UsersStats";
import { fetchEntityList } from "../../../redux/actions/adminActions";
import { AdminEntity } from "../../../redux/ts/enums/admin/admin.enum";
import { AdminUsersList } from "../../../modules/admin/sections/users/admin-users-list/AdminUsersList";

const Users: NextPage = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchEntityList(AdminEntity.User, 0));
        dispatch(fetchUsersStats());
    }, []);
    return (
        <MainLayout title={`${t("Admin panel")} - ${t("users")}`}>
            <AdminLayout>
                <Container maxWidth="xl">
                    <UsersStats />
                    <AdminUsersList />
                </Container>
            </AdminLayout>
        </MainLayout>
    );
};
export default Users;
