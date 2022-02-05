import * as Yup from "yup";

export const SignUpSchema = Yup.object().shape({
    first_name: Yup.string()
        .min(2, "Must contain min 2 symbol")
        .max(25, "Must contain min 25 symbol")
        .required("Is required field"),
    last_name: Yup.string()
        .min(2, "Must contain min 2 symbol")
        .max(25, "Must contain max 25 symbol")
        .required("Is required field"),
    password: Yup.string()
        .min(8, "Must contain min 8 symbol")
        .max(40, "Must contain max 40 symbol")
        .required("Is required field"),
    email: Yup.string().email("Invalid email").required("Is required field"),
    consent: Yup.boolean().oneOf([true], "Is required field"),
});
