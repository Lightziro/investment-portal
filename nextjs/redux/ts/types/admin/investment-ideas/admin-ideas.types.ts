import { AdminSectionBase } from "../admin-store.types";
import { IdeaStatus } from "../../../../../ts/enums/investment-idea.enum";

export interface AdminIdeas extends AdminSectionBase {
    viewToday: number;
    commentsToday: number;
}
export interface InvestmentIdeaItemAdmin {
    ideaId: number;
    company: string;
    status: IdeaStatus;
    score: number;
    view: number;
    comments: number;
}
