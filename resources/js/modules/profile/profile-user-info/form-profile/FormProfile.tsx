import React from "react";
import { Col, Form, Row } from "react-bootstrap";

interface FormProfile {
    edit: boolean;
}
export const FormProfile: React.FC<FormProfile> = ({ edit }) => {
    return (
        <Row>
            <Form.Label column="sm" lg={2}>
                First name:
            </Form.Label>
            <Col>
                <Form.Control
                    size="sm"
                    type="text"
                    onChange={(e) => console.log(e)}
                    placeholder="Small text"
                />
            </Col>
        </Row>
    );
};
