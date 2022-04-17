import React, { ChangeEvent } from "react";
import { InputLabel, MenuItem, Select } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import { Select as SelectAnt } from "antd";
const { Option } = SelectAnt;

interface SelectField {
    items: { label: string; value: string | number }[];
    value?: string | number;
    type?: "material" | "bootstrap" | "ant";
    handleChange: (e: ChangeEvent<any>) => void;
    size?: string;
    classesSelect?: string;
    defaultValue?: any;
    label?: string;
    name?: string;
}
export const SelectField: React.FC<SelectField> = ({
    items,
    value,
    type = "material",
    handleChange,
    defaultValue,
    classesSelect,
    label,
    size,
    name,
}) => {
    switch (type) {
        case "material":
            return (
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                        {label}
                    </InputLabel>
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
        case "ant":
            return (
                <SelectAnt
                    defaultValue={defaultValue}
                    size={size}
                    className={classesSelect}
                    onChange={handleChange}
                >
                    {items.map((item) => (
                        <Option key={item.value} value={item.value}>
                            {item.label}
                        </Option>
                    ))}
                </SelectAnt>
            );
    }
};
