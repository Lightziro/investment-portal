import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Formik, FormikProps } from "formik";
import { CountryItem, Role, Sex } from "../../../../ts/types/other/other.types";
import { sexList } from "../../../../ts/init/other/other.init";
import { useTranslation } from "react-i18next";
import { FormEditUserAdmin } from "../../../../ts/types/forms/form.types";
import { convertFormEditUser } from "../../utils/convert-to-form";
import { UserAdminEdit } from "../../../../ts/types/entity/user.types";
import { getCountries, getRoles } from "../../../../utils/api/get-data";
interface UserEditForm {
    callback: (formData: FormEditUserAdmin) => void;
    userData: UserAdminEdit;
}
export const UserEditForm: React.FC<UserEditForm> = ({
    callback,
    userData,
}) => {
    const [roles, setRoles] = useState<Role[]>([]);
    const [countries, setCountries] = useState<CountryItem[]>([]);
    const { t } = useTranslation();

    useEffect(() => {
        fetchRoles();
        fetchCountries();
    }, []);
    const fetchRoles = async () => {
        const list = await getRoles();
        setRoles(list);
    };
    const fetchCountries = async () => {
        const list = await getCountries();
        setCountries(list);
    };

    return (
        <Formik
            initialValues={convertFormEditUser(userData)}
            onSubmit={callback}
        >
            {({
                values,
                errors,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
            }: FormikProps<FormEditUserAdmin>) => (
                <form onSubmit={handleSubmit}>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label>{t("First name")}</Form.Label>
                            <Form.Control
                                name="firstName"
                                onChange={handleChange}
                                value={values.firstName}
                                placeholder="Enter first name"
                            />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridPassword">
                            <Form.Label>{t("Last name")}</Form.Label>
                            <Form.Control
                                name="lastName"
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
                        <Form.Group as={Col}>
                            <Form.Label>{t("Role")}</Form.Label>
                            <Form.Select
                                name="role"
                                onChange={handleChange}
                                value={values.role}
                            >
                                {roles.map((item) => (
                                    <option
                                        key={item.roleId}
                                        value={item.roleId}
                                    >
                                        {item.name}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label>{t("Country")}</Form.Label>
                            <Form.Select
                                name="country"
                                onChange={handleChange}
                                value={values.country}
                            >
                                {countries.map((item) => (
                                    <option
                                        key={item.country_id}
                                        value={item.country_id}
                                    >
                                        {item.name}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>{t("Sex")}</Form.Label>
                            <Form.Select
                                name="sex"
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
                </form>
            )}
        </Formik>
    );
};
