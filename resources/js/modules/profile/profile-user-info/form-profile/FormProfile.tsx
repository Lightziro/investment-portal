import React, { Fragment, useEffect } from "react";
import { ProfileView, StoreData } from "../../../../ts/types/redux/store.types";
import { useTranslation } from "react-i18next";
import { Formik } from "formik";
import { FormProfileRow } from "./FormProfileRow";
import { FormProfileTextField } from "./form-profile-fields/FormProfileTextField";
import { useDispatch, useSelector } from "react-redux";
import { fetchCountries } from "../../../../redux/actions/mainActions";
import { FormProfileSelectField } from "./form-profile-fields/FormProfileSelectField";
import { Button, Stack } from "@mui/material";
import { updateProfile } from "../../../../redux/actions/profileActions";

interface FormProfile {
    edit: boolean;
    profile: ProfileView;
    handleEdit: () => void;
}
export const FormProfile: React.FC<FormProfile> = ({
    edit,
    profile,
    handleEdit,
}) => {
    const { t } = useTranslation();
    const countries = useSelector(
        (state: StoreData) => state.main.otherData.countries
    );
    const dispatch = useDispatch();
    useEffect(() => {
        if (!countries) {
            dispatch(fetchCountries());
        }
    }, []);
    const handleSubmit = (form) => {
        dispatch(updateProfile(form));
        handleEdit();
    };
    return (
        <Fragment>
            <Formik
                initialValues={{
                    firstName: profile.name.firstName,
                    lastName: profile.name.lastName,
                    country: profile.country.country_id,
                }}
                onSubmit={handleSubmit}
                // validationSchema={SignInSchema}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                }) => (
                    <form onSubmit={handleSubmit}>
                        <FormProfileRow
                            textValue={profile.name.firstName}
                            label={`${t("First Name")}`}
                            edit={edit}
                        >
                            <FormProfileTextField
                                name="firstName"
                                value={values.firstName}
                                handleChange={handleChange}
                            />
                        </FormProfileRow>
                        <FormProfileRow
                            textValue={profile.name.lastName}
                            label={`${t("Last Name")}`}
                            edit={edit}
                        >
                            <FormProfileTextField
                                name="lastName"
                                value={values.lastName}
                                handleChange={handleChange}
                            />
                        </FormProfileRow>
                        <FormProfileRow
                            textValue={profile.country.name}
                            label={`${t("Country")}`}
                            edit={edit}
                        >
                            <FormProfileSelectField
                                value={values.country}
                                handleChange={handleChange}
                                items={countries}
                                name="country"
                            />
                        </FormProfileRow>
                        {edit && (
                            <Stack alignItems="center">
                                <Button type="submit" variant="contained">
                                    Save profile
                                </Button>
                            </Stack>
                        )}
                    </form>
                )}
            </Formik>
        </Fragment>
    );
};
