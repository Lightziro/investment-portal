import {
    Button,
    Checkbox,
    FormControlLabel,
    FormHelperText,
    Grid,
    TextField,
    Typography,
} from "@mui/material";
import React, { Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Formik, FormikProps } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { SignUpSchema } from "../../../../../nextjs/ts/validation/register.validation";
import { initRegisterForm } from "../../../../../nextjs/ts/consts/forms/init-form";
import { FormRegister } from "../../../../../nextjs/ts/types/forms/form.types";
import { registerUser } from "../../../../../nextjs/redux/actions/mainActions";
import { StoreData } from "../../../../../nextjs/ts/types/redux/store.types";

export const Register: React.FC = () => {
    const user = useSelector((state: StoreData) => state.main.user);
    const navigate = useNavigate();
    if (user) {
        navigate("/");
    }
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const handleSubmit = (formData) => {
        dispatch(registerUser(formData));
    };
    return (
        <Fragment>
            <Typography component="h1" gutterBottom variant="h5">
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
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="firstName"
                                    required
                                    fullWidth
                                    error={
                                        touched.firstName && !!errors.firstName
                                    }
                                    helperText={
                                        touched.firstName && t(errors.firstName)
                                    }
                                    value={values.firstName}
                                    onChange={handleChange}
                                    label={t("First Name")}
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    label={t("Last Name")}
                                    onChange={handleChange}
                                    value={values.lastName}
                                    error={
                                        touched.lastName && !!errors.lastName
                                    }
                                    helperText={
                                        touched.lastName && t(errors.lastName)
                                    }
                                    name="lastName"
                                    autoComplete="family-name"
                                />
                            </Grid>
                            <Grid item xs={12}>
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
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label={t("Password")}
                                    type="password"
                                    error={
                                        touched.password && !!errors.password
                                    }
                                    helperText={
                                        touched.password && t(errors.password)
                                    }
                                    value={values.password}
                                    onChange={handleChange}
                                    autoComplete="new-password"
                                />
                            </Grid>
                            <Grid item xs={12}>
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
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            {t("Registration")}
                        </Button>
                    </form>
                )}
            </Formik>
            <Grid container justifyContent="flex-end">
                <Grid item>
                    <Link to="/auth">
                        <Typography variant="body2">
                            {t("Already have an account? Log in")}
                        </Typography>
                    </Link>
                </Grid>
            </Grid>
        </Fragment>
    );
};
