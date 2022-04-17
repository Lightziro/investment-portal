import { Entity } from "../../ts/enums/other.enums";

export const fetchInvestmentData = () => ({
    type: "FETCH_ADMIN_INVESTMENT_DATA",
});
export const fetchAnalyticData = () => ({
    type: "FETCH_ANALYTIC_DATA",
});
export const setArticleDialog = (state: boolean = true) => ({
    type: "SET_ARTICLE_DIALOG",
    state,
});
export const fetchEntityList = (entity: Entity, page: number) => ({
    type: "FETCH_ADMIN_ENTITY_LIST",
    entity,
    page,
});
