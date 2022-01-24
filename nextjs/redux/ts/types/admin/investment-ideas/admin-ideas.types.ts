import { AdminSectionBase } from "../admin-store.types";
import { IdeaStatus } from "../../../../../ts/enums/investment-idea.enum";
import { DtoIdeaItem } from "../../../../../modules/admin/ts/types/response/admin-response-item.types";

export interface AdminIdeas extends AdminSectionBase {
    list: DtoIdeaItem[];
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
