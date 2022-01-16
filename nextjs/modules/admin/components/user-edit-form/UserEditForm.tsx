import React from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { SignInSchema } from "../../../../ts/validation/auth.validation";
import { Formik, FormikProps } from "formik";
import { Sex } from "../../../../ts/types/other/other.types";
import { sexList } from "../../../../ts/init/other/other.init";
import { useTranslation } from "react-i18next";
import { FormEditUserAdmin } from "../../../../ts/types/forms/form.types";
import { convertFormEditUser } from "../../utils/convert-to-form";
import { UserAdminEdit } from "../../../../ts/types/entity/user.types";
interface UserEditForm {
    callback: (formData) => void;
    userData: UserAdminEdit;
}
export const UserEditForm: React.FC<UserEditForm> = ({
    callback,
    userData,
}) => {
    const { t } = useTranslation();

    return (
        <Formik
            initialValues={convertFormEditUser(userData)}
            onSubmit={callback}
            validationSchema={SignInSchema}
        >
            {({
                values,
                errors,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
            }: FormikProps<FormEditUserAdmin>) => (
                <Form>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label>{t("First name")}</Form.Label>
                            <Form.Control
                                onChange={handleChange}
                                value={values.firstName}
                                placeholder="Enter first name"
                            />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridPassword">
                            <Form.Label>{t("Last name")}</Form.Label>
                            <Form.Control
                                onChange={handleChange}
                                value={values.lastName}
                                placeholder="Enter last name"
                            />
                        </Form.Group>
                    </Row>
                    <Form.Group className="mb-3" controlId="formGridAddress2">
                        <Form.Label>Address 2</Form.Label>
                        <Form.Control placeholder="Apartment, studio, or floor" />
                    </Form.Group>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridCity">
                            <Form.Label>City</Form.Label>
                            <Form.Control />
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label>{t("Country")}</Form.Label>
                            <Form.Select>
                                <option>Choose...</option>
                                <option>...</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>{t("Sex")}</Form.Label>
                            <Form.Select
                                value={values.sex}
                                onChange={handleChange}
                            >
                                {sexList.map((item) => (
                                    <option key={item.value} value={item.value}>
                                        {t(item.label)}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Row>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            )}
        </Formik>
    );
};
