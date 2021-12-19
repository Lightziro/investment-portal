import React, { Fragment, useState } from "react";
import {
    Autocomplete,
    Avatar,
    Box,
    CircularProgress,
    TextField,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchCompanies } from "../../../../redux/actions/adminActions";
import { AdminStore, StoreData } from "../../../../ts/types/redux/store.types";
interface AutoCompleteCompanies {
    changeCompany: (value: string) => void;
    company: string;
}
export const AutoCompleteCompanies: React.FC<AutoCompleteCompanies> = ({
    changeCompany,
    company,
}) => {
    const dispatch = useDispatch();

    const { loadInput, companies } = useSelector(
        (state: StoreData) => state.admin.createIdea
    );
    const [value, setValue] = useState("");
    const [open, setOpen] = useState(false);
    const searchCompany = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
        dispatch(fetchCompanies(event.target.value));
    };
    return (
        <Autocomplete
            id="company"
            open={open}
            onOpen={() => {
                setOpen(true);
            }}
            onClose={() => {
                setOpen(false);
            }}
            onChange={(e, value) => changeCompany(value)}
            getOptionLabel={(option) => option ?? ""}
            options={companies}
            loading={loadInput}
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
                                {loadInput ? (
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
    );
};
