import React from "react";
import { AuthLayout } from "../../../../layouts/AuthLayout";
import Typography from "@mui/material/Typography";
import { useFormik } from "formik";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import {
    alertError,
    alertSuccess,
} from "../../../../redux/actions/alertActions";
import { axios } from "../../../../utils/axios";
import { ForgotPasswordSchema } from "../../../../ts/validation/forgot-password.validation";
import { initialForgotForm } from "../../ts/init/init-forms";
import { FormForgot } from "../../ts/types/forms.types";
import { ErrorsResponse } from "../../../../ts/enums/errors.enums";

export const ForgotPasswordPage: React.FC = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { t } = useTranslation();
    const handleSubmit = (form: FormForgot) =>
        axios
            .post(`${process.env.API_URL}/api/user/forgot-password`, form)
            .then((response) => {
                dispatch(
                    alertSuccess("Link with the recovery sent to the mail")
                );
                router.push("/");
            })
            .catch((e) => {
                let text = ErrorsResponse.Catch;
                switch (e.response.status) {
                    case 404:
                        text = ErrorsResponse.NotFoundUser;
                }
                dispatch(alertError(text));
            });

    const formik = useFormik({
        initialValues: initialForgotForm,
        validationSchema: ForgotPasswordSchema,
        onSubmit: handleSubmit,
    });

    return (
        <AuthLayout>
            <Typography component="h1" variant="h5">
                {t("Forgot password")}
            </Typography>
            <form onSubmit={formik.handleSubmit}>
                <TextField
                    margin="normal"
                    error={formik.touched.email && !!formik.errors.email}
                    required
                    fullWidth
                    name="email"
                    label={t("Email")}
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    helperText={formik.touched.email && formik.errors.email}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ my: 2 }}
                >
                    {t("Send Email")}
                </Button>
            </form>
        </AuthLayout>
    );
};
