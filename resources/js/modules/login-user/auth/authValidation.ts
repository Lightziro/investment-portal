import * as Yup from "yup";

export const SignInSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Is required field"),
    password: Yup.string()
        .min(8, "Must contain min 8 symbol")
        .max(40, "Must contain max 40 symbol")
        .required("Is required field"),
});
