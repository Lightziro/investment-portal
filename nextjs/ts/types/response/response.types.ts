import { InvestmentIdea } from "../entity/stock-market.types";
import { ArticleModel } from "../entity/article.types";

export interface ResponseRetrainClassifier {
    message: string;
    newScore?: null;
}
export interface DtoPortal {
    articles: {
        popular: ArticleModel[];
        simple: ArticleModel[];
    };
    ideas: InvestmentIdea[];
    stats: {
        success: number;
        fail: number;
    };
}
export interface DtoQuoteItem {
    company_id: number;
    name: string;
    last_price: number;
    percent_change_today: number;
}
