import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Formik } from "formik";
import { RecoveryPasswordSchema } from "../../../../../nextjs/ts/validation/recovery-passowrd.validation";
import TextField from "@mui/material/TextField";
import { useTranslation } from "react-i18next";
import Button from "@mui/material/Button";
import axios from "axios";
import { useDispatch } from "react-redux";
import {
    alertError,
    alertSuccess,
} from "../../../../../nextjs/redux/actions/alertActions";

export const RecoveryPassword: React.FC = () => {
    const { key } = useParams();
    const { t } = useTranslation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleSubmit = (form) => {
        axios
            .post("/api/user/recovery-password", { ...form, ...{ key } })
            .then((response) => {
                dispatch(alertSuccess(response.data.message));
                navigate("/auth");
            })
            .catch((e) => dispatch(alertError(e.response.data.message)));
    };
    return (
        <Formik
            initialValues={{ password: "", confirmPassword: "" }}
            onSubmit={handleSubmit}
            validationSchema={RecoveryPasswordSchema}
        >
            {({ values, errors, touched, handleChange, handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                    <TextField
                        margin="normal"
                        error={touched.password && !!errors.password}
                        required
                        fullWidth
                        name="password"
                        label={t("Password")}
                        onChange={handleChange}
                        autoComplete="current-password"
                        value={values.password}
                        helperText={touched.password && errors.password}
                    />
                    <TextField
                        margin="normal"
                        error={
                            touched.confirmPassword && !!errors.confirmPassword
                        }
                        required
                        fullWidth
                        name="confirmPassword"
                        label={t("Confirm password")}
                        onChange={handleChange}
                        autoComplete="current-password"
                        value={values.confirmPassword}
                        helperText={
                            touched.confirmPassword && errors.confirmPassword
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
            )}
        </Formik>
    );
};
