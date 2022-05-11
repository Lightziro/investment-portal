import React from "react";
import { Stack, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { subscribeToNews } from "../../../redux/actions/mainActions";
import { SubscribeEmailSchema } from "../../../ts/validation/subscribe.validation";
import classes from "../../../styles/foouter.module.scss";
import { FOOTER_MENU } from "../../../config/menu-items";
import { LinkWrapper } from "../../simple/link/Link";

export const Footer: React.FC = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const handleSubmit = (form, { resetForm }) => {
        dispatch(subscribeToNews(form.email));
        resetForm();
    };

    const formik = useFormik({
        initialValues: { email: "" },
        validationSchema: SubscribeEmailSchema,
        onSubmit: handleSubmit,
    });

    return (
        <footer className={classes.footerMain}>
            <div className="border-bottom pb-5 mb-4">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-3">
                            <form
                                onSubmit={formik.handleSubmit}
                                className={`${classes.subscribe} mb-4 mb-lg-0`}
                            >
                                <div className={classes.formGroup}>
                                    <input
                                        type="email"
                                        name="email"
                                        onChange={formik.handleChange}
                                        value={formik.values.email}
                                        className="form-control"
                                        placeholder={t("Enter your email")}
                                    />
                                    <button type="submit">
                                        <i className="bi bi-arrow-right" />
                                    </button>
                                </div>
                            </form>
                        </div>
                        <div className="col-lg-6 text-lg-center">
                            <ul
                                className={`list-unstyled ${classes.navLinks} nav-left mb-4 mb-lg-0`}
                            >
                                {FOOTER_MENU.map((item) => (
                                    <li key={item.value}>
                                        <LinkWrapper href={item.value}>
                                            {t(item.label)}
                                        </LinkWrapper>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className={`col-lg-3 ${classes.siteLogo} `}>
                            <Stack direction="column" alignItems="center">
                                <img
                                    src="/images/logo/logo-base.png"
                                    style={{ width: 30 }}
                                    alt={t("Logo company")}
                                />
                                <Typography
                                    variant={"h6"}
                                    color={"textSecondary"}
                                >
                                    Investment Hub
                                </Typography>
                            </Stack>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container">
                <div className="text-center ">
                    <p className="m-0 text-muted">
                        <small>&copy; 2022. {t("All Rights Reserved")}.</small>
                    </p>
                </div>
            </div>
        </footer>
    );
};
