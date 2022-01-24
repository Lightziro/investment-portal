import { IdeaStatus } from "../../../../../ts/enums/investment-idea.enum";

export interface DtoEditArticle {}

export interface DtoPersonalIdea {
    idea_id: number;
    status: IdeaStatus;
    description: string;
    views: number;
    comments: number;
    price_buy: number;
    price_sell: number;
    is_short: boolean;
    company: {
        name: string;
        logo: string;
    };
}
