import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { AdminLayout } from "../../../layouts/AdminLayout";
import { MainLayout } from "../../../layouts/MainLayout";
import { useTranslation } from "react-i18next";
import { UserEditForm } from "../../../modules/admin/components/user-edit-form/UserEditForm";
import { axios } from "../../../utils/axios";
import { useDispatch } from "react-redux";
import { alertError } from "../../../redux/actions/alertActions";
import { UserAdminEdit } from "../../../ts/types/entity/user.types";

export const EditUser = () => {
    const dispatch = useDispatch();
    const [editUser, setEditUser] = useState<UserAdminEdit>(null);
    const { t } = useTranslation();
    const router = useRouter();
    const { id } = router.query;
    useEffect(() => {
        if (id) {
            axios
                .get(`${process.env.API_URL}/api/profile/get/${id}`)
                .then((res) => setEditUser(res.data))
                .catch((e) => {
                    dispatch(alertError("Couldn't find the user"));
                    router.push("/admin/users");
                });
        }
    }, [id]);
    const handleSubmit = async (formData) => {
        await axios
            .put(`${process.env.API_URL}/api/admin/users/update`, formData)
            .then(() => router.push("/admin/users"))
            .catch(() => dispatch(alertError("Failed to update data")));
    };
    return (
        <MainLayout title={`${t("Admin panel")} - ${t("users")}`}>
            <AdminLayout>
                {editUser && (
                    <UserEditForm callback={handleSubmit} userData={editUser} />
                )}
            </AdminLayout>
        </MainLayout>
    );
};
export default EditUser;
