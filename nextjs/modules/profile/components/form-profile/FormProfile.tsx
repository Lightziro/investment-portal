import React, { useEffect } from "react";
import { ProfileView, StoreData } from "../../../../ts/types/redux/store.types";
import { useTranslation } from "react-i18next";
import { Formik } from "formik";
import { FormProfileRow } from "./FormProfileRow";
import { useDispatch, useSelector } from "react-redux";
import { fetchCountries } from "../../../../redux/actions/mainActions";
import { Box, Button, Stack } from "@mui/material";
import { updateProfile } from "../../../../redux/actions/profileActions";
import { sexList } from "../../../../ts/init/other/other.init";
import { ProfileSchema } from "../../../../ts/validation/profile.validation";
import { FormProfileTextField } from "../form-profile-fields/FormProfileTextField";
import { FormProfileSelectField } from "../form-profile-fields/FormProfileSelectField";
import { FormProfileRadioField } from "../form-profile-fields/FormProfileRadioField";

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
        <Box my={1}>
            <Formik
                initialValues={{
                    firstName: profile.name.firstName,
                    lastName: profile.name.lastName,
                    country: profile.country.country_id,
                    sex: profile.sex,
                }}
                onSubmit={handleSubmit}
                validationSchema={ProfileSchema}
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
                                valid={!errors.firstName}
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
                                valid={!errors.lastName}
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
                        <FormProfileRow
                            textValue={profile.sex ?? "Не указан"}
                            label={`${t("Sex")}`}
                            edit={edit}
                        >
                            <FormProfileRadioField
                                value={values.sex}
                                name="sex"
                                handleChange={handleChange}
                                items={sexList.map((item) => {
                                    item.label = t(item.label);
                                    return item;
                                })}
                            />
                        </FormProfileRow>
                        {edit && (
                            <Stack alignItems="center">
                                <Button type="submit" variant="contained">
                                    {t("Save profile")}
                                </Button>
                            </Stack>
                        )}
                    </form>
                )}
            </Formik>
        </Box>
    );
};
