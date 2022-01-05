import React, { Fragment, useState } from "react";
import { Container, Grid, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Formik } from "formik";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import {
    alertError,
    alertSuccess,
} from "../../../../../nextjs/redux/actions/alertActions";
export const ForgotPassword: React.FC = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const handleSubmit = (form) => {
        axios
            .post("/api/user/forgot-password", { email: form.email })
            .then((response) => {
                dispatch(alertSuccess(response.data.message));
                navigate("/auth");
            })
            .catch((e) => dispatch(alertError(e.response.data.message)));
    };
    return (
        <Fragment>
            <Typography gutterBottom variant="h5">
                {t("Forgot password")}
            </Typography>
            <Formik initialValues={{ email: "" }} onSubmit={handleSubmit}>
                {({ values, errors, touched, handleChange, handleSubmit }) => (
                    <form onSubmit={handleSubmit}>
                        <TextField
                            margin="normal"
                            error={touched.email && !!errors.email}
                            required
                            fullWidth
                            name="email"
                            label={t("Email")}
                            onChange={handleChange}
                            autoComplete="current-password"
                            value={values.email}
                            helperText={touched.email && errors.email}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ my: 2 }}
                        >
                            {t("Send request")}
                        </Button>
                    </form>
                )}
            </Formik>
        </Fragment>
    );
};
