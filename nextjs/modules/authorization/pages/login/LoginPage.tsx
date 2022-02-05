import React from "react";
import { AuthLayout } from "../../../../layouts/AuthLayout";
import Typography from "@mui/material/Typography";
import { Formik } from "formik";
import { SignInSchema } from "../../../../ts/validation/auth.validation";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import { Col, Row } from "react-bootstrap";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { login } from "../../../../redux/actions/userActions";
import { initialLoginForm } from "../../ts/init/init-forms";
import { useTranslation } from "react-i18next";
import { FormAuth } from "../../ts/types/forms.types";

export const LoginPage: React.FC = () => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const handleSubmit = (formData: FormAuth) => {
        dispatch(login(formData));
    };
    return (
        <AuthLayout>
            <Typography component="h1" variant="h5">
                Sign in
            </Typography>
            <Formik
                initialValues={initialLoginForm}
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
                            label={"Remember"}
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
