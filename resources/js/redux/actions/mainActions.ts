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
