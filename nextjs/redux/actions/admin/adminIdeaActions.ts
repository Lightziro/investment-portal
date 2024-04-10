import { CreateIdeaStage } from "../../../ts/enums/investment-idea.enum";

export const fetchCompanies = (name: string) => ({
    type: "FETCH_COMPANIES",
    name,
});
export const setCompanyIdea = (company: string) => ({
    type: "SET_COMPANY_IDEA",
    company,
});

export const clearCompanyIdea = () => ({
    type: "CLEAR_COMPANY_IDEA",
});
export const changeStageCreateIdea = (stage: CreateIdeaStage) => ({
    type: "SET_STAGE_CREATE_IDEA",
    stage,
});
export const fetchAdminIdeas = (page: number) => ({
    type: "FETCH_ADMIN_IDEAS",
    page,
});
