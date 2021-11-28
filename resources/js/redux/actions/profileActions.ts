import { FormProfile } from "../../ts/types/forms/form.types";

export const fetchProfileView = (userId: number) => ({
    type: "FETCH_PROFILE_VIEW",
    userId,
});
export const updateProfile = (form: FormProfile) => ({
    type: "UPDATE_PROFILE_DATA",
    form,
});
