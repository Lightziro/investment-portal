import React from "react";
import { useFormik } from "formik";
import { Button, Form, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import {CompanyModel} from "../../../../ts/types/entity/other.types";
import {initialCompanyForm} from "../../../../ts/init/entity/company.init";
import {CompanySchema} from "../../../../ts/validation/company.validation";

interface CompanyForm {
    company?: CompanyModel;
    callback: (form) => void;
    buttonText: string;
}

export const CompanyForm: React.FC<CompanyForm> = ({
                                                       company,
                                                       callback,
                                                       buttonText,
                                                   }) => {
    const { t } = useTranslation();

    const formik = useFormik({
        initialValues: company
            ? {...company, autoFill: false}
            : initialCompanyForm,
        validationSchema: CompanySchema,
        onSubmit: (form) =>
            callback({
                ...form,
            }),
    });
    return (
        <form onSubmit={formik.handleSubmit}>
            <Form.Group className="mb-3">
                <Form.Label>{t("Ticker")}</Form.Label>
                <Form.Control
                    onChange={formik.handleChange}
                    value={formik.values.ticker}
                    name="ticker"
                    isInvalid={!!formik.errors.ticker}
                />
                <Form.Control.Feedback type="invalid">
                    {t(formik.errors.ticker)}
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>{t("Name")}</Form.Label>
                <Form.Control
                    onChange={formik.handleChange}
                    value={formik.values.name}
                    disabled={formik.values.autoFill}
                    name="name"
                    isInvalid={!!formik.errors.name}
                />
                <Form.Control.Feedback type="invalid">
                    {t(formik.errors.name)}
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
                <Form.Check
                    checked={formik.values.autoFill}
                    value={Number(formik.values.autoFill)}
                    name="autoFill"
                    onChange={formik.handleChange}
                    type="checkbox"
                    label={
                        t("Auto fill data")}
                />
            </Form.Group>
            <Form.Group className="mt-3">
                <Form.Check
                    checked={formik.values.show_top}
                    value={Number(formik.values.show_top)}
                    name="show_top"
                    onChange={formik.handleChange}
                    type="checkbox"
                    label={
                    t("Show in top")}
                />
            </Form.Group>
            <Button variant="primary" type="submit">
                {t(buttonText)}
            </Button>
        </form>
    );
};
