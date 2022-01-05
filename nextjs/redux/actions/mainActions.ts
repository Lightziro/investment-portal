import { FormAuth, FormRegister } from "../../ts/types/forms/form.types";
export const authUser = (userData: FormAuth): any => ({
    type: "AUTH_USER",
    userData,
});
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
export const fetchCountries = () => ({
    type: "FETCH_COUNTRIES",
});
export const clearView = (entity: string) => ({
    type: "CLEAR_VIEW",
    entity,
});
export const exitUser = () => ({
    type: "EXIT_USER",
});
export const subscribeToNews = (email: string) => ({
    type: "SUBSCRIBE_TO_NEWS",
    email,
});
export const fetchNews = () => ({
    type: "FETCH_NEWS",
});
export const getUser = () => ({
    type: "FETCH_USER",
});

// export const clearViewIdea = () => ({
//     type: 'CLEAR_VIEW_IDEA'
// })
