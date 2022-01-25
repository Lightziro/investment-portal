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
    userId: number;
    roleName: string;
    name: {
        fullName: string;
        firstName: string;
        lastName: string;
    };
    fullName: string;
    allComments: number;
    country: CountryItem;
    sex: string;
    avatar: string;
    dateCreate: string;
    dateUpdate?: string;
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
    };
}
