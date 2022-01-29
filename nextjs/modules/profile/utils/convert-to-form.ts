import { ProfileView } from "../../../redux/ts/types/view/view-store.types";
import { FormProfile } from "../../../ts/types/forms/form.types";

export const convertToProfileForm = (profile: ProfileView): FormProfile => ({
    last_name: profile.last_name,
    first_name: profile.first_name,
    country_id: profile.country_id,
    sex: profile.sex,
});
