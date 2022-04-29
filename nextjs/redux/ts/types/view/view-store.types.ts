import {
    ArticleEmotion,
    ArticleLabel,
    ArticleModel,
} from "../../../../ts/types/entity/article.types";
import { Comment, RatingScore } from "../../../../ts/types/other/view.types";
import {
    AnalyticsStats,
    BaseCompanyStat,
} from "../../../../ts/types/entity/stock-market.types";
import { UserModel } from "../../../../ts/types/entity/user.types";
import { CompanyQuote } from "../../../../ts/types/entity/other.types";

export interface ViewStore {
    idea: InvestmentIdeaView;
    article: ArticleView;
    company: CompanyView;
}
export interface CompanyView {
    epsStats: BaseCompanyStat[];
    analyticsStats: AnalyticsStats[];
    netMarginStats: BaseCompanyStat[];
}

export interface ArticleView {
    labels: ArticleLabel[];
    content: string;
    comments: Comment[];
    emotions: ArticleEmotion[];
}

export interface InvestmentIdeaView {
    epsStats: BaseCompanyStat[];
    analyticsStats: AnalyticsStats[];
    comments: Comment[];
    ratings: IdeaRatingStats;
    userRating?: UserIdeaRating;
    quote: CompanyQuote;
}

export interface IdeaRatingStats {
    avg: number;
    stats: RatingScore[];
    count: number;
}

export interface UserIdeaRating {
    score: number;
    created_at: string;
}
