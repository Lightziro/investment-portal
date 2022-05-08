import * as Yup from "yup";

export const RecoveryPasswordSchema = Yup.object().shape({
    password: Yup.string()
        .min(8, "Must contain min 8 symbol")
        .max(40, "Must contain max 40 symbol")
        .required("Is required field"),
    confirm_password: Yup.string()
        .required()
        .oneOf([Yup.ref("password"), null], "Passwords must match"),
});
