import {
    ArticleLabel,
    ArticleModel,
} from "../../../../ts/types/entity/article.types";
import { Comment, RatingScore } from "../../../../ts/types/other/view.types";
import {
    AnalyticsStats,
    CompanyIdeaInfo,
    EpsCompanyStats,
    IdeaInfo,
} from "../../../../ts/types/entity/stock-market.types";
import { AuthorInfo, UserModel } from "../../../../ts/types/entity/user.types";
import { CompanyQuote } from "../../../../ts/types/entity/other.types";

export interface ViewStore {
    profile: UserModel;
    idea: InvestmentIdeaView;
    article: ArticleView;
}

export interface ArticleView extends ArticleModel {
    labels: ArticleLabel[];
    content: string;
    comments: Comment[];
}

export interface InvestmentIdeaView {
    epsStats: EpsCompanyStats[];
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
