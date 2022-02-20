import { FormAuth, FormRegister } from "../../ts/types/forms/form.types";

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

export const subscribeToNews = (email: string) => ({
    type: "SUBSCRIBE_TO_NEWS",
    email,
});
export const fetchNews = () => ({
    type: "FETCH_NEWS",
});
export const setPortalData = (data) => ({
    type: "SET_PORTAL_DATA",
    data,
});
