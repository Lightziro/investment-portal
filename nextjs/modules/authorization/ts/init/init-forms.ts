import {
    FormAuth,
    FormForgot,
    FormRecovery,
    FormRegister,
} from "../types/forms.types";

export const initRegisterForm: FormRegister = {
    email: "",
    first_name: "",
    last_name: "",
    consent: false,
    password: "",
};
export const initialLoginForm: FormAuth = {
    email: "",
    password: "",
    remember: false,
};
export const initialRecoveryForm: FormRecovery = {
    password: "",
    confirm_password: "",
};
export const initialForgotForm: FormForgot = {
    email: "",
};
