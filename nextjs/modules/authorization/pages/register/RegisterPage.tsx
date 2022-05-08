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
import { useFormik } from "formik";
import { SignUpSchema } from "../../../../ts/validation/register.validation";
import { useTranslation } from "react-i18next";
import { initRegisterForm } from "../../ts/init/init-forms";
import { axios } from "../../../../utils/axios";
import { useRouter } from "next/router";
import { FormRegister } from "../../ts/types/forms.types";
import { useDispatch } from "react-redux";
import {
    alertError,
    alertSuccess,
} from "../../../../redux/actions/alertActions";
import { LinkWrapper } from "../../../../components/simple/link/Link";
import { ErrorsResponse } from "../../../../ts/enums/errors.enums";

export const RegisterPage: React.FC = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const router = useRouter();
    const handleSubmit = async (formData: FormRegister) => {
        await axios
            .post(`${process.env.API_URL}/api/user/register`, formData)
            .then(() => {
                dispatch(alertSuccess("You successfully registered"));
                router.push("/auth");
            })
            .catch((e) => {
                let text = ErrorsResponse.Catch;
                switch (e.response.status) {
                    case 415:
                        text = ErrorsResponse.InvalidFields;
                        break;
                    case 406:
                        text = ErrorsResponse.SuchUserExist;
                        break;
                }
                dispatch(alertError(text));
            });
    };

    const formik = useFormik({
        initialValues: initRegisterForm,
        validationSchema: SignUpSchema,
        onSubmit: handleSubmit,
    });

    // TODO: Переписать на useFormik
    return (
        <AuthLayout>
            <Container>
                <Typography align="center" gutterBottom variant="h4">
                    {t("Sign in")}
                </Typography>
                <form onSubmit={formik.handleSubmit}>
                    <Row className="my-3">
                        <Col xs={12} sm={6}>
                            <TextField
                                autoComplete="given-name"
                                name="first_name"
                                required
                                fullWidth
                                error={
                                    formik.touched.first_name &&
                                    !!formik.errors.first_name
                                }
                                helperText={
                                    formik.touched.first_name &&
                                    t(formik.errors.first_name)
                                }
                                value={formik.values.first_name}
                                onChange={formik.handleChange}
                                label={t("First Name")}
                                autoFocus
                            />
                        </Col>
                        <Col xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                label={t("Last Name")}
                                onChange={formik.handleChange}
                                value={formik.values.last_name}
                                error={
                                    formik.touched.last_name &&
                                    !!formik.errors.last_name
                                }
                                helperText={
                                    formik.touched.last_name &&
                                    t(formik.errors.last_name)
                                }
                                name="last_name"
                                autoComplete="family-name"
                            />
                        </Col>
                    </Row>
                    <Row className="my-3">
                        <Col xs={12}>
                            <TextField
                                required
                                fullWidth
                                value={formik.values.email}
                                error={
                                    formik.touched.email &&
                                    !!formik.errors.email
                                }
                                helperText={
                                    formik.touched.email &&
                                    t(formik.errors.email)
                                }
                                onChange={formik.handleChange}
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
                                    formik.touched.password &&
                                    !!formik.errors.password
                                }
                                helperText={
                                    formik.touched.password &&
                                    t(formik.errors.password)
                                }
                                value={formik.values.password}
                                onChange={formik.handleChange}
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
                                        onChange={formik.handleChange}
                                        value={formik.values.consent}
                                        required
                                    />
                                }
                                label={t(
                                    "I consent to the processing of personal data and confirm that I am the owner of the specified data."
                                )}
                            />
                            {formik.touched.consent &&
                                formik.errors.consent && (
                                    <FormHelperText error>
                                        {t(formik.errors.consent)}
                                    </FormHelperText>
                                )}
                        </Col>
                    </Row>

                    <Button type="submit" fullWidth variant="contained">
                        {t("Registration")}
                    </Button>
                </form>
                <div className="d-flex justify-content-end mt-2">
                    <LinkWrapper href="/auth">
                        <Typography
                            component="span"
                            align="right"
                            variant="body2"
                        >
                            {t("Already have an account? Log in")}
                        </Typography>
                    </LinkWrapper>
                </div>
            </Container>
        </AuthLayout>
    );
};
