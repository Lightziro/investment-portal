import React from "react";
import { AuthLayout } from "../../../../layouts/AuthLayout";
import { Col, Container, Row } from "react-bootstrap";
import {
    Button,
    Checkbox,
    FormControlLabel,
    FormHelperText,
    TextField,
    Typography,
} from "@mui/material";
import { Formik, FormikProps } from "formik";
import { SignUpSchema } from "../../../../ts/validation/register.validation";
import { FormRegister } from "../../../../ts/types/forms/form.types";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { initRegisterForm } from "../../ts/init/init-forms";
import { useDispatch } from "react-redux";

export const RegisterPage: React.FC = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const handleSubmit = (formData: FormRegister) => {};
    return (
        <AuthLayout>
            <Container>
                <Typography align="center" gutterBottom variant="h4">
                    {t("Registration")}
                </Typography>
                <Formik
                    initialValues={initRegisterForm}
                    onSubmit={handleSubmit}
                    validationSchema={SignUpSchema}
                >
                    {({
                        values,
                        handleChange,
                        touched,
                        errors,
                        handleSubmit,
                    }: FormikProps<FormRegister>) => (
                        <form onSubmit={handleSubmit}>
                            <Row className="my-3" container spacing={2}>
                                <Col xs={12} sm={6}>
                                    <TextField
                                        autoComplete="given-name"
                                        name="firstName"
                                        required
                                        fullWidth
                                        error={
                                            touched.firstName &&
                                            !!errors.firstName
                                        }
                                        helperText={
                                            touched.firstName &&
                                            t(errors.firstName)
                                        }
                                        value={values.firstName}
                                        onChange={handleChange}
                                        label={t("First Name")}
                                        autoFocus
                                    />
                                </Col>
                                <Col xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        label={t("Last Name")}
                                        onChange={handleChange}
                                        value={values.lastName}
                                        error={
                                            touched.lastName &&
                                            !!errors.lastName
                                        }
                                        helperText={
                                            touched.lastName &&
                                            t(errors.lastName)
                                        }
                                        name="lastName"
                                        autoComplete="family-name"
                                    />
                                </Col>
                            </Row>
                            <Row className="my-3">
                                <Col xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        value={values.email}
                                        error={touched.email && !!errors.email}
                                        helperText={
                                            touched.email && t(errors.email)
                                        }
                                        onChange={handleChange}
                                        label={t("Email Address")}
                                        name="email"
                                        autoComplete="email"
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="password"
                                        label={t("Password")}
                                        type="password"
                                        error={
                                            touched.password &&
                                            !!errors.password
                                        }
                                        helperText={
                                            touched.password &&
                                            t(errors.password)
                                        }
                                        value={values.password}
                                        onChange={handleChange}
                                        autoComplete="new-password"
                                    />
                                </Col>
                            </Row>
                            <Row className="my-3">
                                <Col xs={12}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                color="primary"
                                                name="consent"
                                                onChange={handleChange}
                                                value={values.consent}
                                                required
                                            />
                                        }
                                        label="I consent to the processing of personal data and confirm that I am the owner of the specified data."
                                    />
                                    {touched.consent && errors.consent && (
                                        <FormHelperText error>
                                            {t(errors.consent)}
                                        </FormHelperText>
                                    )}
                                </Col>
                            </Row>

                            <Button type="submit" fullWidth variant="contained">
                                {t("Registration")}
                            </Button>
                        </form>
                    )}
                </Formik>
                <div className="d-flex justify-content-end mt-2">
                    <Link href="/auth">
                        <Typography align="right" variant="body2">
                            {t("Already have an account? Log in")}
                        </Typography>
                    </Link>
                </div>
            </Container>
        </AuthLayout>
    );
};
