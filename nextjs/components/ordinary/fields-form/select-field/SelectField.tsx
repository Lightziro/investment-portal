import React, { ChangeEvent } from "react";
import { InputLabel, MenuItem, Select } from "@mui/material";
import FormControl from "@mui/material/FormControl";

interface SelectField {
    items: { label: string; value: string | number }[];
    value: string | number;
    type?: "material" | "bootstrap";
    handleChange: (e: ChangeEvent<any>) => void;
    label: string;
    name: string;
}
export const SelectField: React.FC<SelectField> = ({
    items,
    value,
    type = "material",
    handleChange,
    label,
    name,
}) => {
    if (type === "material") {
        return (
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">{label}</InputLabel>
                <Select
                    value={value}
                    name={name}
                    label={label}
                    onChange={handleChange}
                >
                    {items.map((item) => (
                        <MenuItem value={item.value}>{item.label}</MenuItem>
                    ))}
                </Select>
            </FormControl>
        );
    }
};
