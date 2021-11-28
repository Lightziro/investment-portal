import React from "react";
import { Form } from "react-bootstrap";
import { CountryItem } from "../../../../../ts/types/other/other.types";
interface FormProfileSelectField {
    items: CountryItem[];
    value: string | number;
    handleChange: (e) => void;
    name: string;
}
export const FormProfileSelectField: React.FC<FormProfileSelectField> = ({
    items,
    value,
    handleChange,
    name,
}) => {
    return (
        <Form.Select
            name={name}
            onChange={handleChange}
            value={value}
            aria-label="Default select example"
        >
            {items.map((item) => (
                <option value={item.country_id}>{item.name}</option>
            ))}
        </Form.Select>
    );
};
