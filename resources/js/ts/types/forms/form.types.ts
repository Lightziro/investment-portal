export interface FormRegister {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    consent: boolean;
}
export interface FormAuth {
    email: string;
    password: string;
    remember: boolean;
}
