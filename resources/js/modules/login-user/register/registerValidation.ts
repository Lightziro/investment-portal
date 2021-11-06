import * as Yup from "yup";

export const SignUpSchema = Yup.object().shape({
    firstName: Yup.string()
        .min(2, "Must contain min 4 symbol")
        .max(25, "Must contain min 25 symbol")
        .required("Is required field"),
    lastName: Yup.string()
        .min(2, "Must contain min 4 symbol")
        .max(25, "Must contain max 20 symbol")
        .required("Is required field"),
    password: Yup.string()
        .min(8, "Must contain min 8 symbol")
        .max(40, "Must contain max 40 symbol")
        .required("Is required field"),
    consent: Yup.boolean().oneOf([true], "Is required field"),
});
