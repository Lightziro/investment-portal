import {
    AnalyticsStats,
    CompanyIdeaInfo,
    EpsCompanyStats,
    IdeaInfo,
    News,
} from "../state/stock-market.types";
import { AuthorInfo } from "../state/user.types";
import { AlertColor } from "@mui/material";

export interface MainStore {
    user: User;
    news: News[];
    investmentData: InvestmentData;
    ideaView: InvestmentIdeaView;
    alert: Alert;
}
export interface Alert {
    message: string;
    status: AlertColor;
    state: boolean;
}

export interface InvestmentIdeaView {
    epsStats: EpsCompanyStats[] | null;
    analyticsStats: AnalyticsStats[];
    companyInfo: CompanyIdeaInfo;
    authorInfo: AuthorInfo;
    ideaInfo: IdeaInfo;
    description: string;
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
        viewToday: null | number;
        likedToday: null | number;
    };
}

export interface User {
    fullName: string;
    role: string;
    notices: Notice[];
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
}
