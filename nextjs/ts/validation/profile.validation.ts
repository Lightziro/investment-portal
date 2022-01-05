import * as Yup from "yup";

export const ProfileSchema = Yup.object().shape({
    firstName: Yup.string().min(2).required("Is required field").trim(),
    lastName: Yup.string().min(2).required("Is required field").trim(),
});
