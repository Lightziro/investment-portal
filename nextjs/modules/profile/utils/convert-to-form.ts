import { FormProfile } from "../../../ts/types/forms/form.types";
import { ProfileUser } from "../../../ts/types/other/view.types";

export const convertToProfileForm = (profile: ProfileUser): FormProfile => ({
    user_id: profile.user_id,
    last_name: profile.last_name,
    first_name: profile.first_name,
    country_id: profile.country_id,
    sex: profile.sex,
});
