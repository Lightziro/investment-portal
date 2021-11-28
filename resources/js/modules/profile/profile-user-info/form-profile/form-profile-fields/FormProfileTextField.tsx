import React from "react";
import { Form } from "react-bootstrap";
interface FormProfileTextField {
    name: string;
    value: string;
    handleChange: (e) => void;
    valid?: boolean;
}
export const FormProfileTextField: React.FC<FormProfileTextField> = ({
    name,
    value,
    handleChange,
    valid,
}) => {
    return (
        <Form.Control
            name={name}
            size="sm"
            type="text"
            onChange={handleChange}
            value={value}
            isValid={valid}
            isInvalid={!valid}
        />
    );
};
