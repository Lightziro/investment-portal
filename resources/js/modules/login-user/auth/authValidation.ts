import * as Yup from "yup";

export const SignInSchema = Yup.object().shape({
    userName: Yup.string()
        .min(4, "Must contain min 4 symbol")
        .max(20, "Must contain max 20 symbol")
        .required("Is required field"),
    password: Yup.string()
        .min(8, "Must contain min 8 symbol")
        .max(40, "Must contain max 40 symbol")
        .required("Is required field"),
});
