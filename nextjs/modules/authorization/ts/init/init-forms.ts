import { FormAuth, FormRegister } from "../../../../ts/types/forms/form.types";

export const initRegisterForm: FormRegister = {
    email: "",
    firstName: "",
    lastName: "",
    consent: false,
    password: "",
};
export const initialLoginForm: FormAuth = {
    email: "",
    password: "",
    remember: false,
};
