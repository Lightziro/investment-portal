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
import { RecoveryPasswordSchema } from "../../../../ts/validation/recovery-passowrd.validation";
import { ErrorsResponse } from "../../../../ts/enums/errors.enums";
import { initialRecoveryForm } from "../../ts/init/init-forms";
import { FormRecovery } from "../../ts/types/forms.types";

const RecoveryUserPage: React.FC = () => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const router = useRouter();
    const { key } = router.query;

    const handleSubmit = (form: FormRecovery) => {
        axios
            .post(`${process.env.API_URL}/api/user/recovery-password`, {
                ...form,
                ...{ key },
            })
            .then((response) => {
                dispatch(alertSuccess("Password successfully reset"));
                router.push("/auth");
            })
            .catch((e) => {
                let text = ErrorsResponse.Catch;
                switch (e.response.status) {
                    case 404:
                        text = ErrorsResponse.NotFoundUser;
                        break;
                }
                dispatch(alertError(text));
            });
    };

    const formik = useFormik({
        initialValues: initialRecoveryForm,
        validationSchema: RecoveryPasswordSchema,
        onSubmit: handleSubmit,
    });

    return (
        <AuthLayout>
            <Typography component="h1" variant="h5">
                {t("Changing password")}
            </Typography>
            <form onSubmit={formik.handleSubmit}>
                <TextField
                    margin="normal"
                    error={formik.touched.password && !!formik.errors.password}
                    required
                    fullWidth
                    name="password"
                    label={t("Password")}
                    onChange={formik.handleChange}
                    autoComplete="current-password"
                    value={formik.values.password}
                    helperText={
                        formik.touched.password && formik.errors.password
                    }
                />
                <TextField
                    margin="normal"
                    error={
                        formik.touched.confirm_password &&
                        !!formik.errors.confirm_password
                    }
                    required
                    fullWidth
                    name="confirm_password"
                    label={t("Confirm password")}
                    onChange={formik.handleChange}
                    value={formik.values.confirm_password}
                    helperText={
                        formik.touched.confirm_password &&
                        formik.errors.confirm_password
                    }
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ my: 2 }}
                >
                    {t("Change password")}
                </Button>
            </form>
        </AuthLayout>
    );
};
export default RecoveryUserPage;
