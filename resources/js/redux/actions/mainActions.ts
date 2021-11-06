import { FormRegister } from "../../ts/types/forms/form.types";

export const setUserData = (userData): any => ({
    type: "SET_USER_DATA",
    userData,
});
export const fetchInvestmentData = () => ({
    type: "FETCH_INVESTMENT_DATA",
});

export const viewNotice = (id: number) => ({
    type: "VIEW_NOTICE",
    id,
});
export const fetchInvestmentIdea = (ideaId: number) => ({
    type: "FETCH_INVESTMENT_IDEA",
    ideaId,
});
export const registerUser = (form: FormRegister) => ({
    type: "REGISTER_USER",
    form,
});
export const clearAlert = () => ({
    type: "CLEAR_ALERT",
});
// export const clearViewIdea = () => ({
//     type: 'CLEAR_VIEW_IDEA'
// })
