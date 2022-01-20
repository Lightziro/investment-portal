import React, { Fragment, useState } from "react";
import {
    Autocomplete,
    CircularProgress,
    TextField,
    Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";

interface AutoCompleteCompanies {
    changeCompany: (value: string) => void;
    disable: boolean;
    loading: boolean;
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    items: [];
}
export const AutoCompleteCompanies: React.FC<AutoCompleteCompanies> = ({
    changeCompany,
    disable,
    handleChange,
    loading,
    items,
}) => {
    const { t } = useTranslation();

    const [value, setValue] = useState("");
    const [open, setOpen] = useState(false);
    const searchCompany = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
        handleChange(event);
    };
    return (
        <Fragment>
            <Typography variant="body1" gutterBottom>
                {t("Select company")}
            </Typography>
            <Autocomplete
                open={open}
                id="company"
                onOpen={() => setOpen(true)}
                onClose={() => setOpen(false)}
                onChange={(e, value) => changeCompany(value)}
                getOptionLabel={(option) => option ?? ""}
                options={items}
                disabled={disable}
                loading={loading}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        value={value}
                        onChange={searchCompany}
                        label="Company"
                        InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                                <Fragment>
                                    {loading ? (
                                        <CircularProgress
                                            color="inherit"
                                            size={20}
                                        />
                                    ) : null}
                                    {params.InputProps.endAdornment}
                                </Fragment>
                            ),
                        }}
                    />
                )}
            />
        </Fragment>
    );
};
