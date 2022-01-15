import {
    AnalyticsStats,
    CompanyIdeaInfo,
    EpsCompanyStats,
    IdeaInfo,
    News,
} from "../entity/stock-market.types";
import { AuthorInfo } from "../entity/user.types";
import { AlertColor } from "@mui/material";
import { CountryItem } from "../other/other.types";
import { Article, ArticleView } from "../entity/article.types";

export interface MainStore {
    news: News[];
    investmentData: InvestmentData;
    otherData: OtherData;
    articles: {
        popular: Article[];
        simple: Article[];
    };
}

export interface OtherData {
    countries: CountryItem[];
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
}
export interface AlertStore {
    message: string;
    status: AlertColor;
    state: boolean;
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
}

export interface InvestmentData {
    bestProfit: number | null;
    worseProfit: number | null;
    investmentIdeas: InvestmentIdea[];
    ideaStatistics: IdeaStatistics;
}
export interface IdeaStatistics {
    success: number;
    fail: number;
}

export interface AdminStore {
    investmentIdeas: {
        viewToday: number;
        commentsToday: number;
    };
    smartAnalytic: {
        score: {
            classificationNews: number;
        };
        newsForAnalyze: NewsPrediction[];
    };
    articles: AdminArticle;
    createIdea: CreateIdea;
}
export interface AdminArticle {
    list: Article[];
    lastPage: number;
    loading: boolean;
    dialog: boolean;
    edit: Article;
}
export interface NewsPrediction {
    id: number;
    title: string;
    prediction: string;
}

export interface UserStore {
    userId: number;
    fullName: string;
    role: string;
    notices: Notice[];
    avatar: string;
}

export interface Notice {
    id: number;
    title: string;
    description: string;
    viewed: boolean;
    created: string;
}

export interface StoreData {
    main: MainStore;
    admin: AdminStore;
    alert: AlertStore;
    view: ViewStore;
    user: UserStore;
}
export interface ViewStore {
    profile: ProfileView;
    idea: InvestmentIdeaView;
    article: ArticleView;
}
export interface CreateIdea {
    companies: [];
    stage: number;
    selectedCompany: string;
    loadInput: boolean;
}
