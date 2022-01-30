import React from "react";
import {
    Box,
    Container,
    Divider,
    Grid,
    Stack,
    Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { Button, Form } from "react-bootstrap";
import { Formik } from "formik";
import { useDispatch } from "react-redux";
import { subscribeToNews } from "../../../redux/actions/mainActions";
import { SubscribeEmailSchema } from "../../../ts/validation/subscribe.validation";
import classes from "../../../styles/foouter.module.scss";

export const Footer: React.FC = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const handleSubmit = (form, { resetForm }) => {
        dispatch(subscribeToNews(form.email));
        resetForm();
    };
    return (
        <Box className={classes.footerWrapper}>
            <Container>
                <Grid container pt={8} pb={2}>
                    <Grid item lg={6} direction="column">
                        <Grid direction="row" container alignItems="center">
                            <img
                                src="/images/logo/logo-base.png"
                                style={{ width: 30 }}
                            />
                            <Typography variant={"h6"} color={"textSecondary"}>
                                Investment Hub
                            </Typography>
                        </Grid>
                        <Grid container direction="row" spacing={2}>
                            {["About", "Service"].map((item, i) => (
                                <Grid key={i} item>
                                    <Typography variant="body2">
                                        {item}
                                    </Typography>
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                    <Grid item lg={6} direction="row" container>
                        <Formik
                            initialValues={{ email: "" }}
                            onSubmit={handleSubmit}
                            validationSchema={SubscribeEmailSchema}
                        >
                            {({
                                values,
                                errors,
                                handleChange,
                                handleSubmit,
                            }) => (
                                <form onSubmit={handleSubmit}>
                                    <Form.Label>Email</Form.Label>
                                    <Stack direction="row">
                                        <Form.Control
                                            value={values.email}
                                            name="email"
                                            onChange={handleChange}
                                            placeholder={t(
                                                "Specify your email address"
                                            )}
                                            isInvalid={!!errors.email}
                                        />
                                        <Button variant="primary" type="submit">
                                            {t("Subscribe")}
                                        </Button>
                                    </Stack>
                                </form>
                            )}
                        </Formik>
                    </Grid>
                </Grid>
                <Divider />
            </Container>
        </Box>
    );
};
