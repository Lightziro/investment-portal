import {
    AnalyticsStats,
    CompanyIdeaInfo,
    EpsCompanyStats,
    IdeaInfo,
    News,
} from "../state/stock-market.types";
import { AuthorInfo } from "../state/user.types";
import { AlertColor } from "@mui/material";
import { CountryItem } from "../other/other.types";
import { Article, ArticleView } from "../state/article.types";

export interface MainStore {
    user: User;
    news: News[];
    investmentData: InvestmentData;
    profileView: ProfileView;
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
    comments: IdeaComment[];
}
export interface IdeaComment {
    userId: number;
    date: string;
    fullNameAuthor: string;
    comment: string;
    avatar: string;
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

export interface InvestmentIdea {
    id: number;
    possibleProfit: number;
    stock: string;
    logo: string;
}

export interface AdminStore {
    investmentIdeas: {
        viewToday: number;
        commentsToday: number;
    };
    createIdea: {
        companies: string[];
        loadInput: boolean;
        selectedCompany: null;
        stage: number;
    };
    smartAnalytic: {
        score: {
            classificationNews: number;
        };
        newsForAnalyze: NewsPrediction[];
    };
    articles: AdminArticle;
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

export interface User {
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
}
export interface ViewStore {
    profile: ProfileView;
    idea: InvestmentIdeaView;
    article: ArticleView;
}
