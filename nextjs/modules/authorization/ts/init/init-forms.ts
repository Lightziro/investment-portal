import { FormAuth, FormRegister } from "../types/forms.types";

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
