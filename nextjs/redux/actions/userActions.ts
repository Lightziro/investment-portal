import { FormAuth } from "../../ts/types/forms/form.types";

export const getUser = () => ({
    type: "FETCH_USER",
});
export const login = (userData: FormAuth): any => ({
    type: "LOGIN_USER",
    userData,
});
