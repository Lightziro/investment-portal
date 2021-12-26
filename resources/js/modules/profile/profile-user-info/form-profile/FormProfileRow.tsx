import React from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
interface FormProfileRow {
    textValue: string;
    label: string;
    edit: boolean;
}
export const FormProfileRow: React.FC<FormProfileRow> = ({
    textValue,
    label,
    children,
    edit,
}) => {
    const { t } = useTranslation();
    return (
        <Row className="row-form">
            <Form.Label column="sm" lg={2}>
                {label}:
            </Form.Label>
            <Col>{edit ? children : <span>{t(textValue)}</span>}</Col>
        </Row>
    );
};
