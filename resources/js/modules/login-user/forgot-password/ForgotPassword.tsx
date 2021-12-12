import React, { Fragment, useState } from "react";
import { Container, Grid, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Formik } from "formik";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export const ForgotPassword: React.FC = () => {
    const { t } = useTranslation();
    const [send, setSend] = useState(false);
    const handleSubmit = () => {};
    return (
        <Fragment>
            <Typography gutterBottom variant="h5">
                {t("Forgot password")}
            </Typography>
            {!send ? (
                <Formik initialValues={{ email: "" }} onSubmit={handleSubmit}>
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleSubmit,
                    }) => (
                        <form onSubmit={handleSubmit}>
                            <TextField
                                margin="normal"
                                error={touched.email && !!errors.email}
                                required
                                fullWidth
                                name="email"
                                label={t("Email")}
                                type="password"
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
            ) : (
                <div>Test</div>
            )}
        </Fragment>
    );
};
