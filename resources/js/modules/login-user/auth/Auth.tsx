import React, { Fragment, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { StoreData } from "../../../ts/types/redux/store.types";
import { authUser } from "../../../redux/actions/mainActions";
import { useTranslation } from "react-i18next";

import { Link, useNavigate } from "react-router-dom";
import { SignInSchema } from "../../../ts/validation/auth.validation";
import { FormAuth } from "../../../ts/types/forms/form.types";

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
    const navigate = useNavigate();
    const user = useSelector((store: StoreData) => store.main.user);
    if (user) {
        navigate("/");
    }
    const dispatch = useDispatch();
    const handleSubmit = (formData: FormAuth) => {
        dispatch(authUser(formData));
    };

    return (
        <Fragment>
            <Typography component="h1" variant="h5">
                Sign in
            </Typography>
            <Formik
                initialValues={{ email: "", password: "", remember: false }}
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
                            error={touched.email && !!errors.email}
                            margin="normal"
                            required
                            fullWidth
                            label={t("Email")}
                            name="email"
                            value={values.email}
                            onChange={handleChange}
                            autoFocus
                            autoComplete="off"
                            helperText={touched.email && errors.email}
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
                                <Checkbox
                                    value="remember"
                                    name="remember"
                                    onChange={handleChange}
                                    color="primary"
                                />
                            }
                            label={t("Remember me")}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ my: 2 }}
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
