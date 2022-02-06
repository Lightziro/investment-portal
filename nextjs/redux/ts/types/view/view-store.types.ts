import {
    Article,
    ArticleLabel,
} from "../../../../ts/types/entity/article.types";
import { CountryItem } from "../../../../ts/types/other/other.types";
import { Comment, RatingScore } from "../../../../ts/types/other/view.types";
import {
    AnalyticsStats,
    CompanyIdeaInfo,
    EpsCompanyStats,
    IdeaInfo,
} from "../../../../ts/types/entity/stock-market.types";
import { AuthorInfo } from "../../../../ts/types/entity/user.types";

export interface ViewStore {
    profile: ProfileView;
    idea: InvestmentIdeaView;
    article: ArticleView;
}

export interface ArticleView extends Article {
    labels: ArticleLabel[];
    content: string;
    comments: Comment[];
}

export interface InvestmentIdeaView {
    ideaId: number;
    epsStats: EpsCompanyStats[] | null;
    analyticsStats: AnalyticsStats[];
    companyInfo: CompanyIdeaInfo;
    authorInfo: AuthorInfo;
    ideaInfo: IdeaInfo;
    description: string;
    comments: Comment[];
    ratings: IdeaRatingStats;
    userRating?: UserIdeaRating;
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
