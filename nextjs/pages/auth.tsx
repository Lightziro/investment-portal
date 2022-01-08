import { NextPage } from "next";
import React from "react";
import { Col, Row } from "react-bootstrap";
import { AuthLayout } from "../layouts/AuthLayout";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { StoreData } from "../ts/types/redux/store.types";
import { FormAuth } from "../ts/types/forms/form.types";
import Typography from "@mui/material/Typography";
import Router from "next/router";
import { Formik } from "formik";
import { SignInSchema } from "../ts/validation/auth.validation";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import axios from "axios";
import { login } from "../redux/actions/userActions";

const Auth: NextPage = () => {
    const { t } = useTranslation();
    const user = useSelector((store: StoreData) => store.user);
    if (user) {
        Router.push("/");
    }
    console.log("AGA", user);
    // TODO: ДОБАВИТЬ РОУТ ЕСЛИ USER
    const dispatch = useDispatch();

    const handleSubmit = (formData: FormAuth) => {
        dispatch(login(formData));
        try {
            axios
                .get(`${process.env.API_URL}/sanctum/csrf-cookie`, {
                    withCredentials: true,
                    headers: {
                        "Access-Control-Allow-Credentials": true,
                    },
                })
                .then(() => {
                    const data = axios
                        .post(`${process.env.API_URL}/api/user/login`, formData)
                        .then((response) => console.log("SUCCESS"));
                });
        } catch (e) {}
        // dispatch(authUser(formData));
    };
    return (
        <AuthLayout>
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
            <Row>
                <Col>
                    <Link href="/forgot-password">
                        <Typography variant="body2">
                            {t("Forgot password?")}
                        </Typography>
                    </Link>
                </Col>
                <Col>
                    <Link href="/register">
                        <Typography variant="body2">
                            {t("Don't have an account? Sign Up")}
                        </Typography>
                    </Link>
                </Col>
            </Row>
            {/*<Copyright sx={{ mt: 5 }} />*/}
        </AuthLayout>
    );
};

export default Auth;
