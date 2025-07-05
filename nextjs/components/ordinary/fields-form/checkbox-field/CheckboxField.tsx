import React, { ChangeEvent } from "react";
import { Checkbox, FormControlLabel } from "@mui/material";
interface CheckboxField {
    value: boolean;
    label: string;
    handleChange: (e: ChangeEvent<any>) => void;
    name: string;
    disabled: boolean;
}
export const CheckboxField: React.FC<CheckboxField> = ({
    value,
    label,
    handleChange,
    disabled,
    name,
}) => {
    return (
        <FormControlLabel
            control={
                <Checkbox
                    disabled={disabled}
                    onChange={handleChange}
                    value={value}
                    name={name}
                />
            }
            label={label}
        />
    );
};
