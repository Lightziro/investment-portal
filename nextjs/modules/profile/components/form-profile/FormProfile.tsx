import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import { FormProfileRow } from "./FormProfileRow";
import { useDispatch } from "react-redux";
import { Box, Button, Stack } from "@mui/material";
import { sexList } from "../../../../ts/init/other/other.init";
import { ProfileSchema } from "../../../../ts/validation/profile.validation";
import { FormProfileTextField } from "../form-profile-fields/FormProfileTextField";
import { FormProfileSelectField } from "../form-profile-fields/FormProfileSelectField";
import { FormProfileRadioField } from "../form-profile-fields/FormProfileRadioField";
import { convertToProfileForm } from "../../utils/convert-to-form";
import { CountryModel } from "../../../../ts/types/entity/other.types";
import { ProfileContext } from "../../contexts/ProfileContext";
import { axios } from "../../../../utils/axios";
import {
    alertError,
    alertSuccess,
} from "../../../../redux/actions/alertActions";

interface FormProfile {
    edit: boolean;
    handleEdit: () => void;
    countries: CountryModel[];
}

export const FormProfile: React.FC<FormProfile> = ({
    edit,
    handleEdit,
    countries,
}) => {
    const { profile, setProfile } = useContext(ProfileContext);
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const handleSubmit = async (form) => {
        await axios
            .put(`${process.env.API_URL}/api/user/${form.user_id}`, form)
            .then((res) => {
                setProfile(res.data);
                dispatch(
                    alertSuccess(
                        "You have successfully updated your profile data"
                    )
                );
            })
            .catch((e) =>
                dispatch(alertError("Error occurred, try again later"))
            );
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
                    textValue={profile.country?.name}
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
