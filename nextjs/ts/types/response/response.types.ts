import { Article } from "../entity/article.types";
import { InvestmentIdea } from "../entity/stock-market.types";

export interface ResponseRetrainClassifier {
    message: string;
    newScore?: null;
}
export interface DtoPortal {
    articles: {
        popular: Article[];
        simple: Article[];
    };
    ideas: InvestmentIdea[];
    stats: {
        success: number;
        fail: number;
    };
}
export interface DtoQuoteItem {
    name: string;
    last_price: number;
    percent_change_today: number;
}
