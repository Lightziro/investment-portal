export const setCompanyIdea = (company: string) => ({
    type: "SET_COMPANY_IDEA",
    company,
});
export const setStage = (stage: number) => ({
    type: "SET_STAGE",
    stage,
});
export const sendToAnalyze = (form) => ({
    type: "SEND_TO_ANALYZE",
    form,
});
