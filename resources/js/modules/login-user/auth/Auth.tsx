import React, { Fragment, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Formik } from "formik";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { StoreData } from "../../../ts/types/redux/store.types";
import { setUserData } from "../../../redux/actions/mainActions";
import { useTranslation } from "react-i18next";

import { Link } from "react-router-dom";
import { SignInSchema } from "./authValidation";

function Copyright(props: any) {
    return (
        <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            {...props}
        >
            {"Copyright © "}
            {/*<Link color="inherit" href="https://mui.com/">*/}
            {/*    Your Website*/}
            {/*</Link>{" "}*/}
            {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}

export const Auth: React.FC = () => {
    const { t } = useTranslation();
    const user = useSelector((store: StoreData) => store.main.user);
    const dispatch = useDispatch();
    const handleSubmit = (formData) => {
        axios
            .post("/api/user/login", formData)
            .then((res) => dispatch(setUserData(res.data)))
            .catch((errorList) => {});
    };

    return (
        <Fragment>
            <Typography component="h1" variant="h5">
                Sign in
            </Typography>
            <Formik
                initialValues={{ userName: "", password: "" }}
                onSubmit={handleSubmit}
                validationSchema={SignInSchema}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                }) => (
                    <form onSubmit={handleSubmit}>
                        <TextField
                            error={touched.userName && !!errors.userName}
                            margin="normal"
                            required
                            fullWidth
                            label={t("Username")}
                            name="userName"
                            value={values.userName}
                            onChange={handleChange}
                            autoFocus
                            helperText={touched.userName && errors.userName}
                        />
                        <TextField
                            margin="normal"
                            error={touched.password && !!errors.password}
                            required
                            fullWidth
                            name="password"
                            label={t("Password")}
                            type="password"
                            onChange={handleChange}
                            autoComplete="current-password"
                            value={values.password}
                            helperText={touched.password && errors.password}
                        />
                        <FormControlLabel
                            control={
                                <Checkbox value="remember" color="primary" />
                            }
                            label={t("Remember me")}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            {t("Log in")}
                        </Button>
                    </form>
                )}
            </Formik>
            <Grid container>
                <Grid item xs>
                    <Link to="/forgot-password">
                        <Typography variant="body2">
                            {t("Forgot password")}
                        </Typography>
                    </Link>
                </Grid>
                <Grid item>
                    <Link to="/register">
                        <Typography variant="body2">
                            {t("Don't have an account? Sign Up")}
                        </Typography>
                    </Link>
                </Grid>
            </Grid>
            <Copyright sx={{ mt: 5 }} />
        </Fragment>
    );
};
