import React, { useEffect, useState, Fragment } from "react";
import { useRouter } from "next/router";
import { AdminLayout } from "../../../layouts/AdminLayout";
import { MainLayout } from "../../../layouts/MainLayout";
import { useTranslation } from "react-i18next";
import { UserEditForm } from "../../../modules/admin/components/user-edit-form/UserEditForm";
import { axios } from "../../../utils/axios";
import { useDispatch } from "react-redux";
import { alertError, alertSuccess } from "../../../redux/actions/alertActions";
import { UserModel } from "../../../ts/types/entity/user.types";
import { Typography } from "@mui/material";
import { useDialog } from "../../../hooks/useDialog";
import { ConfirmAction } from "../../../components/smart/confirm-action/ConfirmAction";

export const EditUser = () => {
    const dispatch = useDispatch();
    const [editUser, setEditUser] = useState<UserModel>(null);
    const { t } = useTranslation();
    const { open, handleClose, handleOpen } = useDialog();
    const router = useRouter();
    const { id } = router.query;
    useEffect(() => {
        if (id) {
            axios
                .get(`${process.env.API_URL}/api/admin/user/${id}`)
                .then((res) => setEditUser(res.data))
                .catch((e) => {
                    dispatch(alertError("Couldn't find the user"));
                    router.push("/admin/users");
                });
        }
    }, [id]);
    const handleSubmit = async (formData: UserModel) => {
        await axios
            .put(`${process.env.API_URL}/api/admin/user/${id}`, formData)
            .then(() => router.push("/admin/users"))
            .catch(() => dispatch(alertError("Failed to update data")));
    };
    const handleDelete = async (id) => {
        await axios
            .delete(`${process.env.API_URL}/api/admin/user/${id}`)
            .then((res) => {
                handleClose();
                dispatch(alertSuccess("User success deleted"));
                router.push("/admin/users");
            })
            .catch(() => dispatch(alertError("Failed to delete user")));
    };
    return (
        <MainLayout title={`${t("Admin panel")} - ${t("users")}`}>
            <AdminLayout>
                {editUser && (
                    <Fragment>
                        <Typography align="center" variant="h4">
                            {`${t('Editing user')} - ${editUser.full_name}[${editUser.user_id}]`}
                        </Typography>
                        <UserEditForm
                            callback={handleSubmit}
                            userData={editUser}
                            handleDelete={handleOpen}
                        />
                        <ConfirmAction
                            state={open}
                            onCancelClick={handleClose}
                            onConfirmClick={handleDelete}
                            title="Do you really want delete user?"
                            id={editUser.user_id}
                        />
                    </Fragment>
                )}
            </AdminLayout>
        </MainLayout>
    );
};
export default EditUser;
