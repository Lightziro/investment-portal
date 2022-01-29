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

export interface ProfileView {
    user_id: number;
    role_name: string;
    first_name: string;
    last_name: string;
    full_name: string;
    count_comments: number;
    country_id: number;
    country_code: string;
    country_name: string;
    sex: string;
    created_at: string;
    dateUpdate?: string;
    avatar_path: string;
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
    ratings: {
        avg: number;
        stats: RatingScore[];
        count: number;
    };
    userRating?: {
        score: number;
        created_at: string;
    };
}
