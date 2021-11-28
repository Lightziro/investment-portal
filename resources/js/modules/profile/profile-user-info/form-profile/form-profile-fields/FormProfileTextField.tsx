import React from "react";
import { Form } from "react-bootstrap";
interface FormProfileTextField {
    name: string;
    value: string;
    handleChange: (e) => void;
}
export const FormProfileTextField: React.FC<FormProfileTextField> = ({
    name,
    value,
    handleChange,
}) => {
    return (
        <Form.Control
            name={name}
            size="sm"
            type="text"
            onChange={handleChange}
            value={value}
        />
    );
};
