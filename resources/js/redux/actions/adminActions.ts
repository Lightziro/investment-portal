export const fetchInvestmentData = () => ({
    type: "FETCH_ADMIN_INVESTMENT_DATA",
});
export const fetchCompanies = (name: string) => ({
    type: "FETCH_COMPANIES",
    name,
});
export const selectCompany = (id: number) => ({
    type: "SET_SELECT_COMPANY_ANALYTICS",
    id,
});
