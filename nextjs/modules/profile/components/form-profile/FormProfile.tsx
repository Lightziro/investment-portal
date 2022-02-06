import React from "react";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import { FormProfileRow } from "./FormProfileRow";
import { useDispatch } from "react-redux";
import { Box, Button, Stack } from "@mui/material";
import { updateProfile } from "../../../../redux/actions/profileActions";
import { sexList } from "../../../../ts/init/other/other.init";
import { ProfileSchema } from "../../../../ts/validation/profile.validation";
import { FormProfileTextField } from "../form-profile-fields/FormProfileTextField";
import { FormProfileSelectField } from "../form-profile-fields/FormProfileSelectField";
import { FormProfileRadioField } from "../form-profile-fields/FormProfileRadioField";
import { convertToProfileForm } from "../../utils/convert-to-form";
import { ProfileUser } from "../../../../ts/types/other/view.types";
import { CountryModel } from "../../../../ts/types/entity/other.types";

interface FormProfile {
    edit: boolean;
    profile: ProfileUser;
    handleEdit: () => void;
    countries: CountryModel[];
}
export const FormProfile: React.FC<FormProfile> = ({
    edit,
    profile,
    handleEdit,
    countries,
}) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const handleSubmit = (form) => {
        dispatch(updateProfile(form));
        handleEdit();
    };

    const formik = useFormik({
        initialValues: convertToProfileForm(profile),
        validationSchema: ProfileSchema,
        onSubmit: handleSubmit,
    });

    return (
        <Box my={1}>
            <form onSubmit={formik.handleSubmit}>
                <FormProfileRow
                    textValue={profile.first_name}
                    label={`${t("First Name")}`}
                    edit={edit}
                >
                    <FormProfileTextField
                        name="first_name"
                        value={formik.values.first_name}
                        handleChange={formik.handleChange}
                        valid={!formik.errors.first_name}
                    />
                </FormProfileRow>
                <FormProfileRow
                    textValue={profile.last_name}
                    label={`${t("Last Name")}`}
                    edit={edit}
                >
                    <FormProfileTextField
                        name="last_name"
                        value={formik.values.last_name}
                        handleChange={formik.handleChange}
                        valid={!formik.errors.last_name}
                    />
                </FormProfileRow>
                <FormProfileRow
                    textValue={profile.country.name}
                    label={`${t("Country")}`}
                    edit={edit}
                >
                    <FormProfileSelectField
                        value={formik.values.country_id}
                        handleChange={formik.handleChange}
                        items={countries}
                        name="country_id"
                    />
                </FormProfileRow>
                <FormProfileRow
                    textValue={profile.sex ?? "Не указан"}
                    label={`${t("Sex")}`}
                    edit={edit}
                >
                    <FormProfileRadioField
                        value={formik.values.sex}
                        name="sex"
                        handleChange={formik.handleChange}
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
        </Box>
    );
};
