import { CreateIdeaStage } from "../../../ts/enums/investment-idea.enum";

export const fetchCompanies = (name: string) => ({
    type: "FETCH_COMPANIES",
    name,
});
export const setCompanyIdea = (company: string) => ({
    type: "SET_COMPANY_IDEA",
    company,
});
export const changeStageCreateIdea = (stage: CreateIdeaStage) => ({
    type: "SET_STAGE_CREATE_IDEA",
    stage,
});
export const sendToAnalytics = (form) => ({
    type: "SEND_IDEA_TO_ANALYTICS",
    form,
});
