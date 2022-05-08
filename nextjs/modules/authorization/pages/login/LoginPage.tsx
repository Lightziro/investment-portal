import React from "react";
import { AuthLayout } from "../../../../layouts/AuthLayout";
import Typography from "@mui/material/Typography";
import { useFormik } from "formik";
import { LogInSchema } from "../../../../ts/validation/auth.validation";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import { Col, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { login } from "../../../../redux/actions/userActions";
import { initialLoginForm } from "../../ts/init/init-forms";
import { useTranslation } from "react-i18next";
import { FormAuth } from "../../ts/types/forms.types";
import { LinkWrapper } from "../../../../components/simple/link/Link";

export const LoginPage: React.FC = () => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const handleSubmit = (formData: FormAuth) => {
        dispatch(login(formData));
    };

    const formik = useFormik({
        initialValues: initialLoginForm,
        validationSchema: LogInSchema,
        onSubmit: handleSubmit,
    });

    return (
        <AuthLayout>
            <Typography component="h1" variant="h5">
                {t("Log in")}
            </Typography>
            <form onSubmit={formik.handleSubmit}>
                <TextField
                    error={formik.touched.email && !!formik.errors.email}
                    margin="normal"
                    required
                    fullWidth
                    label={t("Email")}
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    autoFocus
                    autoComplete="off"
                    helperText={formik.touched.email && formik.errors.email}
                />
                <TextField
                    margin="normal"
                    error={formik.touched.password && !!formik.errors.password}
                    required
                    fullWidth
                    name="password"
                    label={t("Password")}
                    type="password"
                    onChange={formik.handleChange}
                    autoComplete="current-password"
                    value={formik.values.password}
                    helperText={
                        formik.touched.password && formik.errors.password
                    }
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            value="remember"
                            name="remember"
                            onChange={formik.handleChange}
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
            <Row>
                <Col>
                    <LinkWrapper href="/forgot-password">
                        <Typography component="span" variant="body2">
                            {t("Forgot password?")}
                        </Typography>
                    </LinkWrapper>
                </Col>
                <Col>
                    <LinkWrapper href="/register">
                        <Typography component="span" variant="body2">
                            {t("Don't have an account? Sign Up")}
                        </Typography>
                    </LinkWrapper>
                </Col>
            </Row>
        </AuthLayout>
    );
};
