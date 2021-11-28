import React, { Fragment } from "react";
import { Form } from "react-bootstrap";
interface FormProfileRadioField {
    items: any[];
    name: string;
    value: string;
    handleChange: (e) => void;
}
export const FormProfileRadioField: React.FC<FormProfileRadioField> = ({
    items,
    name,
    value,
    handleChange,
}) => {
    return (
        <Fragment>
            {items.map((item) => (
                <Form.Check
                    key={item.value}
                    inline
                    label={item.label}
                    name={name}
                    type="radio"
                    value={item.value}
                    onChange={handleChange}
                    checked={value === item.value}
                    // id={`inline-${type}-1`}
                />
            ))}
        </Fragment>
    );
};
