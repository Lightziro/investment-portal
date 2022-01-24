import React, { ChangeEvent } from "react";
import { Checkbox, FormControlLabel } from "@mui/material";
interface CheckboxField {
    value: boolean;
    label: string;
    handleChange: (e: ChangeEvent<any>) => void;
    name: string;
}
export const CheckboxField: React.FC<CheckboxField> = ({
    value,
    label,
    handleChange,
    name,
}) => {
    return (
        <FormControlLabel
            control={
                <Checkbox onChange={handleChange} value={value} name={name} />
            }
            label={label}
        />
    );
};
