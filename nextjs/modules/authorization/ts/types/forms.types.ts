export interface FormRegister {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    consent: boolean;
}
export interface FormAuth {
    email: string;
    password: string;
    remember: boolean;
}
export interface FormRecovery {
    password: string;
    confirm_password: string;
}
export interface FormForgot {
    email: string;
}
