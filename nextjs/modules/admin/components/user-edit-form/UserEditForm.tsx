import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Formik, FormikProps } from "formik";
import { Sex } from "../../../../ts/types/other/other.types";
import { sexList } from "../../../../ts/init/other/other.init";
import { useTranslation } from "react-i18next";
import { RoleModel, UserModel } from "../../../../ts/types/entity/user.types";
import { getCountries, getRoles } from "../../../../utils/api/get-data";
import { CountryModel } from "../../../../ts/types/entity/other.types";
import { Stack } from "@mui/material";
interface UserEditForm {
    callback: (formData: UserModel) => void;
    userData: UserModel;
    handleDelete: () => void;
}
export const UserEditForm: React.FC<UserEditForm> = ({
    callback,
    userData,
    handleDelete,
}) => {
    const [roles, setRoles] = useState<RoleModel[]>([]);
    const [countries, setCountries] = useState<CountryModel[]>([]);
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
        <Formik initialValues={userData} onSubmit={callback}>
            {({
                values,
                handleChange,
                handleSubmit,
            }: FormikProps<UserModel>) => (
                <form onSubmit={handleSubmit}>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label>{t("First name")}</Form.Label>
                            <Form.Control
                                name="first_name"
                                onChange={handleChange}
                                value={values.first_name}
                                placeholder="Enter first name"
                            />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridPassword">
                            <Form.Label>{t("Last name")}</Form.Label>
                            <Form.Control
                                name="last_name"
                                onChange={handleChange}
                                value={values.last_name}
                                placeholder="Enter last name"
                            />
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col}>
                            <Form.Label>{t("Role")}</Form.Label>
                            <Form.Select
                                name="role_id"
                                onChange={handleChange}
                                value={values.role_id}
                            >
                                {roles.map((item) => (
                                    <option
                                        key={item.role_id}
                                        value={item.role_id}
                                    >
                                        {t(item.name)}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label>{t("Country")}</Form.Label>
                            <Form.Select
                                name="country_id"
                                onChange={handleChange}
                                value={values.country_id}
                            >
                                {countries.map((item) => (
                                    <option
                                        key={item.country_id}
                                        value={item.country_id}
                                    >
                                        {t(item.name)}
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
                    <Stack
                        mx={3}
                        direction="row"
                        spacing={2}
                        justifyContent="center"
                    >
                        <Button variant="primary" type="submit">
                            {t('Edit')}
                        </Button>
                        <Button onClick={handleDelete} variant="danger">
                            {t('Delete')}
                        </Button>
                    </Stack>
                </form>
            )}
        </Formik>
    );
};
