import { CompanyModel } from "./other.types";
import { UserModel } from "./user.types";

export interface IdeaModel {
    idea_id: number;
    company_id: number;
    description: string;
    company: CompanyModel;
    price_buy: number;
    price_sell: number;
    author: UserModel;
    is_short: boolean;
    status_id: number;
    date_end: string;
    date_start: string;
}
export interface IdeaView extends IdeaModel {
    author: AuthorIdea;
}

export interface AuthorIdea extends UserModel {
    amount_success_ideas: number;
    amount_fail_ideas: number;
    total_ideas: number;
}
