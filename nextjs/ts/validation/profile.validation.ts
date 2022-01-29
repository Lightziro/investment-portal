import * as Yup from "yup";

export const ProfileSchema = Yup.object().shape({
    first_name: Yup.string().min(2).required("Is required field").trim(),
    last_name: Yup.string().min(2).required("Is required field").trim(),
});
