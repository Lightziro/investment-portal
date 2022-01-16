import { News } from "../../../../ts/types/entity/stock-market.types";
import { Article } from "../../../../ts/types/entity/article.types";
import {
    InvestmentData,
    OtherData,
} from "../../../../ts/types/redux/store.types";

export interface MainStore {
    news: News[];
    investmentData: InvestmentData;
    otherData: OtherData;
    articles: {
        popular: Article[];
        simple: Article[];
    };
}
